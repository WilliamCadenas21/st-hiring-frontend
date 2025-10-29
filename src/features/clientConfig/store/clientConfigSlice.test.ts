import { describe, it, expect } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import clientConfigReducer from "./clientConfigSlice";
import { fetchClientConfig } from "./clientConfigThunks";
import { rest } from "msw";
import { server } from "../../../mocks/server";

const makeStore = () =>
  configureStore({
    reducer: { clientConfig: clientConfigReducer },
  });

describe("clientConfig slice", () => {
  it("fetches and stores client config (fulfilled)", async () => {
    const store = makeStore();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await store.dispatch(fetchClientConfig(123) as any);
    const state = store.getState().clientConfig;
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.data).not.toBeNull();
    expect(state.data?.clientId).toBe(123);
  });

  it("handles fetch error (rejected)", async () => {
    // Override handler to return 500
    server.use(
      rest.get("http://localhost:3000/mobile-config", (_req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const store = makeStore();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await store.dispatch(fetchClientConfig(999) as any);
    const state = store.getState().clientConfig;
    expect(state.loading).toBe(false);
    expect(state.data).toBeNull();
    expect(state.error).toBeTruthy();
  });
});
