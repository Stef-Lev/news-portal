import { toast } from "react-toastify";

const showNotification = (
  msg: string,
  type: "info" | "error" | "warn" | "success" = "info",
  options = {}
) => {
  const notify = () =>
    toast[type](msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      theme: "light",
      ...options,
    });
  return notify();
};

export default showNotification;
