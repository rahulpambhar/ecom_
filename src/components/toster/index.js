import toast, { Toaster } from 'react-hot-toast';

export const successToast = (msg) => {
    toast.success(msg);
}

export const errorToast = (msg) => {
    toast.error(msg);
}