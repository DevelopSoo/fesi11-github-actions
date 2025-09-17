import { render } from "@testing-library/react";
import Card from ".";

test("카드 스냅샷", () => {
  const cardProps = {
    title: "제목",
    description: "설명",
    imageUrl: "https://example.com/image.jpg",
  };
  const { container } = render(<Card {...cardProps} />);
  expect(container).toMatchSnapshot();
});
