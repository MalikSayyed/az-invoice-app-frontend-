import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CustomerState {
  customerId: number | null;
}

const initialState: CustomerState = {
  customerId: null,
};

const customerSlice: any = createSlice({
  name: "customer",
  initialState,
  reducers: {
    updateCustomers: (state, action: PayloadAction<number>) => {
      state.customerId = action.payload;
    },
  },
});

export const { updateCustomers } = customerSlice.actions;
// export default amountSlice.reducer;
export { customerSlice };
