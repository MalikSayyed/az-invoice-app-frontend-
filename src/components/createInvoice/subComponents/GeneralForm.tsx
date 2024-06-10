import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";

interface GeneralFormProps {
  dataFromGeneral: (arg: any) => void;
}

const GeneralForm: React.FC<GeneralFormProps> = ({ dataFromGeneral }) => {
  const [generalData, setGeneralData] = useState({
    invoice_number: "",
    due_date: "",
  });

  useEffect(() => {
    dataFromGeneral(generalData);
  }, [dataFromGeneral, generalData]);

  return (
    <>
      <Typography variant="h2" sx={{ textTransform: "uppercase", fontWeight: "700", fontSize: "18px", mb: 2 }}>
        General
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Typography color="gray" mb={1} textTransform="uppercase" fontSize="0.8125rem">
            Invoice No
          </Typography>
          <TextField
            type="text"
            size="small"
            value={generalData.invoice_number}
            placeholder="INV-1"
            fullWidth
            onChange={(e) => {
              setGeneralData({ ...generalData, invoice_number: e.target.value });
            }}
            sx={{ "& .MuiOutlinedInput-input": { color: "gray" } }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Typography color="gray" mb={1} textTransform="uppercase" fontSize="0.8125rem">
            Due Date
          </Typography>
          <TextField
            type="date"
            size="small"
            value={generalData.due_date}
            placeholder="INV-1"
            fullWidth
            onChange={(e) => {
              setGeneralData({ ...generalData, due_date: e.target.value });
            }}
            sx={{ "& .MuiOutlinedInput-input": { color: "gray" } }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default GeneralForm;
