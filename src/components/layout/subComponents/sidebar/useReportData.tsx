// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { exportToExcel } from "./exportToExcel";

export function useReportData() {
  // const [combinedData, setCombinedData] = useState<any[]>([]);

  // const token = sessionStorage.getItem("loginToken");

  // const companyId = useSelector((state: any) => {
  //   return state.companyData.companyId;
  // });

  // const customerId = useSelector((state: any) => {
  //   return state.customerData.customerId;
  // });

  // const itemId = useSelector((state: any) => {
  //   return state.itemData.itemId;
  // });

  // const invoiceId = useSelector((state: any) => {
  //   return state.invoiceData.invoiceId;
  // });

  // const {
  //   loading: companiesLoading,
  //   error: companiesError,
  //   data: companiesData,
  //   refetch: companiesRefetch,
  // } = useQuery(gqlQueries.getCompanies, {
  //   variables: { token: token },
  // });

  // const {
  //   loading: customersLoading,
  //   error: customersError,
  //   data: customersData,
  //   refetch: customersRefetch,
  // } = useQuery(gqlQueries.getAllCustomers, {
  //   variables: { token: token },
  // });

  // const {
  //   loading: itemsLoading,
  //   error: itemsError,
  //   data: itemsData,
  //   refetch: itemsRefetch,
  // } = useQuery(gqlQueries.GET_ALL_USER_ITEMS, {
  //   variables: { token: token },
  // });

  // const {
  //   loading: invoicesLoading,
  //   error: invoicesError,
  //   data: invoicesData,
  //   refetch: invoicesRefetch,
  // } = useQuery(gqlQueries.GET_ALL_INVOICES, {
  //   variables: { token: token },
  // });

  // useEffect(() => {
  //   if (
  //     !companiesLoading &&
  //     !customersLoading &&
  //     !itemsLoading &&
  //     !invoicesLoading &&
  //     !companiesError &&
  //     !customersError &&
  //     !itemsError &&
  //     !invoicesError
  //   ) {
  //     const newCombinedData = [
  //       ...companiesData.getCompanies,
  //       ...customersData.getAllCustomers,
  //       ...itemsData.getAllItems,
  //       ...invoicesData.getAllInvoices,
  //     ];
  //     setCombinedData(newCombinedData);
  //     console.log(newCombinedData);
  //   }
  //   companiesRefetch();
  //   customersRefetch();
  //   itemsRefetch();
  //   invoicesRefetch();
  // }, [
  //   companiesData,
  //   customersData,
  //   itemsData,
  //   invoicesData,
  //   companyId,
  //   customerId,
  //   itemId,
  //   invoiceId,
  // ]);

  // useEffect(() => {
  //   if (!companiesLoading && !customersLoading && !itemsLoading) {
  //     companiesRefetch();
  //     customersRefetch();
  //     itemsRefetch();
  //     invoicesRefetch();
  //   }
  // }, [companiesLoading, customersLoading, itemsLoading, invoicesLoading]);

  const handleReportExport = () => {
    // console.log("combinedData: ", combinedData);
    // exportToExcel(combinedData, "report.xlsx");
  };

  return {
    // combinedData,
    handleReportExport,
  };
}
