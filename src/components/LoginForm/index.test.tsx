import { LoginForm } from ".";
import { fireEvent, render, screen } from "@testing-library/react";

describe("LoginForm", () => {
  let loginButton: HTMLElement;
  let emailInput: HTMLElement;
  let passwordInput: HTMLElement;

  beforeEach(() => {
    render(<LoginForm />);
    loginButton = screen.getByRole("button");
    emailInput = screen.getByLabelText("이메일");
    passwordInput = screen.getByPlaceholderText("비밀번호를 입력하세요");
  });

  describe("버튼 활성화 여부", () => {
    test("로그인 폼의 이메일과 비밀번호 미입력 시 로그인 버튼이 비활성화되는지 확인", () => {
      // 입력필드 값이 비어있는지 확인
      expect(emailInput).toHaveValue("");
      expect(passwordInput).toHaveValue("");

      // 버튼이 비활성화됐는지 확인
      expect(loginButton).toBeDisabled();
    });

    test("이메일, 비밀번호 입력 시 로그인 버튼 활성화되는지 확인", () => {
      fireEvent.change(emailInput, { target: { value: "test" } });
      fireEvent.change(passwordInput, { target: { value: "test" } });

      // 버튼이 활성화됐는지 확인
      expect(loginButton).toBeEnabled();
    });
  });

  describe("유효성 검사", () => {
    // 이메일 잘못 입력하면 '올바른 이메일 형식이 아닙니다.' 문구가 나오는지 확인
    test("이메일 형식이 올바르지 않을 때 에러 메시지가 표시되는지 확인", () => {
      fireEvent.change(emailInput, { target: { value: "test" } });

      const errorMessage = screen.getByText("올바른 이메일 형식이 아닙니다.");
      expect(errorMessage).toBeInTheDocument();
    });

    test("비밀번호 6자 미만 입력 시 '비밀번호는 6자 이상이어야 합니다.'라는 에러 메시지가 표시되는지 확인", () => {
      // 잘못된 비밀번호 입력
      fireEvent.change(passwordInput, { target: { value: "12345" } });

      // 에러 메시지 확인
      const errorMessage = screen.getByText(
        "비밀번호는 6자 이상이어야 합니다.",
      );
      expect(errorMessage).toBeInTheDocument();
    });

    test("제대로 된 이메일 입력 시 에러 메세지가 사라지는지 확인", () => {
      // 1. 잘못된 이메일 입력 후 에러 메세지 나오는지 확인
      fireEvent.change(emailInput, { target: { value: "test" } });
      const errorMessage = screen.getByText("올바른 이메일 형식이 아닙니다.");
      expect(errorMessage).toBeInTheDocument();

      // 2. 제대로 된 이메일 입력 후 에러 메세지가 사라지는지 확인
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  describe("로그인 버튼 클릭", () => {
    test("로그인 버튼 클릭 시 모달창이 나타나는지 확인", async () => {
      // 이메일과 비밀번호 입력
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ message: "로그인 성공" }),
      });

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });

      // 로그인 버튼 클릭
      fireEvent.click(loginButton);

      // 모달창이 나타나는지 확인
      const modal = await screen.findByText("로그인 성공");
      // getByText는 없으면 에러난다. -> 없다.
      // queryByText는 없으면 null을 반환한다. -> 없다.
      expect(modal).toBeInTheDocument();
    });
  });
});
