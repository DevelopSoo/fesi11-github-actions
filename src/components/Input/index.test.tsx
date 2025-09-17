import { useState } from "react";
import { Input } from ".";
import { fireEvent, render, screen } from "@testing-library/react";

test("Input 컴포넌트에 미입력 시 X 버튼이 보이지 않아야 한다.", () => {
  render(<Input onChange={jest.fn()} onDelete={jest.fn()} />);
  // X버튼을 가져온다.
  // getByRole -> 못찾을 때 에러난다.
  //   query로 시작하는 놈은 없어도 에러가 안난다.
  const deleteButton = screen.queryByRole("button", { name: "입력값 지우기" });
  // input을 가져온다.
  const input = screen.getByRole("textbox");

  // input에는 값이 없고
  expect(input).toHaveValue("");
  // x 버튼이 보이지 않아야 한다.
  expect(deleteButton).not.toBeInTheDocument();
});

test("Input 컴포넌트에 입력값이 있으면 X 버튼이 보이는지 확인한다", () => {
  render(<Input value="입력값" onChange={jest.fn()} onDelete={jest.fn()} />);

  // X버튼을 가져온다.
  const deleteButton = screen.getByRole("button", { name: "입력값 지우기" });
  // input을 가져온다.
  const input = screen.getByRole("textbox");

  // input에는 값이 있고
  expect(input).toHaveValue("입력값");
  // x 버튼이 보여야 한다.
  expect(deleteButton).toBeInTheDocument();
});

// test("X 버튼을 클릭했을 때 입력값이 사라지는지 확인", () => {
//   render(<Input value="입력값" onChange={jest.fn()} onDelete={jest.fn()} />);

//   const input = screen.getByRole("textbox");
//   const deleteButton = screen.getByRole("button", { name: "입력값 지우기" });

//   // x 버튼을 클릭한다.
//   fireEvent.click(deleteButton);

//   // 입력값이 지워지고
//   expect(input).toHaveValue("");
//   // X 버튼이 사라진다.
//   expect(deleteButton).not.toBeInTheDocument();
// });

// -_-;;
test("X 버튼 클릭 시 onDelete props에 전달된 함수가 호출되는지 확인한다.", () => {
  const handleDelete = jest.fn();
  render(<Input value="입력값" onChange={jest.fn()} onDelete={handleDelete} />);

  const deleteButton = screen.getByRole("button", { name: "입력값 지우기" });

  // x 버튼을 클릭한다.
  fireEvent.click(deleteButton);

  // 1. 그냥 handleDelete가 X버튼을 누르면 호출이 되는지만 확인한다.
  expect(handleDelete).toHaveBeenCalled();
});

test("Input 컴포넌트에 (유효성) 에러 시 에러 메세지가 발생하는지 확인 테스트", () => {
  render(
    <Input
      isError={true}
      errorMessage={"입력값에 문제가 있습니다."}
      onChange={jest.fn()}
      onDelete={jest.fn()}
    />,
  );

  const errorMessage = screen.getByText("입력값에 문제가 있습니다.");

  expect(errorMessage).toBeInTheDocument();
});

test("X 버튼 클릭 시 입력값이 지워지는지 확인", () => {
  const Wrapper = () => {
    const [value, setValue] = useState("입력값");
    const handleDelete = () => {
      setValue("");
    };
    return (
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onDelete={handleDelete}
      />
    );
  };

  render(<Wrapper />);

  const input = screen.getByRole("textbox");
  const deleteButton = screen.getByRole("button", { name: "입력값 지우기" });

  // X 버튼 클릭
  fireEvent.click(deleteButton);

  // 입력값이 지워지고,
  expect(input).toHaveValue("");
  // X 버튼이 사라진다.
  expect(deleteButton).not.toBeInTheDocument();
});
