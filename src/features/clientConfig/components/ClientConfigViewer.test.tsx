import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import clientConfigReducer from "../store/clientConfigSlice";
import ClientConfigViewer from "./ClientConfigViewer";
import { expect, test } from "vitest";

const makeStore = () =>
  configureStore({
    reducer: { clientConfig: clientConfigReducer },
  });

test("renders and fetches data on submit", async () => {
  const store = makeStore();
  render(
    <Provider store={store}>
      <ClientConfigViewer />
    </Provider>
  );

  const input = screen.getByLabelText(/Client ID/i);
  await userEvent.type(input, "123");
  const button = screen.getByRole("button", { name: /Fetch Config/i });
  await userEvent.click(button);

  // Expect the heading to appear with the mocked clientId
  const heading = await screen.findByText(/Client Configuration \(ID: 123\)/i);
  expect(heading).toBeInTheDocument();
});
