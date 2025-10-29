import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ClientConfig, ClientConfigState } from "./types";

export const fetchClientConfig = createAsyncThunk(
  "clientConfig/fetchClientConfig",
  async (clientId: number) => {
    const response = await fetch(
      `http://localhost:3000/mobile-config-by-client-id?clientId=${clientId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch client configuration");
    }
    return response.json() as Promise<ClientConfig>;
  }
);

const initialState: ClientConfigState = {
  data: null,
  loading: false,
  error: null,
};

const clientConfigSlice = createSlice({
  name: "clientConfig",
  initialState,
  reducers: {
    updateDeliveryMethod: (
      state,
      action: PayloadAction<{ index: number; selected: boolean }>
    ) => {
      if (state.data && state.data.deliveryMethods[action.payload.index]) {
        state.data.deliveryMethods[action.payload.index].selected =
          action.payload.selected;
      }
    },
    updateFulfillmentFormat: (
      state,
      action: PayloadAction<Partial<ClientConfig["fulfillmentFormat"]>>
    ) => {
      if (state.data) {
        state.data.fulfillmentFormat = {
          ...state.data.fulfillmentFormat,
          ...action.payload,
        };
      }
    },
    updatePrintingFormat: (
      state,
      action: PayloadAction<Partial<ClientConfig["printingFormat"]>>
    ) => {
      if (state.data) {
        state.data.printingFormat = {
          ...state.data.printingFormat,
          ...action.payload,
        };
      }
    },
    updateScanning: (
      state,
      action: PayloadAction<Partial<ClientConfig["scanning"]>>
    ) => {
      if (state.data) {
        state.data.scanning = { ...state.data.scanning, ...action.payload };
      }
    },
    updatePaymentMethods: (
      state,
      action: PayloadAction<Partial<ClientConfig["paymentMethods"]>>
    ) => {
      if (state.data) {
        state.data.paymentMethods = {
          ...state.data.paymentMethods,
          ...action.payload,
        };
      }
    },
    updateTicketDisplay: (
      state,
      action: PayloadAction<Partial<ClientConfig["ticketDisplay"]>>
    ) => {
      if (state.data) {
        state.data.ticketDisplay = {
          ...state.data.ticketDisplay,
          ...action.payload,
        };
      }
    },
    updateCustomerInfo: (
      state,
      action: PayloadAction<Partial<ClientConfig["customerInfo"]>>
    ) => {
      if (state.data) {
        state.data.customerInfo = {
          ...state.data.customerInfo,
          ...action.payload,
        };
      }
    },
    updatePrinter: (state, action: PayloadAction<ClientConfig["printer"]>) => {
      if (state.data) {
        state.data.printer = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchClientConfig.fulfilled,
        (state, action: PayloadAction<ClientConfig>) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchClientConfig.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch client configuration";
      });
  },
});

export const {
  updateDeliveryMethod,
  updateFulfillmentFormat,
  updatePrintingFormat,
  updateScanning,
  updatePaymentMethods,
  updateTicketDisplay,
  updateCustomerInfo,
  updatePrinter,
} = clientConfigSlice.actions;

export default clientConfigSlice.reducer;
