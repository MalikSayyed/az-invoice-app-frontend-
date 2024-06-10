import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InvoiceState {
  invoiceId: number | null;
}

const initialState: InvoiceState = {
  invoiceId: null,
};

const invoiceSlice: any = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    updateInvoices: (state, action: PayloadAction<number>) => {
      state.invoiceId = action.payload;
    },
  },
});

export const { updateInvoices } = invoiceSlice.actions;
// export default amountSlice.reducer;
export { invoiceSlice };
