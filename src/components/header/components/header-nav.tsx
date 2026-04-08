'use client';

import Link from 'next/link';
import { Typography } from '@/components/ui/typography';
import { cva } from 'class-variance-authority'
import { usePathname } from 'next/navigation';

const linkVariants = cva(
  'text-gray-700 hover:text-gray-900',
  {
    variants: {
      variant: {
        default: '',
        active: 'font-bold',
      },
    },
  }
);

const navItems = [{
    label: 'Home',
    href: '/',
  },
  {
    label: 'Search',
    href: '/search',
}];

export function HeaderNav() {
    const pathname = usePathname();

    return <nav className="flex items-center gap-4 flex-1" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return <Link
              key={item.href}
              href={item.href}
              prefetch={false}
            >
              <Typography as="span" variant="body2" className={linkVariants({ variant: isActive ? 'active' : 'default' })}>
                {item.label}
              </Typography>
            </Link>
          })}
        </nav>
}
