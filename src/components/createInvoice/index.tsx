import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import ContactInfo from "./subComponents/ContactInfo";
import GeneralForm from "./subComponents/GeneralForm";
import ItemDescriptionTable from "./subComponents/ItemDescriptionTable";
import ItemTotal from "./subComponents/ItemTotal";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TaxInvoice from "../salesHistory/subComponents/TaxInvoice";
import { useDispatch, useSelector } from "react-redux";
import { updateInvoices } from "../store/InvoiceSlice";
import axios from "axios";

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  customer_company: string;
  address: string;
  gstin: string;
  state: string;
}

const CreateInvoice = () => {
  const [customerData, setCustomerData] = useState<Customer[]>([]);
  const [generalFormData, setGeneralFormData] = useState({
    invoice_number: "",
    due_date: "",
  });
  const [invoicesData, setInvoicesData] = useState<any[]>([]);
  const [customerId, setCustomerId] = useState();
  const [flag, setFlag] = useState(false);

  const theme = useTheme();

  const companyId = useSelector((state: any) => {
    return state.companyData.companyId;
  });

  const dispatch = useDispatch();

  const fetchCustomersData = async () => {
    const response = await axios.get(
      "https://d2fn51spwb39qw.cloudfront.net/customer/get-customers",
      {
        params: {
          token: sessionStorage.getItem("loginToken"),
        },
      }
    );
    if (response.data) {
      setCustomerData(response.data);
    }
  };

  useEffect(() => {
    fetchCustomersData();
  }, []);

  useEffect(() => {
    fetchCustomersData();
  }, [companyId]);

  const dataFromCustomer = (data: any) => {
    setCustomerId(data);
  };

  const dataFromGeneral = (data: any) => {
    setGeneralFormData(data);
  };

  const dataFromInvoices = (data: any) => {
    setInvoicesData(data);
  };

  const mycomponentRef = useRef<HTMLDivElement>(null);
  // const [createInvoice] = useMutation(gqlMutations.createInvoice);

  const totalAmount = invoicesData?.reduce(
    (total, invoice) => total + invoice?.amount,
    0
  );

  const saveInvoiveToDB = async () => {
    try {
      const inputs = await Promise.all(
        invoicesData?.map(async (invoice) => {
          const { qty, discount, gst, amount, company_id, item_id } = invoice;

          const input = {
            invoice_number: generalFormData?.invoice_number,
            due_date: generalFormData?.due_date,
            total_amount: totalAmount,
            qty,
            discount,
            gst,
            amount,
            // company: { company_id },
            // customer: { customer_id: customerId },
            // item: { item_id },
            company_id,
            customer_id: customerId,
            item_id,
          };
          return input;
        })
      );

      await axios.post(
        "https://d2fn51spwb39qw.cloudfront.net/invoice/create-invoice",
        {
          token: sessionStorage.getItem("loginToken"),
          inputs,
        }
      );

      dispatch(updateInvoices(Math.floor(Math.random() * 1000000)));
      toast.success("Invoice Created Successfully!");
    } catch (error) {
      console.error("Error during invoice addition");
    }
  };

  const downloadInvoicePdf = async () => {
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
      });

      // Define page dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const ref = mycomponentRef;

      if (ref.current) {
        ref.current.style.display = "block";

        await html2canvas(ref.current).then((canvas) => {
          const imageWidth = canvas.width;
          const imageHeight = canvas.height;

          // Calculate scaling factor to fit the component onto the page
          const scaleFactor = Math.min(
            pageWidth / imageWidth,
            pageHeight / imageHeight
          );

          // Calculate scaled dimensions
          const scaledWidth = imageWidth * scaleFactor;
          const scaledHeight = imageHeight * scaleFactor;

          // Calculate position to center the component
          const xPos = (pageWidth - scaledWidth) / 2;
          const yPos = (pageHeight - scaledHeight) / 2;
          // Add image of the component to the PDF at centered position with original size
          pdf.addImage(
            canvas.toDataURL(),
            "PNG",
            xPos,
            yPos,
            scaledWidth,
            scaledHeight
          );

          pdf.save(`tax-invoice-${generalFormData?.invoice_number}.pdf`);
        });

        ref.current.style.display = "none";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadInvoice = async () => {
    try {
      await saveInvoiveToDB();
      setFlag(true);

      setTimeout(() => {
        downloadInvoicePdf();
      }, 2000);

      toast.success("Invoice Downloaded Successfully!");
    } catch (error) {
      console.error("Error during invoice download");
    }
  };

  const handleAddInvoice = async () => {
    saveInvoiveToDB();
  };

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Select Client
      </Typography>
      <ContactInfo
        customerData={customerData}
        dataFromCustomer={dataFromCustomer}
      />
      <Divider sx={{ marginBlock: 3, borderBottomWidth: "1px" }} />
      <GeneralForm dataFromGeneral={dataFromGeneral} />
      <Box sx={{ marginBlock: 4 }}>
        <ItemDescriptionTable dataFromInvoices={dataFromInvoices} />
      </Box>
      <Box sx={{ mb: 4 }}>
        <ItemTotal subTotal={totalAmount} total={totalAmount} />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={handleDownloadInvoice}
          sx={{
            textTransform: "uppercase",
            backgroundColor: theme.palette.primary.main,
            "&:hover": { backgroundColor: theme.palette.primary.dark },
            borderRadius: 3,
          }}
        >
          Download Invoice
        </Button>
        <Button
          variant="contained"
          onClick={handleAddInvoice}
          sx={{
            textTransform: "uppercase",
            backgroundColor: theme.palette.primary.contrastText,
            "&:hover": { backgroundColor: theme.palette.primary.light },
            borderRadius: 3,
            color: "#44814e",
          }}
        >
          Save to later
        </Button>
      </Box>
      <Box ref={mycomponentRef} sx={{ mt: 3, display: "none" }}>
        <Box sx={{ marginLeft: 7, marginRight: 7 }}>
          <TaxInvoice
            invoice_number={generalFormData?.invoice_number}
            flag={flag}
          />
        </Box>
      </Box>
    </>
  );
};

export default CreateInvoice;
