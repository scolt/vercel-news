'use client';

import { Button } from '@/components/ui/button';

export default function NewsError({ unstable_retry }: { unstable_retry: () => void }) {
  return <div className="flex flex-col items-center justify-center w-full gap-2">
    <h2 className="font-mono text-2xl font-semibold">Something went wrong</h2>
    <p className="text-muted-foreground">We couldn’t process your search request.</p>
    <Button onClick={unstable_retry} >Try again</Button>
  </div>;
}
