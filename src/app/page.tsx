// src/app/page.tsx

"use client";

export default function Home() {
  return (
    <>
      <h1>환경변수 vercel-cli 변경</h1>
      <div>{process.env.NEXT_PUBLIC_API}</div>
    </>
  );
}
