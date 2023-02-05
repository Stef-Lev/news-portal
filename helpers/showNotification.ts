import { toast } from "react-toastify";

const showNotification = (msg, options = {}) => {
  const notify = () => toast(msg, { position: "bottom-right", ...options });
  return notify();
};

export default showNotification;
