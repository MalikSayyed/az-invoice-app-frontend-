import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import SquareIcon from "@mui/icons-material/Square";
import { useEffect, useState } from "react";
import CustomDialog from "../../../common/CustomDialog";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../../store/CompanySlice";
import axios from "axios";

interface Company {
  _id: number;
  name: string;
}

const CompanyName = () => {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>("");
  const [gstNumber, setGstNumber] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [billingAddress, setBillingAddress] = useState<string>("");
  const [companiesData, setCompaniesData] = useState<Company[]>([]);
  const dispatch = useDispatch();

  const companyId = useSelector((state: any) => {
    return state.companyData.companyId;
  });

  const fetchCompaniesData = async () => {
    const response = await axios.get(
      "https://d2nxa7pir92htg.cloudfront.net/company/get-companies",
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

  const fetchSelectedCompany = async () => {
    const response = await axios.get(
      "https://d2nxa7pir92htg.cloudfront.net/company/get-selected-company",
      {
        params: {
          token: sessionStorage.getItem("loginToken"),
        },
      }
    );
    if (response.data) {
      dispatch(update(response.data._id));
      setSelectedUser(response.data.name);
    }
  };

  useEffect(() => {
    fetchCompaniesData();
    fetchSelectedCompany();
  }, []);

  useEffect(() => {
    fetchCompaniesData();
    fetchSelectedCompany();
  }, [companyId]);

  // const [createCompany, { error: createCompanyError }] = useMutation(
  //   gqlMutations.createCompany
  // );

  // const [updateSelectedCompany, { error: updateSelectedCompanyError }] =
  //   useMutation(gqlMutations.updateSelectedCompany);

  const handleAddCompanyClick = async () => {
    try {
      const response = await axios.post(
        "https://d2nxa7pir92htg.cloudfront.net/company/create-company",
        {
          token: sessionStorage.getItem("loginToken"),
          name: companyName,
          gst_number: gstNumber,
          phone: phoneNumber,
          address: billingAddress,
          state,
          email,
        }
      );

      dispatch(update(response.data._id));
      fetchCompaniesData();
      setSelectedUser(companyName);
    } catch (error) {
      console.log(error);
    } finally {
      setCompanyName("");
      setGstNumber("");
      setPhoneNumber("");
      setState("");
      setEmail("");
      setBillingAddress("");
    }
  };

  const handleAddCompany = () => {
    setSelectedUser("");
    setCompanyName("");
    setGstNumber("");
    setPhoneNumber("");
    setState("");
    setEmail("");
    setBillingAddress("");
    setAddModalOpen(true);
  };

  const handleUserChange = async (event: SelectChangeEvent<string>) => {
    if (event.target.value === "Add Company") {
      setSelectedUser("");
      return;
    }

    const token = sessionStorage.getItem("loginToken");

    const response = await axios.post(
      "https://d2nxa7pir92htg.cloudfront.net/company/update-selected-company",
      {
        token,
        company_name: event.target.value,
      }
    );

    setSelectedUser(event.target.value);
    dispatch(update(response.data._id));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SquareIcon
        sx={{ fontSize: "2rem", color: "lightgray", borderRadius: "50%" }}
      />
      {companiesData.length > 0 ? (
        <Select
          value={selectedUser}
          onChange={handleUserChange}
          displayEmpty
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none !important",
            },
          }}
        >
          {companiesData.map((company) => (
            <MenuItem key={company._id} value={company.name}>
              {company.name}
            </MenuItem>
          ))}
          {/* <MenuItem value="Elon Musk">Elon Musk</MenuItem>
        <MenuItem value="Mark Zuckerberg">Mark Zuckerberg</MenuItem>
        <MenuItem value="Connor Mcgregor">Connor Mcgregor</MenuItem> */}
          <MenuItem value="Add Company">
            <Button
              variant="contained"
              sx={{ height: 25, textTransform: "none" }}
              onClick={handleAddCompany}
            >
              Add Company
            </Button>
          </MenuItem>
        </Select>
      ) : (
        <Typography></Typography>
      )}
      <CustomDialog
        modalSize="xs"
        modalTitle="Add new Company"
        open={isAddModalOpen}
        handleClose={() => setAddModalOpen(false)}
        buttonAction="Save"
        handleSave={handleAddCompanyClick}
        areFieldsFilled={
          companyName !== "" &&
          phoneNumber !== "" &&
          state !== "" &&
          email !== "" &&
          billingAddress !== ""
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="GST Number (optional)"
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              rows={4}
              fullWidth
              label="Billing Address"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
            />
          </Grid>
        </Grid>
      </CustomDialog>
    </Box>
  );
};

export default CompanyName;
