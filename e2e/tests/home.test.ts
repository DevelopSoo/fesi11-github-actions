import { test, expect } from "@playwright/test";

test("홈페이지가 올바르게 로드되는지 확인", async ({ page }) => {
  // 홈페이지를 방문한다.
  await page.goto("http://localhost:3000");

  // 제목을 찾는다. -> h1 태그를 찾는다.
  const title = page.locator("h1");
  await expect(title).toBeVisible();
  await expect(title).toHaveText("게시글 목록");
});
