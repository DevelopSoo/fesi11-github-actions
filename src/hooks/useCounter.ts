import { useState } from "react";

export const useCounter = (initialValue: number = 0) => {
  // 리액트가 만든 use로 시작하는 함수가 훅
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(initialValue);

  return {
    count,
    increment,
    decrement,
    reset,
  };
};
