import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { exportToExcel } from "../../layout/subComponents/sidebar/exportToExcel";

export function useReportData(
  companyId: string,
  customerId: string,
  itemId: string
) {
  const [companiesData, setCompaniesData] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [customersData, setCustomersData] = useState([]);
  const [invoicesData, setInvoicesData] = useState([]);

  const [combinedData, setCombinedData] = useState<any[]>([]);

  const invoiceId = useSelector((state: any) => {
    return state.invoiceData.invoiceId;
  });

  const fetchCompaniesReport = async () => {
    const response = await axios.get(
      "https://d3a7975fhwm13k.cloudfront.net/company/get-companies-report",
      {
        params: {
          token: sessionStorage.getItem("loginToken"),
          companyId,
          customerId,
          itemId,
        },
      }
    );
    if (response.data) {
      setCompaniesData(response.data);
    }
  };

  const fetchItemsReport = async () => {
    const response = await axios.get(
      "https://d3a7975fhwm13k.cloudfront.net/item/get-items-report",
      {
        params: {
          token: sessionStorage.getItem("loginToken"),
          companyId,
          itemId,
        },
      }
    );
    if (response.data) {
      setItemsData(response.data);
    }
  };

  const fetchCustomersReport = async () => {
    const response = await axios.get(
      "https://d3a7975fhwm13k.cloudfront.net/customer/get-customers-report",
      {
        params: {
          token: sessionStorage.getItem("loginToken"),
          companyId,
          customerId,
        },
      }
    );
    if (response.data) {
      setCustomersData(response.data);
    }
  };

  const fetchInvoicesReport = async () => {
    const response = await axios.get(
      "https://d3a7975fhwm13k.cloudfront.net/invoice/get-invoices-report",
      {
        params: {
          token: sessionStorage.getItem("loginToken"),
          companyId,
          customerId,
          itemId,
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

  const handleReportExport = () => {
    console.log("combinedData: ", combinedData);
    exportToExcel(combinedData, "report.xlsx");
  };

  return {
    combinedData,
    handleReportExport,
  };
}
