import { configureStore } from "@reduxjs/toolkit";
import { companySlice } from "./CompanySlice";
import { customerSlice } from "./CustomerSlice";
import { itemSlice } from "./ItemSlice";
import { invoiceSlice } from "./InvoiceSlice";

const store = configureStore({
  reducer: {
    companyData: companySlice.reducer,
    customerData: customerSlice.reducer,
    itemData: itemSlice.reducer,
    invoiceData: invoiceSlice.reducer,
  },
});

export default store;
