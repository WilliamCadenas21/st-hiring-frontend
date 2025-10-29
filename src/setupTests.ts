import "@testing-library/jest-dom";
import { server } from "./mocks/server";
import { afterAll, afterEach, beforeAll } from "vitest";

// Establish API mocking before all tests.
beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
// Reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error states).
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
