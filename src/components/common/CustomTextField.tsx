import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";

interface TextFieldProps {
  label: string;
  placeholder?: string;
  type?: string;
}

const CustomTextField: React.FC<TextFieldProps> = ({ label, placeholder, type }) => {
  const [value, setValue] = useState("");

  return (
    <>
      <Typography color="gray" mb={1} textTransform="uppercase" fontSize="0.8125rem">
        {label}
      </Typography>
      <TextField
        type={type ? type : "text"}
        size="small"
        value={value}
        placeholder={placeholder}
        fullWidth
        onChange={(e) => setValue(e.target.value)}
        sx={{ "& .MuiOutlinedInput-input": { color: "gray" } }}
      />
    </>
  );
};

export default CustomTextField;
