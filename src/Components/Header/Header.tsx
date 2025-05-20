'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import React from 'react';

const links = [
  { href: '/popular', label: 'Popular' },
  { href: '/now-playing', label: 'Now Playing' },
  { href: '/top-rated', label: 'Top Rated' },
  { href: '/my-favorites', label: 'My Favorites' },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full border-b shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-xl font-serif text-gray-800 hover:text-blue-600 transition-colors"
        >
          Criterion Page
        </Link>
        <nav className="flex space-x-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "text-sm font-serif transition-colors hover:text-blue-600",
                pathname === href ? "text-blue-600 underline" : "text-gray-600"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;

