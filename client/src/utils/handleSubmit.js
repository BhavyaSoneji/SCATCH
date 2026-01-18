import { Navigate, useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import notify from "./notifications";

export const useHandleSubmit = () => {
  const { loginSuccess, logoutSuccess, userType } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e, data, value) => {
    e.preventDefault();
    if (value.toLowerCase() == "Login".toLowerCase()) {
      axios
        .post("http://localhost:5000/users/login", data, {
          withCredentials: true,
        })
        .then(async (resp) => {
          if (resp.data.status) {
            await loginSuccess();
            if (userType === "user".toLowerCase()) {
              notify.success(resp.data.message);
              navigate("/dashboard");
            } else if (userType === "owner".toLowerCase()) {
              notify.success(resp.data.message);
              navigate("/admin");
            }
          } else {
            notify.error(resp.data.message);
            navigate("/");
          }
        })
        .catch((err) => {
          notify.error("Invalid Credantials");
          console.log(err.response?.data?.message || err.response?.data || err);
          navigate("/");
        });
    } else if (value.toLowerCase() == "Sign Up".toLowerCase()) {
      axios
        .post("http://localhost:5000/users/register", data, {
          withCredentials: true,
        })
        .then(async (resp) => {
          if (resp.data.status) {
            console.log(resp.data.message);
            await loginSuccess();
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          console.log(err.response?.data?.message || "Sign Up Failed..");
        });
    } else if (value.toLowerCase() == "Create Product".toLowerCase()) {
      axios
        .post("http://localhost:5000/products/create", data, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          if (resp.data.status) {
            notify.success("Product Created Successfully");
            console.log(resp?.data?.message || "Product Created Sccessfully..");
            return true;
          } else {
            notify.error("Error Creating Product");
            console.log(resp?.data?.message || "Error Creating Product..");
            return false;
          }
        })
        .catch((err) => {
          notify.error("Product Creation Failed");
          console.log(
            err.response?.data?.message || "Product Creation Failed.."
          );
          return false;
        });
    } else if (value.toLowerCase() == "Logout".toLowerCase()) {
      axios
        .get("http://localhost:5000/users/logout", {
          withCredentials: true,
        })
        .then(async (resp) => {
          if (resp.data.status) {
            console.log(resp.data?.message || resp);
            await logoutSuccess();
            navigate("/");
          } else {
            console.log("Logout Failed");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return handleSubmit;
};
