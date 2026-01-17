import React, { useEffect, useState } from "react";
import { LogIn, SquareUserRound } from "lucide-react";
import EmailAndPassword from "../components/EmailAndPassword";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { useHandleSubmit } from "../utils/handleSubmit";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import notify from "../utils/notifications";

export const Login = () => {
  const [activeTab, setActiveTab] = useState("login"); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false); // 'login' or 'signup'
  const [data, setData] = useState({
    fullName: "",
    contact: "",
    email: "",
    password: "",
  });

  const { isLoggedIn, userType, loginSuccess } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && userType === "user".toLowerCase()) {
      navigate("/dashboard");
    } else if (isLoggedIn && userType === "owner".toLowerCase()) {
      navigate("/admin");
    }
  }, [isLoggedIn]);

  const handleSubmit = useHandleSubmit();

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;

      await axios.post(
        "http://localhost:5000/users/google-login",
        { token: googleToken },
        { withCredentials: true }
      );
      loginSuccess();
    } catch (err) {
      notify.error("Login Failed");
      console.log(err);
    }
  };

  return (
    <div className="h-screen w-full bg-white p-8">
      {/* main two parts */}
      <div className="h-full w-full bg-zinc-100 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-5 flex gap-3">
        {/* Logo Div */}
        <div className="absolute top-11 left-15 flex items-center gap-2">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold bg-linear-to-r from-amber-900 via-amber-800 to-amber-700 bg-clip-text text-transparent tracking-tight">
              Scatch
            </h1>
            <p className="ml-0.5 -mt-0.5 text-xs text-zinc-500 font-medium tracking-wider">
              LUXURY BAGS
            </p>
          </div>
        </div>

        {/* part 1 login form and all */}
        <div
          className={`max-h-full flex flex-col items-center w-[50%] p-5 justify-center`}
        >
          {/* login and signup button */}
          <div className="bg-zinc-200 fixed top-20 flex gap-1 px-2 py-2 rounded-lg  text-md font-medium">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex items-center gap-1 px-3 py-1 rounded-md transition-all ${
                activeTab === "login"
                  ? "bg-white text-black shadow-md"
                  : "bg-transparent text-zinc-600 hover:text-black cursor-pointer"
              }`}
            >
              <LogIn size={20} strokeWidth={2.5} />
              <p>Login</p>
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex items-center gap-1 px-3 py-1 rounded-md transition-all ${
                activeTab === "signup"
                  ? "bg-white text-black shadow-md"
                  : "bg-transparent text-zinc-600 hover:text-black cursor-pointer"
              }`}
            >
              <SquareUserRound size={20} strokeWidth={2} />
              <p>SignUp</p>
            </button>
          </div>

          {/* Welcome container */}
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-center">Welcome!</h2>
            <p className="text-zinc-600 text-center mt-2">
              Please enter your details to{" "}
              {activeTab === "login" ? "login" : "sign up"}.
            </p>
          </div>

          {/* login form */}
          <div className="mt-6 w-full max-w-md">
            {activeTab === "login" ? (
              <form
                className="space-y-4"
                onSubmit={(e) => handleSubmit(e, data, "Login")}
              >
                <EmailAndPassword
                  data={data}
                  setData={setData}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                ></EmailAndPassword>
                <Button value={"Login"}
                className="bg-black hover:bg-zinc-800 w-full active:scale-101 active:bg-black "
                ></Button>
              </form>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(e) => handleSubmit(e, data, "Sign Up")}
              >
                <InputBox
                  setData={setData}
                  data={data}
                  title="Full Name"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                ></InputBox>
                <EmailAndPassword
                  data={data}
                  setData={setData}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                ></EmailAndPassword>
                <InputBox
                  setData={setData}
                  data={data}
                  title="Contact"
                  name="contact"
                  type="number"
                  placeholder="Enter your contact number"
                ></InputBox>
                <Button value={"Sign Up"}
                className="bg-black hover:bg-zinc-800 w-full active:scale-101 active:bg-black "
                ></Button>
              </form>
            )}
            <div className="mt-5 w-full text-zinc-400 flex flex-col gap-5">
              <hr className="border-1.5"></hr>
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.log("Google Login Failed");
                }}
              />
            </div>
          </div>
        </div>

        {/* part 2 image */}
        <div className="w-[50%] h-full">
          <img
            className="h-full w-full object-cover rounded-lg"
            src="https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-keepall-50--M26131_PM1_Worn%20view.png?wid=1090&hei=1090"
          ></img>
        </div>
      </div>
    </div>
  );
};
