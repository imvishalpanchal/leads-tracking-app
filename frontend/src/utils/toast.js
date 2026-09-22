import { toast } from "react-hot-toast";

export const showToast = (message, type, options = {}) => {
    toast.dismiss();

    const defaultToastOptions = {
        position: "top-center",
        reverseOrder: false,
        pauseOnFocusLoss: false,
        draggable: false,
        pauseOnHover: false,
        theme: "light",
        duration: 3000,
    };
    const toastOptions = { ...defaultToastOptions, ...options };

    if (type === "error" && !options.duration) {
        toastOptions.duration = 5000;
    }

    switch (type) {
        case "success":
            toast.success(message, toastOptions);
            break;
        case "error":
            toast.error(message, toastOptions);
            break;
        case "info":
            toast(message, { ...toastOptions, icon: "📢" });
            break;
        case "warning":
            toast(message, { ...toastOptions, icon: "⚠️" });
            break;
        default:
            toast(message, toastOptions);
    }
};
