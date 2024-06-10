import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CompanyState {
  companyId: number | null;
}

const initialState: CompanyState = {
  companyId: null,
};

const companySlice: any = createSlice({
  name: "company",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<number>) => {
      state.companyId = action.payload;
    },
  },
});

export const { update } = companySlice.actions;
// export default amountSlice.reducer;
export { companySlice };
