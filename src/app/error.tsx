"use client";

interface ErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-center text-[22px] font-bold">{error.message}</h1>
      <button
        className="rounded-sm bg-black px-8 py-3 text-sm text-white"
        onClick={reset}
      >
        Go back
      </button>
    </div>
  );
}
