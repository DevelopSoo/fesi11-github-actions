// src/app/page.test.tsx

import { render } from "@testing-library/react";
import Home from "./page";

describe("MSW 모킹 테스트", () => {
  test("홈 화면에 환영 문구가 잘 나온다.", async () => {
    render(<Home />);
  });
});
