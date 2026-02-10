import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Search,
  Bookmark,
  BookmarkCheck,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { Button, Badge, Select } from '@/components/ui';
import type { Company, CompanyCategory, CompanyStage } from '@/types/database';

const categoryOptions = [
  { value: '', label: 'All Categories' },
  { value: 'AI/ML', label: 'AI / Machine Learning' },
  { value: 'Fintech', label: 'Fintech' },
  { value: 'Edtech', label: 'Edtech' },
  { value: 'CleanTech', label: 'CleanTech' },
  { value: 'HealthTech', label: 'Healthcare' },
  { value: 'E-commerce', label: 'E-commerce' },
  { value: 'SaaS', label: 'SaaS' },
  { value: 'Other', label: 'Other' },
];

const stageOptions = [
  { value: '', label: 'All Stages' },
  { value: 'Pre-seed', label: 'Pre-seed' },
  { value: 'Seed', label: 'Seed' },
  { value: 'Series A', label: 'Series A' },
  { value: 'Series B', label: 'Series B' },
  { value: 'Series C+', label: 'Series C+' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest Signup' },
  { value: 'most_active', label: 'Most Active' },
  { value: 'revenue_growth', label: 'Revenue Growth' },
];

export function CompanyList() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [stage, setStage] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [savedCompanies, setSavedCompanies] = useState<Set<string>>(new Set());
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [revenueGrowthMap, setRevenueGrowthMap] = useState<Record<string, number>>({});
  const PAGE_SIZE = 20;

  useEffect(() => {
    let cancelled = false;

    async function fetchCompanies() {
      setLoading(true);
      try {
        let orderCol = 'created_at';
        if (sortBy === 'most_active') orderCol = 'updated_at';

        let query = supabase
          .from('companies')
          .select('*')
          .eq('is_visible', true)
          .neq('is_blocked', true)
          .order(orderCol, { ascending: false });

        if (category) query = query.eq('category', category as CompanyCategory);
        if (stage) query = query.eq('stage', stage as CompanyStage);

        const { data } = await query;
        if (cancelled) return;

        let companiesList = data ?? [];

        // Revenue Growth 정렬 시 company_metrics에서 데이터 가져오기
        if (sortBy === 'revenue_growth' && companiesList.length > 0) {
          const companyIds = companiesList.map((c) => c.id);
          const { data: metricsData } = await supabase
            .from('company_metrics')
            .select('company_id, month, revenue')
            .eq('source', 'stripe')
            .not('revenue', 'is', null)
            .in('company_id', companyIds)
            .order('month', { ascending: false });

          if (!cancelled && metricsData) {
            const growthMap: Record<string, number> = {};
            // 각 회사별 최근 2개월 revenue 추출
            const companyMonths: Record<string, { month: string; revenue: number }[]> = {};
            for (const m of metricsData) {
              if (!companyMonths[m.company_id]) companyMonths[m.company_id] = [];
              if (companyMonths[m.company_id].length < 2) {
                companyMonths[m.company_id].push({ month: m.month, revenue: m.revenue! });
              }
            }

            for (const [companyId, months] of Object.entries(companyMonths)) {
              if (months.length >= 2) {
                const recent = months[0].revenue;
                const previous = months[1].revenue;
                if (previous > 0) {
                  growthMap[companyId] = ((recent - previous) / previous) * 100;
                } else {
                  growthMap[companyId] = recent > 0 ? 100 : 0;
                }
              }
            }

            setRevenueGrowthMap(growthMap);

            // Revenue growth 기준 정렬 (값 있는 회사 우선, 높은 순)
            companiesList = [...companiesList].sort((a, b) => {
              const growthA = growthMap[a.id] ?? -Infinity;
              const growthB = growthMap[b.id] ?? -Infinity;
              return growthB - growthA;
            });
          }
        }

        // 핀된 회사를 최상단에 배치
        const now = new Date().toISOString();
        companiesList = [...companiesList].sort((a, b) => {
          const aPinned = a.pinned_until && a.pinned_until > now ? 1 : 0;
          const bPinned = b.pinned_until && b.pinned_until > now ? 1 : 0;
          return bPinned - aPinned;
        });

        setCompanies(companiesList);
      } catch {
        if (!cancelled) setCompanies([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCompanies();
    return () => { cancelled = true; };
  }, [category, stage, sortBy]);

  const toggleSaveCompany = (companyId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedCompanies((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(companyId)) {
        newSet.delete(companyId);
      } else {
        newSet.add(companyId);
      }
      return newSet;
    });
  };

  const isPinned = (company: Company) => {
    return company.pinned_until && company.pinned_until > new Date().toISOString();
  };

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (company.short_description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesSaved = !showSavedOnly || savedCompanies.has(company.id);
    return matchesSearch && matchesSaved;
  });

  const totalPages = Math.ceil(filteredCompanies.length / PAGE_SIZE);
  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // 필터 변경 시 페이지 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, category, stage, showSavedOnly, sortBy]);

  async function handleView(companyId: string) {
    if (user) {
      await supabase.from('view_logs').insert({
        investor_id: user.id,
        company_id: companyId,
      });
    }
    navigate(`/companies/${companyId}`);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      {/* Header */}
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-serif">Discover Startups</h1>

        {/* Search and Filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-[2] min-w-[280px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-11 pr-4 bg-secondary/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-colors"
            />
          </div>
          <Button
            variant={showSavedOnly ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className="h-11 gap-2 flex-shrink-0"
          >
            <BookmarkCheck className="w-4 h-4" />
            Saved ({savedCompanies.size})
          </Button>
          <Select
            options={categoryOptions}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-11 min-w-[160px] bg-secondary/50 border-border rounded-lg flex-shrink-0"
          />
          <Select
            options={stageOptions}
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            className="h-11 min-w-[130px] bg-secondary/50 border-border rounded-lg flex-shrink-0"
          />
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-11 min-w-[160px] bg-secondary/50 border-border rounded-lg flex-shrink-0"
          />
        </div>

        <p className="text-sm text-muted-foreground">
          {filteredCompanies.length} companies found
        </p>
      </div>

      {/* Company List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      ) : filteredCompanies.length === 0 ? (
        <div className="text-center py-16 border border-border rounded-lg bg-card">
          <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-medium mb-2 text-foreground">No companies found</h3>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-border border border-border rounded-lg bg-card">
          {paginatedCompanies.map((company) => (
            <div
              key={company.id}
              className="flex items-start gap-5 p-5 hover:bg-secondary/50 transition-colors cursor-pointer group border-l-4 border-l-transparent hover:border-l-primary"
              onClick={() => handleView(company.id)}
            >
              {/* Company Logo */}
              <div className="w-16 h-16 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                {company.logo_url ? (
                  <img
                    src={company.logo_url}
                    alt={company.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <ArrowUpRight className="w-3 h-3 text-green-400 absolute top-2 left-2" />
                    <span className="text-[10px] text-neutral-400 leading-tight text-center px-1">
                      {company.name.split(' ').slice(0, 2).join('')}
                    </span>
                  </>
                )}
              </div>

              {/* Company Info */}
              <div className="flex-1 min-w-0">
                {/* Name & Location */}
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {company.name}
                  </h3>
                  {isPinned(company) && (
                    <Badge variant="secondary" className="text-xs gap-1 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      <Star className="w-3 h-3" />
                      Featured
                    </Badge>
                  )}
                  {company.location && (
                    <span className="text-muted-foreground text-sm">
                      {company.location}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-foreground mt-1">
                  {company.short_description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  {company.founded_at && (
                    <Badge variant="secondary" className="text-xs font-medium bg-secondary/80 border-0">
                      {company.founded_at}
                    </Badge>
                  )}
                  {company.category && (
                    <Badge variant="outline" className="text-xs font-medium uppercase bg-transparent">
                      {company.category === 'AI/ML' ? 'AI / Machine Learning' : company.category}
                    </Badge>
                  )}
                  {company.stage && (
                    <Badge variant="outline" className="text-xs font-medium uppercase bg-transparent">
                      {company.stage}
                    </Badge>
                  )}
                  {sortBy === 'revenue_growth' && revenueGrowthMap[company.id] !== undefined && (
                    <Badge
                      variant="outline"
                      className={`text-xs font-medium ${revenueGrowthMap[company.id] >= 0 ? 'text-green-400 border-green-500/30' : 'text-red-400 border-red-500/30'}`}
                    >
                      {revenueGrowthMap[company.id] >= 0 ? '+' : ''}{revenueGrowthMap[company.id].toFixed(1)}% MRR
                    </Badge>
                  )}
                </div>
              </div>

              {/* Save Button */}
              <button
                className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                onClick={(e) => toggleSaveCompany(company.id, e)}
              >
                {savedCompanies.has(company.id) ? (
                  <BookmarkCheck className="w-5 h-5 text-primary" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground px-3">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="gap-1"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </main>
  );
}
