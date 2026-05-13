'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/login?registered=true');
      } else {
        const data = await res.json();
        setError(data.message || 'Terjadi kesalahan saat registrasi');
      }
    } catch (err) {
      setError('Terjadi kesalahan internal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center bg-surface px-margin-mobile md:px-margin-desktop py-12">
      {/* Global Texture Overlay (Noise) */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.025] mix-blend-multiply z-0" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#80808020_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none z-0"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-fixed-dim/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>reviews</span>
            <span className="text-headline-sm font-headline-sm font-bold text-primary">ReviewBisnisku</span>
          </Link>
          <h1 className="text-headline-md font-headline-md text-on-surface mb-2">Buat Akun Baru</h1>
          <p className="text-body-md font-body-md text-on-surface-variant">Tingkatkan reputasi bisnis Anda dari sekarang.</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-outline-variant/50">
          <button 
            type="button" 
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full bg-white border border-outline-variant text-on-surface py-3 rounded-xl font-label-md text-label-md hover:bg-surface-variant transition-colors flex items-center justify-center gap-3 shadow-sm mb-6"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Daftar dengan Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-outline-variant/60"></div>
            <span className="text-body-sm text-on-surface-variant font-medium">atau dengan email</span>
            <div className="flex-1 h-px bg-outline-variant/60"></div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-xl text-body-sm font-medium">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-label-md font-label-md text-on-surface mb-2" htmlFor="name">Nama Lengkap</label>
              <input 
                type="text" 
                id="name" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-body-md font-body-md"
                placeholder="Budi Santoso"
              />
            </div>
            <div>
              <label className="block text-label-md font-label-md text-on-surface mb-2" htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-body-md font-body-md"
                placeholder="nama@email.com"
              />
            </div>
            <div>
              <label className="block text-label-md font-label-md text-on-surface mb-2" htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-body-md font-body-md"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-on-primary py-3.5 rounded-full font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container disabled:opacity-70 transition-colors shadow-md text-center mt-2"
            >
              {loading ? 'Memproses...' : 'Daftar Sekarang'}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              Sudah punya akun? <Link href="/login" className="text-primary font-bold hover:underline">Masuk di sini</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}