'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  const displayName = session?.user?.name || session?.user?.email?.split('@')[0] || 'Pengguna';

  return (
    <header className="bg-surface shadow-sm docked full-width top-0 sticky z-50">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-primary text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            reviews
          </span>
          <span className="text-headline-md font-headline-md font-bold text-primary">
            ReviewBisnisku
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a
            className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200"
            href="#benefit"
          >
            Benefit
          </a>
          <a
            className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200"
            href="#carakerja"
          >
            Cara Kerja
          </a>
          <a
            className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200"
            href="#testimoni"
          >
            Testimoni
          </a>
          <a
            className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200"
            href="#harga"
          >
            Harga
          </a>
        </nav>

        <div className="flex items-center gap-4">
          {session ? (
            <div className="hidden md:flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface/80 px-4 py-2 text-on-surface shadow-sm">
              <span className="text-label-md font-label-md font-medium">Halo,</span>
              <span className="text-label-md font-label-md font-semibold text-primary truncate max-w-[160px]">
                {displayName}
              </span>
              <div className="w-px h-4 bg-outline-variant/50 mx-1"></div>
              <button
                onClick={() => signOut()}
                className="text-error font-label-md text-label-md hover:opacity-80 transition-opacity flex items-center gap-1"
                title="Logout"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:block text-primary font-label-md text-label-md hover:opacity-80 transition-opacity"
            >
              Login
            </Link>
          )}

          <Link
            href="/order"
            className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
          >
            Order
          </Link>
        </div>
      </div>
    </header>
  );
}
