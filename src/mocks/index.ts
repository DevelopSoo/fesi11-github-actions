export async function initMocks() {
  // npm run dev -> process.env.NODE_ENV === "development"
  // npm run start -> process.env.NODE_ENV === "production"
  if (process.env.NODE_ENV !== "development") return;

  // 서버에서 요청할 때 -> 서버 컴포넌트에서 API 요청할 때
  if (typeof window === "undefined") {
    const { server } = await import("./server");
    server.listen();
  } else {
    const { worker } = await import("./browser");
    await worker.start();
  }
}
