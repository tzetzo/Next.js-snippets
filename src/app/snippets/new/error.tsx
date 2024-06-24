"use client";

// this file is not used by the createSnippet Server Action as we use try/catch instead to return from both
// this file will be auto rendered in the browser whenever uncaught error occurs in page.tsx
// do not use error.tsx files!
// instead use try/catch and return in both

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  return <div>{error.message}</div>;
}
