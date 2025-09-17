"use client";

import { useEffect, useState } from "react";
import { initMocks } from "@/mocks";

export const MSWComponent = ({ children }: { children: React.ReactNode }) => {
  // 여기 코드가 실행되고 화면에 보여주세요
  // 클라이언트 컴포넌트가 실행되기 전에 여기 코드 실행 후에 화면에 렌더링하세요

  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initMocks();
      setMswReady(true);
    };

    if (!mswReady) {
      init();
    }
  }, [mswReady]);

  if (!mswReady) {
    return null;
  }

  return <>{children}</>;
};
