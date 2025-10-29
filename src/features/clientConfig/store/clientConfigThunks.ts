import { createAsyncThunk } from "@reduxjs/toolkit";
import { ClientConfig } from "./types";

export const fetchClientConfig = createAsyncThunk(
  "clientConfig/fetchClientConfig",
  async (clientId: number) => {
    const response = await fetch(
      `http://localhost:3000/mobile-config?clientId=${clientId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch client configuration");
    }
    return response.json() as Promise<ClientConfig>;
  }
);

export const updateClientConfig = createAsyncThunk(
  "clientConfig/updateClientConfig",
  async (config: ClientConfig) => {
    const response = await fetch(`http://localhost:3000/mobile-config`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config),
    });
    if (!response.ok) {
      throw new Error("Failed to update client configuration");
    }
    return response.json() as Promise<ClientConfig>;
  }
);
