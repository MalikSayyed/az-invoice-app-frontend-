import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { exportDataToJson } from "./exportDataToJson";
import { handleFileImportChange } from "./importFileUtils";
import axios from "axios";

export function useExportImportData() {
  const [openDialog, setOpenDialog] = useState(false);
  const [combinedData, setCombinedData] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [companiesData, setCompaniesData] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [customersData, setCustomersData] = useState([]);
  const [invoicesData, setInvoicesData] = useState([]);

  const notify = (message: string) => {
    if (message === "Import Completed") {
      toast.success("Import Completed");
    }
  };

  const dispatch = useDispatch();

  const companyId = useSelector((state: any) => {
    return state.companyData.companyId;
  });

  const customerId = useSelector((state: any) => {
    return state.customerData.customerId;
  });

  const itemId = useSelector((state: any) => {
    return state.itemData.itemId;
  });

  const invoiceId = useSelector((state: any) => {
    return state.invoiceData.invoiceId;
  });

  const fetchCompaniesReport = async () => {
    const response = await axios.get(
      "https://dnznqi8n78t2t.cloudfront.net/company/get-companies-export",
      {
        params: {
          token: sessionStorage.getItem("loginToken"),
        },
      }
    );
    if (response.data) {
      setCompaniesData(response.data);
    }
  };

  const fetchItemsReport = async () => {
    const response = await axios.get(
      "https://dnznqi8n78t2t.cloudfront.net/item/get-items-export",
      {
        params: {
          token: sessionStorage.getItem("loginToken"),
        },
      }
    );
    if (response.data) {
      setItemsData(response.data);
    }
  };

  const fetchCustomersReport = async () => {
    const response = await axios.get(
      "https://dnznqi8n78t2t.cloudfront.net/customer/get-customers-export",
      {
        params: {
          token: sessionStorage.getItem("loginToken"),
        },
      }
    );
    if (response.data) {
      setCustomersData(response.data);
    }
  };

  const fetchInvoicesReport = async () => {
    const response = await axios.get(
      "https://dnznqi8n78t2t.cloudfront.net/invoice/get-invoices-export",
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

  useEffect(() => {
    fetchCompaniesReport();
    fetchItemsReport();
    fetchCustomersReport();
    fetchInvoicesReport();
  }, []);

  useEffect(() => {
    fetchCompaniesReport();
    fetchItemsReport();
    fetchCustomersReport();
    fetchInvoicesReport();
  }, [companyId, customerId, itemId, invoiceId]);

  useEffect(() => {
    const newCombinedData = [
      ...companiesData,
      ...customersData,
      ...itemsData,
      ...invoicesData,
    ];
    setCombinedData(newCombinedData);
    // console.log(newCombinedData);
  }, [companiesData, customersData, itemsData, invoicesData]);

  const handleExport = () => {
    console.log("combinedData: ", combinedData);
    exportDataToJson(combinedData, "combined_data.json");
    setOpenDialog(false);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFileImportChange(
      event,
      selectedFile,
      setSelectedFile,
      dispatch,
      notify,
      setOpenDialog
    );
  };

  return {
    combinedData,
    openDialog,
    selectedFile,
    handleExport,
    handleFileInputChange,
    setOpenDialog,
  };
}
