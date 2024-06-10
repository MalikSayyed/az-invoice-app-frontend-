import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" } as const;
  const formattedDate = date.toLocaleDateString("en-IN", options);
  return formattedDate;
};

export async function exportToExcel(
  data: any[],
  filename: string
): Promise<void> {
  const wb = XLSX.utils.book_new();
  const companyData = data.filter((item) => item.__typename === "Company");
  const customerData = data.filter(
    (item) => item.__typename === "CustomersWithCompanyNames"
  );
  const itemData = data.filter(
    (item) => item.__typename === "ItemsWithCompanyNames"
  );
  const invoiceData = data.filter(
    (item) => item.__typename === "InvoicesWithRelations"
  );

  const excludeColumns = (data: any[], columnsToExclude: string[]) => {
    return data.map((item) => {
      const newItem = { ...item };
      columnsToExclude.forEach((column) => delete newItem[column]);
      return newItem;
    });
  };

  const companyColumnsToExclude = [
    "customers",
    "items",
    "invoices",
    "_id",
    "selected_company",
    "user",
    "__v",
    "__typename",
  ];
  const customerColumnsToExclude = [
    "invoices",
    "_id",
    "company",
    "__v",
    "__typename",
  ];
  const itemColumnsToExclude = [
    "invoices",
    "_id",
    "company",
    "__v",
    "__typename",
  ];
  const invoiceColumnsToExclude = [
    "_id",
    "company",
    "customer",
    "item",
    "__v",
    "__typename",
  ];

  const companyDataExcluded = excludeColumns(
    companyData,
    companyColumnsToExclude
  );
  const customerDataExcluded = excludeColumns(
    customerData,
    customerColumnsToExclude
  );
  const itemDataExcluded = excludeColumns(itemData, itemColumnsToExclude);
  const invoiceDataExcluded = excludeColumns(
    invoiceData,
    invoiceColumnsToExclude
  );

  const companyWS = XLSX.utils.json_to_sheet(companyDataExcluded);
  const customerWS = XLSX.utils.json_to_sheet(customerDataExcluded);
  const itemWS = XLSX.utils.json_to_sheet(itemDataExcluded);
  const formattedInvoiceData = invoiceDataExcluded.map((invoice) => ({
    ...invoice,
    invoice_date: formatDate(invoice.invoice_date),
    due_date: formatDate(invoice.due_date),
  }));
  const invoiceWS = XLSX.utils.json_to_sheet(formattedInvoiceData);

  XLSX.utils.book_append_sheet(wb, companyWS, "Companies");
  XLSX.utils.book_append_sheet(wb, customerWS, "Customers");
  XLSX.utils.book_append_sheet(wb, itemWS, "Items");
  XLSX.utils.book_append_sheet(wb, invoiceWS, "Invoices");

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  saveAs(new Blob([wbout], { type: "application/octet-stream" }), filename);
}
