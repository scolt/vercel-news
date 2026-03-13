'use client';

export default function NewsError() {
  return <div className="flex flex-col items-center justify-center w-full gap-2">
    <h2 className="font-mono text-2xl font-semibold">Something went wrong</h2>
    <p className="text-muted-foreground">We couldn’t load this news article right now. Please try again in a few minutes.</p>
  </div>;
}
