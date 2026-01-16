import toast from "react-hot-toast";

const notify = {
  success: (message) => {
    toast.success(message,{
        duration:1500
    });
  },
  error: (message) => {
    toast.error(message,{
        duration:1500
    });
  },
  loading: (message) => {
    toast.loading(message,{
        duration:1500
    });
  },
};

export default notify;
