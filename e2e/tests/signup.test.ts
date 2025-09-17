import { test, expect } from "@playwright/test";

// 구조화 describe
test.describe("회원가입 페이지 E2E 테스트", () => {
  test.beforeEach(async ({ page }) => {
    // 회원가입 페이지로 이동
    await page.goto("/auth/signup");
  });
  test("회원가입 페이지가 올바르게 로드되는지 확인", async ({ page }) => {
    // 회원가입 페이지 라는 제목이 있는지 확인
    const heading = page.getByRole("heading", { name: "회원가입 페이지" });
    await expect(heading).toBeVisible();
  });

  test("로그인 링크를 클릭하면 로그인 페이지로 이동하는지 확인", async ({
    page,
  }) => {
    const loginLink = page.getByRole("link", { name: "로그인 페이지로 이동" });
    await expect(loginLink).toBeVisible();
    await loginLink.click();
    await expect(page).toHaveURL("/auth/login");
  });

  test("회원가입 폼이 올바르게 동작하는지 확인", async ({ page }) => {
    // input 요소 찾기
    const emailInput = page.getByPlaceholder("이메일");
    const passwordInput = page.getByPlaceholder("비밀번호", { exact: true });
    const confirmPasswordInput = page.getByPlaceholder("비밀번호 확인");
    const signupButton = page.getByRole("button", { name: "회원가입" });
    // 입력하기
    // fireEvent.change -> X
    // userEvent.type -> X
    await emailInput.fill("test@test.com");
    await passwordInput.fill("password");
    await confirmPasswordInput.fill("password");
    await signupButton.click();
    // 회원가입 완료 후 로그인 페이지로 이동하는지 확인
    await expect(page).toHaveURL("/auth/login");
  });
});
