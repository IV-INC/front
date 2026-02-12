import { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';
import { supabase } from '@/lib/supabase';

interface ImageUploadProps {
  label?: string;
  error?: string;
  required?: boolean;
  bucket: string;
  path: string;
  value?: string;
  onChange: (url: string | null) => void;
  className?: string;
  shape?: 'square' | 'circle';
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'w-20 h-20',
  md: 'w-32 h-32',
  lg: 'w-40 h-40',
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export function ImageUpload({
  label,
  error,
  required,
  bucket,
  path,
  value,
  onChange,
  className,
  shape = 'square',
  size = 'md',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imgBroken, setImgBroken] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // 부모 value가 변경되면 로컬 preview 동기화
  useEffect(() => {
    if (value) {
      setPreviewUrl(null);
      setImgBroken(false);
    }
  }, [value]);

  const displayUrl = value || previewUrl;

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        setUploadError('Only image files are allowed.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('File size must be 5MB or less.');
        return;
      }

      setUploading(true);
      setUploadError(null);
      setImgBroken(false);

      try {
        // 로컬 스토리지에서 직접 토큰 읽기 (SDK auth lock 우회)
        let accessToken: string | null = null;
        try {
          const storageKey = Object.keys(localStorage).find(
            (k) => k.startsWith('sb-') && k.endsWith('-auth-token'),
          );
          if (storageKey) {
            const raw = localStorage.getItem(storageKey);
            if (raw) {
              const parsed = JSON.parse(raw);
              accessToken = parsed?.access_token || null;
            }
          }
        } catch {
          // localStorage 파싱 실패 → SDK fallback
        }

        // 로컬 스토리지에서 토큰을 못 찾으면 SDK에서 가져오기 (5초 타임아웃)
        if (!accessToken) {
          try {
            const sessionResult = await Promise.race([
              supabase.auth.getSession(),
              new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error('timeout')), 5000),
              ),
            ]);
            accessToken = sessionResult.data.session?.access_token || null;
          } catch {
            // SDK도 hang → 토큰 없이 진행 (서버가 에러 반환)
          }
        }

        const ext = file.name.split('.').pop();
        const fileName = `${path}/${crypto.randomUUID()}.${ext}`;

        // fetch로 직접 Supabase Storage REST API 호출
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        const headers: Record<string, string> = {
          'x-upsert': 'true',
        };
        if (accessToken) {
          headers['Authorization'] = `Bearer ${accessToken}`;
        }

        const response = await fetch(
          `${SUPABASE_URL}/storage/v1/object/${bucket}/${fileName}`,
          {
            method: 'POST',
            headers,
            body: file,
            signal: controller.signal,
          },
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          const body = await response.text().catch(() => '');
          if (response.status === 401 || response.status === 403) {
            setUploadError('Please log in again to upload.');
          } else {
            setUploadError(`Upload failed (${response.status}): ${body || response.statusText}`);
          }
          setUploading(false);
          return;
        }

        // public URL 생성
        const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${fileName}`;
        setPreviewUrl(publicUrl);
        onChangeRef.current(publicUrl);
      } catch (err) {
        console.error('Image upload error:', err);
        if (err instanceof DOMException && err.name === 'AbortError') {
          setUploadError('Upload timed out. Please try again.');
        } else {
          setUploadError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
        }
      } finally {
        setUploading(false);
      }
    },
    [bucket, path],
  );

  const handleRemove = useCallback(() => {
    setPreviewUrl(null);
    setImgBroken(false);
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  }, [onChange]);

  const displayError = error || uploadError;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div
        className={cn(
          'relative border-2 border-dashed flex items-center justify-center cursor-pointer overflow-hidden bg-background hover:bg-accent transition-colors',
          displayError ? 'border-red-400' : 'border-border',
          shape === 'circle' ? 'rounded-full' : 'rounded-lg',
          sizeMap[size],
        )}
        onClick={() => !uploading && inputRef.current?.click()}
      >
        {displayUrl && !imgBroken ? (
          <>
            <img
              src={displayUrl}
              alt="Upload preview"
              className="w-full h-full object-cover"
              onError={() => setImgBroken(true)}
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
            >
              <X className="w-3 h-3" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center text-muted-foreground">
            {uploading ? (
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
            ) : imgBroken ? (
              <>
                <AlertCircle className="w-6 h-6 mb-1 text-red-400" />
                <span className="text-xs text-red-400">Retry</span>
              </>
            ) : (
              <>
                <Upload className="w-6 h-6 mb-1" />
                <span className="text-xs">Upload</span>
              </>
            )}
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
          onChange={handleUpload}
          disabled={uploading}
        />
      </div>
      {displayError && <p className="mt-1 text-sm text-red-500">{displayError}</p>}
    </div>
  );
}
