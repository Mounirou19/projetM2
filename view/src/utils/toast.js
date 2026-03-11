import { toast } from 'react-toastify';

// Configuration des toasts avec design moderne
const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
  closeButton: true,
};

export const showSuccess = (message) => {
  toast.success(message, {
    ...toastConfig,
    className: 'toast-success',
  });
};

export const showError = (message) => {
  toast.error(message, {
    ...toastConfig,
    className: 'toast-error',
  });
};

export const showWarning = (message) => {
  toast.warning(message, {
    ...toastConfig,
    className: 'toast-warning',
  });
};

export const showInfo = (message) => {
  toast.info(message, {
    ...toastConfig,
    className: 'toast-info',
  });
};
