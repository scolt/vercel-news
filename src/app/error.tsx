'use client';

import {Button} from '@/components/ui/button';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="font-mono text-2xl font-semibold">Something went wrong</h2>
      <p className="text-muted-foreground">Unpredictable error occurred, please try again later.</p>
      <Button onClick={reset} >Try again</Button>
    </div>
  );
}
