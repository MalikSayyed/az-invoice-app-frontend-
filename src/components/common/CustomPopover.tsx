import Popover from "@mui/material/Popover";

interface CustomPopoverProps {
  children: React.ReactNode;
  anchorEl: HTMLButtonElement | HTMLDivElement | null;
  handleClose: () => void;
  popoverId: string;
}

const CustomPopover: React.FC<CustomPopoverProps> = ({
  children,
  anchorEl,
  handleClose,
  popoverId,
}) => {
  const open = Boolean(anchorEl);
  const id = open ? popoverId : undefined;

  return (
    <div>
      <Popover
        sx={{ marginY: 1 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {children}
      </Popover>
    </div>
  );
};

export default CustomPopover;
