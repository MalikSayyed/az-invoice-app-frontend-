import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Breakpoint, Button, DialogActions, useTheme } from "@mui/material";

interface CustomDialogProps {
  children: React.ReactNode;
  handleClose: () => void;
  handleSave?: () => void;
  handleDelete?: () => void;
  open: boolean;
  buttonAction?: string;
  modalTitle: string;
  modalSize?: Breakpoint;
  areFieldsFilled?: boolean;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  children,
  handleClose,
  open,
  modalTitle,
  modalSize,
  buttonAction,
  handleDelete,
  handleSave,
  areFieldsFilled,
}) => {
  const handleAction = async () => {
    if (buttonAction === "Save") {
      handleSave && handleSave();
      handleClose();
    } else if (buttonAction === "Delete") {
      handleDelete && handleDelete();
      handleClose();
    }
  };

  const theme = useTheme();

  return (
    <>
      <Dialog
        maxWidth={modalSize}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            borderTop: `4px solid #44814e `,
          }}
          id="customized-dialog-title"
        >
          <Typography mr={2}>{modalTitle}</Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>{children}</DialogContent>

        <DialogActions>
          {buttonAction === "Save" && (
            <Button
              autoFocus
              disabled={areFieldsFilled ? false : true}
              onClick={handleAction}
              size="small"
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": { backgroundColor: theme.palette.primary.dark },
              }}
            >
              {buttonAction}
            </Button>
          )}
          {buttonAction === "Delete" && (
            <Button
              autoFocus
              onClick={handleAction}
              size="small"
              variant="contained"
              sx={{
                backgroundColor: "red",
                color: "white",
                "&:hover": { backgroundColor: "red" },
              }}
            >
              {buttonAction}
            </Button>
          )}
          <Button
            autoFocus
            onClick={handleClose}
            size="small"
            variant="contained"
            sx={{
              backgroundColor: "#f4fcf6",
              color: "#44814e",
              "&:hover": { backgroundColor: "#d4fdf9" },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default CustomDialog;
