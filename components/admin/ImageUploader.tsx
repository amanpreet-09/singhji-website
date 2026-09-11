'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

export default function ImageUploader({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFile(file: File) {
    setError('');
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData
    });

    setUploading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Upload failed');
      return;
    }

    const data = await res.json();
    onChange(data.url);
  }

  return (
    <div>
      <p className="text-sm text-stone mb-2">{label}</p>
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 border border-hairline bg-cream">
          {value && (
            <Image src={value} alt={label} fill className="object-cover" />
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="btn-outline text-xs"
          >
            {uploading ? 'Uploading…' : 'Replace photo'}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = '';
            }}
          />
          {error && <p className="mt-1 text-xs text-maroon">{error}</p>}
        </div>
      </div>
    </div>
  );
}
