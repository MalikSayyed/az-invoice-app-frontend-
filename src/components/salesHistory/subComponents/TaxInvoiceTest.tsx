import { Box } from "@mui/material";
import TaxInvoice from "./TaxInvoice";

const TaxInvoiceTest = () => {
  return (
    <Box sx={{ marginLeft: 7, marginRight: 7 }}>
      <TaxInvoice invoice_number="INV-8" />
    </Box>
  );
};

export default TaxInvoiceTest;
