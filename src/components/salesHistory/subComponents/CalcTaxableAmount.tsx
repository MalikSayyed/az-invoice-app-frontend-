export const CalcTaxableAmount = (invoiceData: any) => {
  let taxableAmount = 0;
  invoiceData.forEach((invoiceItem: any) => {
    taxableAmount += invoiceItem.qty * invoiceItem.item.rate;
  });

  return taxableAmount;
};
