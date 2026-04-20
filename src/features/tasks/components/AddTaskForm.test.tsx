import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddTaskForm from "./AddTaskForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

const renderWithClient = (ui: ReactNode) => {
  const client = new QueryClient();
  return render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>,
  );
};

test("allows user to type and submit task", async () => {
  renderWithClient(<AddTaskForm />);

  const input = screen.getByPlaceholderText(/enter task/i);
  const button = screen.getByRole("button", { name: /add/i });

  await userEvent.type(input, "My Task");
  await userEvent.click(button);

  expect(input).toHaveValue("");
});
