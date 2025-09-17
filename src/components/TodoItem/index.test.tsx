import { render, screen } from "@testing-library/react";
import TodoItem from ".";

test("할 일 목록 상태 테스트", () => {
  render(<TodoItem task="테스트를 빡세게 공부해보기" completed={true} />);

  const taskText = screen.getByText("테스트를 빡세게 공부해보기");
  expect(taskText).toHaveTextContent("테스트를 빡세게 공부해보기");

  // 체크 박스가 체크되어 있는지 확인
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).toBeChecked();

  // 완료되면 수정 버튼이 비활성화되는지 확인
  const editButton = screen.getByRole("button", { name: "수정" });
  expect(editButton).toBeDisabled();

  // 완료되면 completed라는 클래스명이 존재하는지 확인
  const listItem = screen.getByRole("listitem");
  expect(listItem).toHaveClass("completed");
});
