// src/app/page.test.tsx

import { render, screen } from "@testing-library/react";
import Home from "./page";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";

describe("MSW 모킹 테스트", () => {
  test("홈 화면에 환영 문구가 잘 나온다.", async () => {
    render(<Home />);
  });
});
