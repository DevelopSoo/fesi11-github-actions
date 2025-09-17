import { render, screen } from "@testing-library/react";
import { Button } from ".";
import userEvent from "@testing-library/user-event";

test("버튼을 클릭하면 onClick 함수가 호출되는지 확인", async () => {
  const user = userEvent.setup();
  // 1. 진짜 함수를 만들 필요는 없음  -> 클릭하면 호출되기만 하면 됨
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>클릭</Button>);

  // 2. 버튼을 클릭한다.
  const button = screen.getByText("클릭");
  await user.click(button);

  // 3. 버튼 클릭 시 handleClick 함수가 1번 호출되는지 확인
  expect(handleClick).toHaveBeenCalledTimes(1);
});
