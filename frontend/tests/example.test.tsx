import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

test("increments counter", () => {
  const { getByText } = render(<Counter />);
  const button = getByText("Increment");
  fireEvent.click(button);
  expect(getByText("Count: 1")).toBeInTheDocument();
});
