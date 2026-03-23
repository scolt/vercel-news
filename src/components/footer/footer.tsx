import { cacheLife } from "next/cache";

export async function Footer() {
  'use cache';
  cacheLife({ expire: 24 * 60 * 60 });

  return <footer className="w-full border-t py-4 text-center text-sm text-gray-500">
    &copy; {new Date().getFullYear()} Vercel Daily News. All rights reserved. Created by Viktar Parashchanka.
  </footer>
}