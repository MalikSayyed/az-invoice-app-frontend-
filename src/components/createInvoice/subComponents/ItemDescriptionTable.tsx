import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import axios from "axios";

interface Item {
  _id: string;
  item_name: string;
  item_details: string;
  hsn_sac: string;
  qty: number;
  rate: number;
}

interface ItemData {
  _id: string;
  item_name: string;
  item_details: string;
  hsn_sac: string;
  qty: number;
  rate: number;
  per: string;
  discount: number;
  gst: number;
  amount: number;
  company_id: number;
  item_id: string;
}

interface TableProps {
  dataFromTable: (arg: any) => void;
}

const Example = ({ dataFromTable }: TableProps) => {
  const initialInvoice = useMemo(
    () => ({
      qty: 0,
      per: "",
      discount: 0,
      gst: 0,
      amount: 0,
    }),
    []
  );

  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<Item>();
  const [itemList, setItemList] = useState<Item[]>([]);
  const [invoice, setInvoice] = useState(initialInvoice);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const companyId = useSelector((state: any) => {
    return state.companyData.companyId;
  });

  const fetchItemsData = async () => {
    const response = await axios.get(
      "https://d2nxa7pir92htg.cloudfront.net/item/get-items",
      {
        params: {
          token: sessionStorage.getItem("loginToken"),
        },
      }
    );
    if (response.data) {
      setItemList(response.data);
    }
  };

  useEffect(() => {
    fetchItemsData();
  }, []);

  useEffect(() => {
    fetchItemsData();
  }, [companyId]);

  useEffect(() => {
    if (selectedItemId) {
      const foundObject = itemList?.find((item) => item._id == selectedItemId);
      setSelectedItem(foundObject);
    } else {
      setSelectedItem({
        _id: "",
        item_name: "",
        item_details: "",
        hsn_sac: "",
        qty: 0,
        rate: 0,
      });
    }
  }, [itemList, selectedItemId]);

  const columns = useMemo<MRT_ColumnDef<ItemData>[]>(
    () => [
      {
        accessorKey: "item_name",
        header: "Item Name",
        size: 80,
        editVariant: "select",
        editSelectOptions: itemList?.map((item) => ({
          value: item?._id,
          label: item?.item_name,
        })),
        muiEditTextFieldProps: {
          select: true,
          value: selectedItem ? selectedItem._id : "",
          onChange: (e) => {
            const itemId = e.target.value;
            setSelectedItemId(itemId);
          },
        },
      },
      {
        accessorKey: "item_details",
        header: "Item Detail",
        size: 80,
        muiEditTextFieldProps: {
          value: selectedItem ? selectedItem.item_details : "",
        },
      },
      {
        accessorKey: "hsn_sac",
        header: "HSN/SAC",
        size: 80,
        muiEditTextFieldProps: {
          required: true,
          value: selectedItem ? selectedItem.hsn_sac : "",
        },
      },
      {
        accessorKey: "qty",
        header: "Qty",
        size: 80,
        muiEditTextFieldProps: {
          required: true,
          value: invoice.qty,
          onChange: (e) => setInvoice({ ...invoice, qty: +e.target.value }),
          error: !!validationErrors?.qty,
          helperText: validationErrors?.qty,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              qty: undefined,
            }),
        },
      },
      {
        accessorKey: "rate",
        header: "Rate",
        size: 50,
        muiEditTextFieldProps: {
          required: true,
          value: selectedItem ? selectedItem.rate : "",
        },
      },
      {
        accessorKey: "per",
        header: "PER",
        size: 50,
        muiEditTextFieldProps: {
          required: true,
          value: invoice.per,
          onChange: (e) => setInvoice({ ...invoice, per: e.target.value }),
        },
      },
      {
        accessorKey: "discount",
        header: "Discount (%)",
        size: 80,
        muiEditTextFieldProps: {
          required: true,
          value: invoice.discount,
          onChange: (e) =>
            setInvoice({ ...invoice, discount: +e.target.value }),
        },
      },
      {
        accessorKey: "gst",
        header: "GST (%)",
        size: 50,
        muiEditTextFieldProps: {
          required: true,
          value: invoice.gst,
          onChange: (e) => setInvoice({ ...invoice, gst: +e.target.value }),
        },
      },
      {
        accessorKey: "amount",
        header: "Amount",
        size: 80,
        muiEditTextFieldProps: {
          required: true,
          value: invoice.amount,
        },
      },
    ],
    [invoice, itemList, selectedItem, validationErrors]
  );

  useEffect(() => {
    if (selectedItem) {
      const subTotal = selectedItem?.rate * invoice.qty;
      const deduction = (invoice.discount / 100) * subTotal;
      const tax = (invoice.gst / 100) * (subTotal - deduction);

      setInvoice({ ...invoice, amount: subTotal - deduction + tax });
    }
  }, [invoice, selectedItem?.rate]);

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  //call READ hook
  const {
    data: newData = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();

  const [data, setData] = useState<ItemData[]>(() => newData);

  useEffect(() => {
    setData(newData);
  }, [newData]);

  useEffect(() => {
    dataFromTable(data);
  }, [data, dataFromTable]);

  const handleEdit = (row: MRT_Row<ItemData>) => {
    const itemToEdit = itemList.find(
      (item) => item.item_name === row.original.item_name
    );
    setSelectedItem(itemToEdit);
    setInvoice({
      qty: row.original.qty,
      per: row.original.per,
      discount: row.original.discount,
      gst: row.original.gst,
      amount: row.original.amount,
    });
  };

  const clearInvoiceFields = () => {
    setInvoice({
      amount: 0,
      discount: 0,
      gst: 0,
      per: "",
      qty: 0,
    });
    setSelectedItem({
      _id: "",
      item_name: "",
      item_details: "",
      hsn_sac: "",
      qty: 0,
      rate: 0,
    });
  };

  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //CREATE action
  const handleCreateUser: MRT_TableOptions<ItemData>["onCreatingRowSave"] =
    async ({ values, table }) => {
      const newValidationErrors = validateInvoice(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});

      const selectedItemData = selectedItem || {
        _id: "",
        item_name: "",
        item_details: "",
        hsn_sac: "",
        rate: 0,
      };

      const createData = {
        ...values,
        _id: (Math.random() + 1).toString(36).substring(7),
        item_name: selectedItemData?.item_name,
        item_details: selectedItemData?.item_details,
        hsn_sac: selectedItemData?.hsn_sac,
        qty: invoice.qty,
        rate: selectedItemData?.rate,
        per: invoice.per,
        discount: invoice.discount,
        gst: invoice.gst,
        amount: invoice.amount,
        company_id: companyId,
        item_id: selectedItemData?._id,
      };
      await createUser(createData);
      table.setCreatingRow(null); //exit creating mode
      clearInvoiceFields();
    };

  //UPDATE action
  const handleSaveUser: MRT_TableOptions<ItemData>["onEditingRowSave"] =
    async ({ values, table }) => {
      const newValidationErrors = validateInvoice(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});

      const selectedItemData = selectedItem || {
        _id: "",
        item_name: "",
        item_details: "",
        hsn_sac: "",
        rate: 0,
      };

      const updateData = {
        ...values,
        item_name: selectedItemData?.item_name,
        item_details: selectedItemData?.item_details,
        hsn_sac: selectedItemData?.hsn_sac,
        qty: invoice.qty,
        rate: selectedItemData?.rate,
        per: invoice.per,
        discount: invoice.discount,
        gst: invoice.gst,
        amount: invoice.amount,
        company_id: companyId,
        item_id: selectedItemData?._id,
      };
      await updateUser(updateData);
      table.setEditingRow(null); //exit editing mode
      clearInvoiceFields();
    };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<ItemData>) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(row.original._id);
      clearInvoiceFields();
    }
  };

  const table = useMaterialReactTable({
    autoResetPageIndex: false,
    columns,
    data: data ? data : [],
    initialState: { density: "compact" },
    createDisplayMode: "row", // ('modal', and 'custom' are also available)
    editDisplayMode: "row", // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    enableFullScreenToggle: false,
    enablePagination: false,
    enableRowOrdering: true,
    enableSorting: false,
    positionCreatingRow: "bottom", //index where new row is inserted before
    muiRowDragHandleProps: ({ table }) => ({
      onDragEnd: () => {
        const { draggingRow, hoveredRow } = table.getState();
        if (hoveredRow && draggingRow) {
          data?.splice(
            (hoveredRow as MRT_Row<ItemData>).index,
            0,
            data?.splice(draggingRow.index, 1)[0]
          );
          setData([...data]);
        }
      },
    }),
    muiTableContainerProps: {
      sx: {
        minHeight: "150px",
      },
    },
    onCreatingRowCancel: () => {
      setValidationErrors({});
      clearInvoiceFields();
    },
    onEditingRowCancel: () => {
      setValidationErrors({});
      clearInvoiceFields();
    },
    onCreatingRowSave: handleCreateUser,
    onEditingRowSave: handleSaveUser,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              table.setEditingRow(row);
              handleEdit(row);
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderBottomToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Add Item
      </Button>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table} />;
};

//CREATE hook (post new user to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo: ItemData) => {
      queryClient.setQueryData(
        ["users"],
        (prevUsers: ItemData[]) =>
          [
            ...prevUsers,
            {
              ...newUserInfo,
            },
          ] as ItemData[]
      );
    },
  });
}

//READ hook (get users from api)
function useGetUsers() {
  return useQuery<ItemData[]>({
    queryKey: ["users"],
    queryFn: async () => {
      //send api request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve([]);
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo: ItemData) => {
      queryClient.setQueryData(["users"], (prevUsers: ItemData[]) =>
        prevUsers?.map((prevUser: ItemData) =>
          prevUser._id === newUserInfo._id ? newUserInfo : prevUser
        )
      );
    },
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (itemId: string) => {
      queryClient.setQueryData(["users"], (prevUsers: ItemData[]) =>
        prevUsers?.filter((item: ItemData) => item._id !== itemId)
      );
    },
  });
}

interface InvoicesProps {
  dataFromInvoices: (arg: any) => void;
}

const queryClient = new QueryClient();

const ItemDescriptionTable = ({ dataFromInvoices }: InvoicesProps) => {
  const [tableData, setTableData] = useState([]);

  const dataFromTable = (data: any) => {
    setTableData(data);
  };

  useEffect(() => {
    dataFromInvoices(tableData);
  }, [dataFromInvoices, tableData]);

  return (
    <QueryClientProvider client={queryClient}>
      <Example dataFromTable={dataFromTable} />
    </QueryClientProvider>
  );
};

export default ItemDescriptionTable;

const validateRequired = (value: number) => !!value;

function validateInvoice(invoice: ItemData) {
  return {
    qty: !validateRequired(invoice.qty) ? "Qty is Required" : "",
  };
}
