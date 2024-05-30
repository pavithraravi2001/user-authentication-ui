import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../../auth/login";
import { MultiFactorAuthentication } from "../../auth/mfa";
import ResetPassword from "../../auth/reset-password";
import Signup from "../../auth/sign-up";
import Dashboard from "../../dashboard/dashboard";
import { Profile } from "../../profile-management/profile";
import LoggedInHeader from "./loged-in-header";
import LoggedOutHeader from "./logged-out-header";
import PaymentComponent from "../../payment/payment";
import RefundForm from "../../payment/refund";
import { toast } from "react-toastify";

const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkLoginStatus = () => {
    const isLoggedInUser = localStorage.getItem("isLoggedIn");
    const isNewUser = localStorage.getItem("newUser");

    if (isLoggedInUser || isNewUser) {
      setIsLoggedIn(true);
      console.log("Data from localStorage:", isLoggedInUser, isNewUser);
    } else {
      setIsLoggedIn(false);
      console.log("Data not found in localStorage");
    }
  };

  useEffect(() => {
    checkLoginStatus();
    const handleStorageChange = () => {
      checkLoginStatus();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    let timeOut: any;
    if (isLoggedIn) {
      timeOut = setTimeout(() => {
        toast.error("Session has expired, Please login!");
        localStorage.clear();
        navigate("/login");
      }, 2 * 60 * 1000);
    } else {
      clearTimeout(timeOut);
    }
    return () => clearTimeout(timeOut);
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    checkLoginStatus();
  }, [navigate]);

  return (
    <div>
      {isLoggedIn ? <LoggedInHeader /> : <LoggedOutHeader />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/mfa" element={<MultiFactorAuthentication />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<PaymentComponent />} />
        <Route path="/payment/refund" element={<RefundForm />} />
      </Routes>
    </div>
  );
};

export default MainPage;
