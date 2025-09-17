import { test, expect } from "@playwright/test";

test("로그인 후 구매까지의 시나리오", async ({ page }) => {
  // 1. 로그인 페이지로 이동
  await page.goto("/auth/login");
  // 이메일 입력창에 ~~를 입력한다.
  const emailInput = page.getByRole("textbox", { name: "이메일" });
  await emailInput.fill("abc@test.com");
  // 비밀번호 입력창에 비밀번호를 입력한다.
  const passwordInput = page.getByRole("textbox", { name: "비밀번호" });
  await passwordInput.fill("password123");

  // 로그인 버튼 클릭한다.
  const loginButton = page.getByRole("button", { name: "로그인" });
  await loginButton.click();

  // 2. 로그인을 완료하면 자동으로 상품 목록 페이지로 이동한다.
  await expect(page).toHaveURL("/products");

  // 3. 상품 목록의 첫 번째 상품을 클릭하면 상세 페이지로 이동한다.
  // data-testid의 값이 product- 로 시작하는 요소를 찾는다.
  const firstProduct = page.locator('[data-testid^="product-"]').first();
  await expect(firstProduct).toBeVisible();
  const productId = await firstProduct.getAttribute("data-product-id");

  await firstProduct.click();

  // 상품 상세 페이지로 이동한다.
  await expect(page).toHaveURL(`/products/${productId}`);

  // 수량 증가 버튼을 2번 클릭한다.
  const increaseButton = page.getByRole("button", { name: "+" });
  await increaseButton.click();
  await increaseButton.click();

  const purchaseButton = page.getByRole("button", { name: "구매" });
  await purchaseButton.click();

  // 4. 구매 완료 페이지로 이동한다.
  await expect(page).toHaveURL("/purchase/complete");
  // 구매 완료 메시지가 표시된다.
  await expect(page.getByText("구매가 완료되었습니다.")).toBeVisible();
});
