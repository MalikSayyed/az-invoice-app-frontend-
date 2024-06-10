import * as React from "react";
import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import {
  TextField,
  Typography,
  Grid,
  useTheme,
  IconButton,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { fakeData } from "./subComponents/billingHistoryfakeData";
import CommonTable from "../common/CommonTable";
import CustomDialog from "../common/CustomDialog";

const BillingHistory: React.FC = () => {
  const [historyId, setHistoryId] = useState<string | undefined>();
  const [clientName, setClientName] = useState<string | undefined>();
  const [total, setTotal] = useState<string | undefined>();
  const [issuedDate, setIssuedDate] = useState<string | undefined>();
  const [balance, setBalance] = useState<string | undefined>();
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 80,
        Cell: ({ row }: any) => (
          <Box sx={{ fontSize: "0.8rem" }}>{row.original.id}</Box>
        ),
      },
      {
        accessorKey: "client",
        header: "CLIENT",
        size: 240,
        Cell: ({ row }: any) => (
          <Box display="flex">
            <Box>
              <Avatar alt="Remy Sharp" src={row.original.client.image} />
            </Box>
            <Box
              sx={{
                fontSize: "0.6rem",
                display: "flex",
                flexDirection: "column",
                ml: 4,
              }}
            >
              <Typography fontSize="1rem">
                {row.original.client.name}
              </Typography>
              <Typography fontSize="inherit">
                {row.original.client.email}
              </Typography>
            </Box>
          </Box>
        ),
      },

      {
        accessorKey: "total",
        header: "TOTAL",
        size: 80,
        Cell: ({ row }: any) => (
          <Box sx={{ fontSize: "0.8rem" }}>{row.original.total}</Box>
        ),
      },
      {
        accessorKey: "issued_date",
        header: "ISSUED DATE",
        size: 80,
        Cell: ({ row }: any) => (
          <Box
            sx={{
              fontSize: "0.8rem",
            }}
          >
            {row.original.issued_date}
          </Box>
        ),
      },
      {
        accessorKey: "balance",
        header: "BALANCE",
        size: 80,
        Cell: ({ row }: any) => (
          <Box style={{ fontSize: "0.8rem", borderBottom: "none" }}>
            {row.original.balance}
          </Box>
        ),
      },
      {
        accessorKey: "action",
        header: "ACTIONS",
        size: 150,
        Cell: ({ row }: any) => {
          return (
            <Box>
              <Box>
                <IconButton onClick={(event) => handleHistoryView(event, row)}>
                  <VisibilityIcon sx={{ color: theme.palette.primary.light }} />
                </IconButton>
                <IconButton onClick={(event) => handleHistoryEdit(event, row)}>
                  <EditIcon
                    sx={{ color: theme.palette.secondary.contrastText }}
                  />
                </IconButton>
                <IconButton onClick={(event) => handleHistoryDelete(event)}>
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
              </Box>
            </Box>
          );
        },
      },
    ],
    []
  );

  const handleHistoryEdit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: any
  ) => {
    event.stopPropagation();
    setHistoryId(row.original.id);
    setClientName(row.original.client.name);
    setTotal(row.original.total);
    setIssuedDate(row.original.issued_date);
    setBalance(row.original.balance);
    setEditModalOpen(true);
  };

  const handleHistoryView = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: any
  ) => {
    event.stopPropagation();
    setHistoryId(row.original.id);
    setClientName(row.original.client.name);
    setTotal(row.original.total);
    setIssuedDate(row.original.issued_date);
    setBalance(row.original.balance);
    setViewModalOpen(true);
  };

  const handleHistoryDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    // row: any
  ) => {
    event.stopPropagation();
    setDeleteModalOpen(true);
  };

  const theme = useTheme();

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Billing History
      </Typography>
      <Box>
        <CommonTable columns={columns} data={fakeData} />
      </Box>
      <CustomDialog
        modalSize="xs"
        modalTitle="Edit"
        open={isEditModalOpen}
        handleClose={() => setEditModalOpen(false)}
        buttonAction="Save"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              label="Client Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Total"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Issued Date"
              value={issuedDate}
              onChange={(e) => setIssuedDate(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Balance"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </Grid>
        </Grid>
      </CustomDialog>
      <CustomDialog
        modalSize="xs"
        modalTitle="Billing history details"
        open={isViewModalOpen}
        handleClose={() => setViewModalOpen(false)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField size="small" fullWidth label="ID" value={historyId} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Client Name"
              value={clientName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth size="small" label="Total" value={total} />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Issued Date"
              value={issuedDate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth size="small" label="Balance" value={balance} />
          </Grid>
        </Grid>
      </CustomDialog>
      <CustomDialog
        modalSize="xs"
        modalTitle="Delete Billing history"
        open={isDeleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        buttonAction="Delete"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Are you sure you want to delete?</Typography>
          </Grid>
        </Grid>
      </CustomDialog>
    </>
  );
};
export default BillingHistory;
