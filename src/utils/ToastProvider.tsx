// src/components/ToastProvider.tsx
import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      containerStyle={{
        top: "80px", // adjust based on your navbar height
      }}
    />
  );
};

export default ToastProvider;
