import { Grid, Box, Typography } from "@mui/material";
import { CalcTaxableAmount } from "./CalcTaxableAmount";

const numberToWords = (num: number): string => {
  const units = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const thousands = ["", "Thousand", "Million", "Billion"];

  if (num === 0) return "Zero";

  const toWords = (num: number): string => {
    if (num === 0) return "";
    let str = "";

    if (num < 10) {
      str += units[num];
    } else if (num < 20) {
      str += teens[num - 10];
    } else if (num < 100) {
      str += tens[Math.floor(num / 10)] + " " + toWords(num % 10);
    } else {
      str +=
        units[Math.floor(num / 100)] +
        " Hundred " +
        (num % 100 !== 0 ? "And " : "") +
        toWords(num % 100);
    }

    return str.trim();
  };

  let words = "";
  for (let i = 0; i < thousands.length && num > 0; i++) {
    if (num % 1000 !== 0) {
      if (words !== "") {
        words = toWords(num % 1000) + " " + thousands[i] + " And " + words;
      } else {
        words = toWords(num % 1000) + " " + thousands[i] + " " + words;
      }
    }
    num = Math.floor(num / 1000);
  }

  return words.trim() + " Rupees Only";
};

const AmountChargeable = ({ invoiceData }: { invoiceData: any }) => {
  return (
    <Box>
      {invoiceData.length > 0 && (
        <Grid container>
          <Grid item xs={12} sx={{ border: "2px solid black", padding: 2 }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
              Amount Chargeable (in words) : INR{" "}
              {numberToWords(Math.floor(1.18 * CalcTaxableAmount(invoiceData)))}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default AmountChargeable;
