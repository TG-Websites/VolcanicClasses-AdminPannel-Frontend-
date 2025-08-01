import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { Provider } from "react-redux";
import {store }from "./redux/store";
import {Toaster} from 'react-hot-toast'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <AppWrapper>
      <Provider store={store}>
        <App />
        <Toaster/>
      </Provider>
    </AppWrapper>
  </ThemeProvider>
);

