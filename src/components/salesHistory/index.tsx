import * as React from "react";
import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Grid, useTheme, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommonTable from "../common/CommonTable";
import CustomDialog from "../common/CustomDialog";
import TaxInvoice from "./subComponents/TaxInvoice";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateFormatConverter } from "./subComponents/DateFormatConverter";
import { updateInvoices } from "../store/InvoiceSlice";
import axios from "axios";

interface Invoice {
  customer: { name: string };
  invoice_number: string;
  invoice_date: Date;
  due_date: string;
  total_amount: number;
}

interface CustomError {
  response: {
    data: {
      error: string;
    };
  };
}

const SalesHistory: React.FC = () => {
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [invoicesData, setInvoicesData] = useState<Invoice[]>([]);

  const mycomponentRef = useRef<HTMLDivElement>(null);

  const companyId = useSelector((state: any) => {
    return state.companyData.companyId;
  });

  const invoiceId = useSelector((state: any) => {
    return state.invoiceData.invoiceId;
  });

  const dispatch = useDispatch();

  const token = sessionStorage.getItem("loginToken");

  // const { loading, error, data, refetch } = useQuery(
  //   gqlQueries.GET_INVOICE_BY_COMPANY,
  //   {
  //     variables: { token: token },
  //   }
  // );

  const fetchInvoiceByCompany = async () => {
    const response = await axios.get(
      "https://d3a7975fhwm13k.cloudfront.net/invoice/get-invoice-by-company",
      {
        params: {
          token: sessionStorage.getItem("loginToken"),
        },
      }
    );
    if (response.data) {
      setInvoicesData(response.data);
    }
  };

  React.useEffect(() => {
    fetchInvoiceByCompany();
  }, []);

  React.useEffect(() => {
    fetchInvoiceByCompany();
  }, [companyId, invoiceId]);

  // const [removeInvoice] = useMutation(gqlMutations.removeInvoice);

  const columns = useMemo(
    () => [
      {
        accessorKey: "customer_name",
        header: "CUSTOMER NAME",
        size: 80,
        Cell: ({ row }: any) => (
          <Box sx={{ fontSize: "0.8rem" }}>{row.original.customer_name}</Box>
        ),
      },
      {
        accessorKey: "invoice_number",
        header: "INVOICE_NUMBER",
        size: 80,
        Cell: ({ row }: any) => (
          <Box sx={{ fontSize: "0.8rem" }}>{row.original.invoice_number}</Box>
        ),
      },

      {
        accessorKey: "invoice_date",
        header: "INVOICE DATE",
        size: 80,
        Cell: ({ row }: any) => (
          <Box sx={{ fontSize: "0.8rem" }}>
            {DateFormatConverter(row.original.invoice_date)}
          </Box>
        ),
      },
      {
        accessorKey: "due_date",
        header: "DUE DATE",
        size: 80,
        Cell: ({ row }: any) => (
          <Box
            sx={{
              fontSize: "0.8rem",
            }}
          >
            {DateFormatConverter(row.original.due_date)}
          </Box>
        ),
      },
      {
        accessorKey: "total_amount",
        header: "TOTAL AMOUNT",
        size: 80,
        Cell: ({ row }: any) => (
          <Box style={{ fontSize: "0.8rem", borderBottom: "none" }}>
            {row.original.total_amount}
          </Box>
        ),
      },
      {
        accessorKey: "action",
        header: "ACTIONS",
        size: 150,
        Cell: ({ row }: any) => {
          return (
            <Box>
              <Box>
                <IconButton onClick={() => handleInvoiceView(row)}>
                  <VisibilityIcon sx={{ color: theme.palette.primary.light }} />
                </IconButton>
                <IconButton onClick={() => handleInvoiceDelete(row)}>
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
              </Box>
            </Box>
          );
        },
      },
    ],
    []
  );

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

          pdf.save("tax-invoice.pdf");
        });

        ref.current.style.display = "none";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInvoiceView = async (row: any) => {
    setInvoiceNumber(row.original.invoice_number);
    setTimeout(() => {
      downloadInvoicePdf();
    }, 2000);
  };

  const handleInvoiceDelete = async (row: any) => {
    setInvoiceNumber(row.original.invoice_number);
    setDeleteModalOpen(true);
  };

  const handleDeleteInvoiceClick = async () => {
    try {
      await axios.delete(
        "https://d3a7975fhwm13k.cloudfront.net/invoice/remove-invoice",
        {
          params: {
            token,
            invoice_number: invoiceNumber,
          },
        }
      );

      fetchInvoiceByCompany();
      dispatch(updateInvoices(Math.floor(Math.random() * 1000000)));
    } catch (error) {
      const deleteInvoiceError = error as CustomError;
      console.error(
        "Error while deleting invoice data:",
        deleteInvoiceError.response.data.error
      );
    }
  };

  const theme = useTheme();

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        All Sales Invoices
      </Typography>
      <Box>
        <CommonTable columns={columns} data={invoicesData} />
        <Box ref={mycomponentRef} sx={{ display: "none" }}>
          <Box sx={{ marginLeft: 7, marginRight: 7 }}>
            <TaxInvoice invoice_number={invoiceNumber} />
          </Box>
        </Box>
      </Box>

      <CustomDialog
        modalSize="xs"
        modalTitle="Delete Billing history"
        open={isDeleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        buttonAction="Delete"
        handleDelete={handleDeleteInvoiceClick}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Are you sure you want to delete?</Typography>
          </Grid>
        </Grid>
      </CustomDialog>
    </>
  );
};
export default SalesHistory;
