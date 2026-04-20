import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardView from "./DashboardView";

test("renders loading state", () => {
  const client = new QueryClient();

  render(
    <QueryClientProvider client={client}>
      <DashboardView />
    </QueryClientProvider>,
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
