import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ItemState {
  itemId: number | null;
}

const initialState: ItemState = {
  itemId: null,
};

const itemSlice: any = createSlice({
  name: "item",
  initialState,
  reducers: {
    updateItems: (state, action: PayloadAction<number>) => {
      state.itemId = action.payload;
    },
  },
});

export const { updateItems } = itemSlice.actions;
// export default amountSlice.reducer;
export { itemSlice };
