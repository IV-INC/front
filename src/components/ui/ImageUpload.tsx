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
        const ext = file.name.split('.').pop();
        const fileName = `${path}/${crypto.randomUUID()}.${ext}`;

        // 파일 업로드 (30초 타임아웃) — 세션이 없으면 Supabase가 자체 auth 에러 반환
        const uploadPromise = supabase.storage
          .from(bucket)
          .upload(fileName, file, { upsert: true });

        const result = await Promise.race([
          uploadPromise,
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Upload timed out. Please try again.')), 30000),
          ),
        ]);

        if (result.error) {
          // 인증 관련 에러 메시지 변환
          const msg = result.error.message;
          if (msg.includes('auth') || msg.includes('JWT') || msg.includes('token') || msg.includes('policy')) {
            setUploadError('Please log in again to upload.');
          } else {
            setUploadError(`Upload failed: ${msg}`);
          }
          return;
        }

        const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
        const publicUrl = data.publicUrl;

        // 로컬 preview를 먼저 세팅해서 즉시 이미지 표시
        setPreviewUrl(publicUrl);
        // 부모 form 값도 업데이트
        onChangeRef.current(publicUrl);
      } catch (err) {
        console.error('Image upload error:', err);
        setUploadError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
      } finally {
        setUploading(false);
      }
    },
    [bucket, path]
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
          sizeMap[size]
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
