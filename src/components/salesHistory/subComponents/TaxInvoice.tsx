import TaxHeading from "./TaxHeading";
import InvoiceHeaderInfo from "./InvoiceHeaderInfo";
import ItemHeader from "./ItemHeader";
import ItemDataRows from "./ItemDataRows";
import TaxableAmount from "./TaxableAmount";
import TotalAmount from "./TotalAmount";
import AmountChargeable from "./AmountChargeable";
import AmountPayable from "./AmountPayable";
import BankDetails from "./BankDetails";
import { Box } from "@mui/material";
import TermsConditions from "./TermsConditions";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

interface Invoice {
  invoice_number: string;
  invoice_date: Date;
  due_date: string;
  total_amount: number;
  qty: number;
  amount: number;
  company: {
    name: string;
    gst_number: string;
    phone: number;
    address: string;
    place_of_supply: string;
  };
  customer: {
    name: string;
    phone: number;
    address: string;
  };
  item: {
    item_name: string;
    hsn_sac: string;
    qty: number;
    rate: number;
  };
}

interface TaxInvoiceProps {
  invoice_number: string;
  flag?: boolean;
}

const TaxInvoice: React.FC<TaxInvoiceProps> = ({ invoice_number, flag }) => {
  const [invoiceData, setInvoiceData] = useState<Invoice[]>([]);

  const companyId = useSelector((state: any) => {
    return state.companyData.companyId;
  });

  // const { loading, error, data, refetch } = useQuery(gqlQueries.GET_INVOICE, {
  //   variables: { token, invoice_number },
  // });

  const fetchInvoiceData = async () => {
    const response = await axios.get(
      "https://d2nxa7pir92htg.cloudfront.net/invoice/get-invoice",
      {
        params: {
          token: sessionStorage.getItem("loginToken"),
          invoice_number,
        },
      }
    );
    if (response.data) {
      setInvoiceData(response.data);
    }
  };

  useEffect(() => {
    fetchInvoiceData();
  }, []);

  useEffect(() => {
    fetchInvoiceData();
  }, [invoice_number, flag, invoiceData, companyId]);

  return (
    <Box>
      <TaxHeading />
      <InvoiceHeaderInfo invoiceData={invoiceData} />
      <ItemHeader />
      <ItemDataRows invoiceData={invoiceData} />
      <TaxableAmount invoiceData={invoiceData} />
      <TotalAmount invoiceData={invoiceData} />
      <AmountChargeable invoiceData={invoiceData} />
      <AmountPayable invoiceData={invoiceData} />
      <BankDetails />
      <TermsConditions />
    </Box>
  );
};

export default TaxInvoice;
