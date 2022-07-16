import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import Layout from "./components/Layout";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import "./index.css";
import CheckEmailPage from "./pages/CheckEmailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import UserProfilePage from "./pages/UserProfilePage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer
        style={{ width: "max-content" }}
        hideProgressBar={true}
        autoClose={2000}
        position="top-center"
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<App />} />
              <Route path="/user-profile" element={<UserProfilePage />} />
            </Route>
          </Route>

          {/* Public Routes */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/check-email" element={<CheckEmailPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
