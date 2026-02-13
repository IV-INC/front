import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Users,
  MapPin,
  Globe,
  Play,
  BarChart3,
  MessageSquare,
  Github,
  Linkedin,
  Youtube,
  GraduationCap,
  Newspaper,
  ExternalLink,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, Badge } from '@/components/ui';
import type {
  Company,
  Executive,
  CompanyVideo,
  CompanyMetric,
  CompanyQnA,
  CompanyNews,
} from '@/types/database';

// X (formerly Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/** Convert a video URL to an embeddable URL */
function toEmbedUrl(url: string): string {
  if (url.includes('youtube.com/watch?v=')) {
    return url.replace('watch?v=', 'embed/').split('&')[0];
  }
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]?.split('?')[0];
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  if (url.includes('vimeo.com') && !url.includes('player.vimeo.com')) {
    return url.replace('vimeo.com', 'player.vimeo.com/video');
  }
  return url;
}

export function CompanyDetail() {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [videos, setVideos] = useState<CompanyVideo[]>([]);
  const [metrics, setMetrics] = useState<CompanyMetric[]>([]);
  const [qna, setQna] = useState<CompanyQnA[]>([]);
  const [news, setNews] = useState<CompanyNews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    Promise.all([
      supabase.from('companies').select('*').eq('id', id).single(),
      supabase.from('executives').select('*').eq('company_id', id).order('created_at'),
      supabase.from('company_videos').select('*').eq('company_id', id).order('is_main', { ascending: false }),
      supabase.from('company_metrics').select('*').eq('company_id', id).order('month'),
      supabase.from('company_qna').select('*').eq('company_id', id).order('created_at'),
      supabase.from('company_news').select('*').eq('company_id', id).order('published_at', { ascending: false }),
    ]).then(([companyRes, execRes, videoRes, metricRes, qnaRes, newsRes]) => {
      if (cancelled) return;
      const c = companyRes.data;
      // 관리자에 의해 거절/차단/비공개 처리된 회사는 투자자에게 표시하지 않음
      if (c && (!c.is_visible || c.is_blocked || c.approval_status !== 'approved')) {
        setCompany(null);
      } else {
        setCompany(c);
        setExecutives(execRes.data ?? []);
        setVideos(videoRes.data ?? []);
        setMetrics(metricRes.data ?? []);
        setQna(qnaRes.data ?? []);
        setNews(newsRes.data ?? []);
      }
      setLoading(false);
    }).catch(() => {
      if (!cancelled) setLoading(false);
    });

    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-muted-foreground">
        Company not found.
      </div>
    );
  }

  const mainVideo = videos.find((v) => v.is_main);
  const extraVideos = videos.filter((v) => !v.is_main);

  const linkButtons = [
    { url: company.website_url, icon: Globe, label: 'Website' },
    { url: company.github_url, icon: Github, label: 'GitHub' },
    { url: company.linkedin_url, icon: Linkedin, label: 'LinkedIn' },
    { url: company.twitter_url, icon: XIcon, label: 'X' },
    { url: company.youtube_url, icon: Youtube, label: 'YouTube' },
  ].filter((l) => l.url);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-10">
      {/* Back */}
      <Link
        to="/companies"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Companies
      </Link>

      {/* Company Header */}
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="w-28 h-28 rounded-2xl bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
          {company.logo_url ? (
            <img src={company.logo_url} alt={company.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl font-bold text-muted-foreground">{company.name[0]}</span>
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-serif mb-3">{company.name}</h1>
          <p className="text-xl text-muted-foreground mb-5">{company.short_description}</p>
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {company.category}
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              {company.stage}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            {company.location && (
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {company.location}
              </span>
            )}
            {company.founded_at && (
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Founded {company.founded_at}
              </span>
            )}
            {company.employee_count && (
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {company.employee_count} employees
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Company Links */}
      {linkButtons.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {linkButtons.map((l) => (
            <a
              key={l.label}
              href={l.url!}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-sm"
            >
              <l.icon className="w-4 h-4" />
              {l.label}
            </a>
          ))}
        </div>
      )}

      {/* Intro Video */}
      {mainVideo && (
        <section>
          <h2 className="text-2xl font-serif mb-6 flex items-center gap-3">
            <Play className="w-6 h-6" /> Company Introduction
          </h2>
          <div className="aspect-video rounded-2xl overflow-hidden bg-secondary max-w-4xl">
            <iframe
              src={toEmbedUrl(mainVideo.video_url)}
              title="Company Introduction"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {mainVideo.description && (
            <p className="mt-4 text-muted-foreground">{mainVideo.description}</p>
          )}
        </section>
      )}

      {/* About */}
      <section>
        <h2 className="text-2xl font-serif mb-6">About</h2>
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-muted-foreground whitespace-pre-wrap break-words leading-relaxed">
            {company.description}
          </p>
        </div>
      </section>

      {/* Leadership Team */}
      {executives.length > 0 && (
        <section>
          <h2 className="text-2xl font-serif mb-6">Leadership Team</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {executives.map((exec) => (
              <Card key={exec.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-5">
                    <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
                      {exec.photo_url ? (
                        <img
                          src={exec.photo_url}
                          alt={exec.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Users className="w-8 h-8 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Badge variant="outline" className="text-xs mb-2">
                        {exec.role}
                      </Badge>
                      <h3 className="font-semibold text-lg">{exec.name}</h3>
                      {exec.education && (
                        <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                          <GraduationCap className="w-4 h-4 flex-shrink-0" />
                          <span>{exec.education}</span>
                        </p>
                      )}
                      {exec.bio && (
                        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                          {exec.bio}
                        </p>
                      )}
                      <div className="flex gap-2 mt-4">
                        {exec.linkedin_url && (
                          <a
                            href={exec.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-xs"
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                            LinkedIn
                          </a>
                        )}
                        {exec.twitter_url && (
                          <a
                            href={exec.twitter_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-xs"
                          >
                            <XIcon className="w-3.5 h-3.5" />
                            X
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Extra Videos */}
      {extraVideos.length > 0 && (
        <section>
          <h2 className="text-2xl font-serif mb-6">More Videos</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {extraVideos.map((v) => (
              <Card key={v.id}>
                <CardContent className="p-6">
                  <div className="aspect-video rounded-lg overflow-hidden bg-black">
                    <iframe
                      src={toEmbedUrl(v.video_url)}
                      title="Video"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  {v.description && (
                    <p className="mt-3 text-sm text-muted-foreground">{v.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Business Metrics */}
      {metrics.length > 0 && (() => {
        const stripeMetrics = metrics.filter((m) => m.source === 'stripe' && m.revenue != null);
        const ga4Metrics = metrics.filter((m) => m.source === 'ga4' && m.mau != null);
        const sessionsMetrics = metrics.filter((m) => m.source === 'ga4' && m.sessions != null);
        const conversionsMetrics = metrics.filter((m) => m.source === 'ga4' && m.conversions != null);
        if (stripeMetrics.length === 0 && ga4Metrics.length === 0) return null;

        const latestStripe = stripeMetrics[stripeMetrics.length - 1];
        const latestGA4 = ga4Metrics[ga4Metrics.length - 1];
        const latestSessions = sessionsMetrics[sessionsMetrics.length - 1];
        const latestConversions = conversionsMetrics[conversionsMetrics.length - 1];

        return (
          <section>
            <h2 className="text-2xl font-serif mb-2 flex items-center gap-3">
              <BarChart3 className="w-6 h-6" /> Business Metrics
            </h2>
            <p className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
              Verified Data
              {company.stripe_connected && <Badge variant="secondary">Stripe</Badge>}
              {company.ga4_connected && <Badge variant="secondary">GA4</Badge>}
              {company.last_data_update && (
                <span className="ml-2">Last updated: {new Date(company.last_data_update).toLocaleDateString()}</span>
              )}
            </p>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {latestStripe && (
                <>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">Latest MRR</p>
                      <p className="font-semibold text-2xl">${latestStripe.revenue!.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground mt-1">{latestStripe.month}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">Total Revenue</p>
                      <p className="font-semibold text-2xl">
                        ${stripeMetrics.reduce((s, m) => s + (m.revenue || 0), 0).toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{stripeMetrics.length} months</p>
                    </CardContent>
                  </Card>
                </>
              )}
              {latestGA4 && (
                <>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">Latest MAU</p>
                      <p className="font-semibold text-2xl">{latestGA4.mau!.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground mt-1">{latestGA4.month}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">Avg MAU</p>
                      <p className="font-semibold text-2xl">
                        {Math.round(ga4Metrics.reduce((s, m) => s + (m.mau || 0), 0) / ga4Metrics.length).toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{ga4Metrics.length} months</p>
                    </CardContent>
                  </Card>
                </>
              )}
              {latestSessions && (
                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">Latest Sessions</p>
                    <p className="font-semibold text-2xl">{latestSessions.sessions!.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">{latestSessions.month}</p>
                  </CardContent>
                </Card>
              )}
              {latestConversions && latestSessions && (
                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">Conversion Rate</p>
                    <p className="font-semibold text-2xl">
                      {latestSessions.sessions! > 0
                        ? ((latestConversions.conversions! / latestSessions.sessions!) * 100).toFixed(2)
                        : '0'}%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{latestConversions.month}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              {stripeMetrics.length > 1 && (
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm font-medium mb-4">Revenue Trend</p>
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={stripeMetrics.map((m) => ({ month: m.month, revenue: m.revenue }))} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="detailRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#635BFF" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#635BFF" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis
                            dataKey="month"
                            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                            axisLine={{ stroke: 'hsl(var(--border))' }}
                            tickLine={false}
                          />
                          <YAxis
                            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v: number) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px',
                              fontSize: '12px',
                            }}
                            formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                          />
                          <Area type="monotone" dataKey="revenue" stroke="#635BFF" strokeWidth={2} fill="url(#detailRevenueGrad)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* MAU Chart */}
              {ga4Metrics.length > 1 && (
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm font-medium mb-4">Monthly Active Users</p>
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={ga4Metrics.map((m) => ({ month: m.month, mau: m.mau }))} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="detailMauGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#F9AB00" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#F9AB00" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis
                            dataKey="month"
                            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                            axisLine={{ stroke: 'hsl(var(--border))' }}
                            tickLine={false}
                          />
                          <YAxis
                            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px',
                              fontSize: '12px',
                            }}
                            formatter={(value) => [Number(value).toLocaleString(), 'MAU']}
                          />
                          <Area type="monotone" dataKey="mau" stroke="#F9AB00" strokeWidth={2} fill="url(#detailMauGrad)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Sessions Chart */}
              {sessionsMetrics.length > 1 && (
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm font-medium mb-4">Sessions</p>
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={sessionsMetrics.map((m) => ({ month: m.month, sessions: m.sessions }))} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="detailSessionsGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#34A853" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#34A853" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={{ stroke: 'hsl(var(--border))' }} tickLine={false} />
                          <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`} />
                          <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} formatter={(value) => [Number(value).toLocaleString(), 'Sessions']} />
                          <Area type="monotone" dataKey="sessions" stroke="#34A853" strokeWidth={2} fill="url(#detailSessionsGrad)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Conversions Chart */}
              {conversionsMetrics.length > 1 && (
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm font-medium mb-4">Conversions</p>
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={conversionsMetrics.map((m) => ({ month: m.month, conversions: m.conversions }))} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="detailConversionsGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#EA4335" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#EA4335" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={{ stroke: 'hsl(var(--border))' }} tickLine={false} />
                          <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`} />
                          <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} formatter={(value) => [Number(value).toLocaleString(), 'Conversions']} />
                          <Area type="monotone" dataKey="conversions" stroke="#EA4335" strokeWidth={2} fill="url(#detailConversionsGrad)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        );
      })()}

      {/* Q&A */}
      {qna.length > 0 && (
        <section>
          <h2 className="text-2xl font-serif mb-6 flex items-center gap-3">
            <MessageSquare className="w-6 h-6" /> Investor Q&A
          </h2>
          <div className="space-y-6">
            {qna.map((q) => (
              <Card key={q.id}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">{q.question}</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {q.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* News */}
      {news.length > 0 && (
        <section>
          <h2 className="text-2xl font-serif mb-6 flex items-center gap-3">
            <Newspaper className="w-6 h-6" /> Company News
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {news.map((n) => (
              <Card key={n.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {n.thumbnail_url && (
                      <img
                        src={n.thumbnail_url}
                        alt={n.title}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-2">{n.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {new Date(n.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                        {n.summary && ` · ${n.summary}`}
                      </p>
                      {n.external_link && (
                        <a
                          href={n.external_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                        >
                          Read article <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

