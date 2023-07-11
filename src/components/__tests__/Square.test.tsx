import { vi } from "vitest";
import { fireEvent, render, screen } from "../../utils/test-utils";
import Square from "../Square";

describe("Square", () => {
  it("should render", () => {
    render(<Square value="X" highlight={true} onClick={vi.fn} />);
    const buttonElement = screen.getByRole("button", { name: "X" });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("highlight");
  });

  it("should run handler when click button", () => {
    const spyFunction = vi.fn();
    render(<Square value="X" highlight={true} onClick={spyFunction} />);
    const buttonElement = screen.getByRole("button", { name: "X" });
    fireEvent.click(buttonElement);
    expect(spyFunction).toBeCalled();
  });
});
