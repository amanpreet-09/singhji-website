'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    setLoading(false);

    if (res.ok) {
      router.push('/admin/dashboard');
      router.refresh();
    } else {
      setError('Incorrect password. Please try again.');
    }
  }

  return (
    <section className="section flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm border border-hairline bg-paper p-8">
        <h1 className="font-serif text-2xl text-ink">Admin login</h1>
        <p className="mt-2 text-sm text-stone">
          Sign in to update photos and site content.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="password" className="text-sm text-stone">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full border border-hairline bg-cream px-4 py-2 text-ink"
            />
          </div>

          {error && <p className="text-sm text-maroon">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </section>
  );
}
