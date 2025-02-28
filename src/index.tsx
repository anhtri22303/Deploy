import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { AppWrapper } from "./components/common/PageMeta";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthContextProvider } from "./context/AuthContext";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppWrapper>
      <ThemeProvider>
      {/* <AuthContextProvider>  </AuthContextProvider> */}
        <GoogleOAuthProvider clientId="942310409525-d8257ve8p1v4pe5s2mnn5duppdadhiaj.apps.googleusercontent.com">
        <App />
        </GoogleOAuthProvider>
      </ThemeProvider>
    </AppWrapper>
  </React.StrictMode>
);

reportWebVitals();
