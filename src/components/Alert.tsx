import Alert from "@mui/material/Alert";

type AlertProps = {
  severity: "success" | "info" | "warning" | "error";
  message: string;
  handleClose: () => void;
};

const closeAlertAfterDelay = (handleClose: () => void) => {
  setTimeout(() => {
    handleClose();
  }, 3000);
};

const AlertComponent = ({ severity, message, handleClose }: AlertProps) => {
  closeAlertAfterDelay(handleClose);
  return (
    <Alert
      className="w-3/4 md:w-1/3 lg:w-1/4 py-4 text-md absolute top-10 right-5 animate-slideinRight align-middle rounded-xl"
      variant="filled"
      severity={severity}
      onClose={handleClose}
    >
      {message}
    </Alert>
  );
};

export default AlertComponent;
