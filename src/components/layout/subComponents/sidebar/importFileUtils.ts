import { updateCustomers } from "../../../store/CustomerSlice";
import { update } from "../../../store/CompanySlice";
import { updateItems } from "../../../store/ItemSlice";
import { updateInvoices } from "../../../store/InvoiceSlice";
import axios from "axios";

export function handleFileImportChange(
  event: React.ChangeEvent<HTMLInputElement>,
  selectedFile: File | null,
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
  dispatch: React.Dispatch<any>,
  notify: (message: string) => void,
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (selectedFile) {
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      if (e.target) {
        const content = JSON.parse(e.target.result as string);
        for (const contentitem of content) {
          if (contentitem.__typename === "Company") {
            const input = {
              name: contentitem.name,
              gst_number: contentitem.gst_number,
              phone: contentitem.phone,
              state: contentitem.state,
              email: contentitem.email,
              address: contentitem.address,
              selected_company: contentitem.selected_company,
            };

            await axios.post(
              "https://d2nxa7pir92htg.cloudfront.net/company/import-company",
              {
                token: sessionStorage.getItem("loginToken"),
                input,
              }
            );
          }
        }
        for (const contentitem of content) {
          if (contentitem.__typename === "CustomersWithCompanyNames") {
            const input = {
              name: contentitem.name,
              email: contentitem.email,
              phone: contentitem.phone,
              customer_company: contentitem.customer_company,
              gstin: contentitem.gstin,
              state: contentitem.state,
              address: contentitem.address,
              companyName: contentitem.companyName,
            };

            await axios.post(
              "https://d2nxa7pir92htg.cloudfront.net/customer/import-customer",
              {
                token: sessionStorage.getItem("loginToken"),
                input,
              }
            );
          }
        }
        for (const contentitem of content) {
          if (contentitem.__typename === "ItemsWithCompanyNames") {
            const input = {
              item_name: contentitem.item_name,
              item_code: contentitem.item_code,
              item_details: contentitem.item_details,
              hsn_sac: contentitem.hsn_sac,
              qty: contentitem.qty,
              rate: contentitem.rate,
              companyName: contentitem.companyName,
            };

            await axios.post(
              "https://d2nxa7pir92htg.cloudfront.net/item/import-item",
              {
                token: sessionStorage.getItem("loginToken"),
                input,
              }
            );
          }
        }
        for (const contentitem of content) {
          if (contentitem.__typename === "InvoicesWithRelations") {
            const input = {
              invoice_number: contentitem.invoice_number,
              invoice_date: contentitem.invoice_date,
              due_date: contentitem.due_date,
              total_amount: parseFloat(contentitem.total_amount),
              qty: parseFloat(contentitem.qty),
              discount: parseFloat(contentitem.discount),
              gst: parseFloat(contentitem.gst),
              amount: parseFloat(contentitem.amount),
              companyName: contentitem.companyName,
              customerName: contentitem.customerName,
              itemName: contentitem.itemName,
            };
            await axios.post(
              "https://d2nxa7pir92htg.cloudfront.net/invoice/import-invoice",
              {
                token: sessionStorage.getItem("loginToken"),
                input,
              }
            );
          }
        }
        dispatch(update(Math.floor(Math.random() * 1000000)));
        dispatch(updateCustomers(Math.floor(Math.random() * 1000000)));
        dispatch(updateItems(Math.floor(Math.random() * 1000000)));
        dispatch(updateInvoices(Math.floor(Math.random() * 1000000)));
      }
    };

    notify("Import Completed");
    setOpenDialog(false);
    reader.readAsText(file);
  }
}
