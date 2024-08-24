import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailRgx, passwordRgx } from "../utils";
import { api } from "../api";
import GithubIcon from "../assets/github.svg";
import FacebookIcon from "../assets/facebook.svg";
import GoogleIcon from "../assets/google.svg";
import { UserContext } from "../App";
import ShowPasswordIcon from "../assets/show-password.svg";
import HidePasswordIcon from "../assets/hide-password.svg";
import { toast } from "react-toastify";

function Login() {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (Object.values(errors).some(Boolean)) {
      setTimeout(() => {
        console.log("clearing errors");
        setErrors({ email: "", password: "" });
      }, 1000);
    }
  }, [errors]);

  const queryParams = new URLSearchParams(window.location.search);
  const [isLogin, setLogin] = useState(queryParams.get("signup") !== "true");
  const navigate = useNavigate();
  const handeLogin = async (e) => {
    e.preventDefault();
    try {
      if (!emailRgx.test(email)) {
        setErrors({ ...errors, email: "Invalid email" });
        return;
      }

      if (!passwordRgx.test(password)) {
        setErrors({ ...errors, password: "Invalid password" });
        return;
      }

      const endpoint = isLogin ? "login" : "register";
      const newUser = await api.post(`/api/v1/auth/${endpoint}`, {
        email,
        password,
      });
      console.log("User signed up", newUser);
      setUser(newUser);
      if (newUser) {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-between items-start w-[450px] h-[600px] absolute border border-gray-300 rounded-lg p-6 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <h1>{isLogin ? "Login" : "Signup"}</h1>
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col w-full">
          <label className="font-bold mb-1" htmlFor="">
            Email
          </label>
          <input
            className="border border-gray-300 rounded-md p-3 w-full"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-xs text-red-500">{errors.email ?? ""}</p>
        </div>
        <div className="flex flex-col w-full">
          <label className="font-bold mb-1" htmlFor="">
            Password
          </label>
          <div className="relative">
            <input
              className="border border-gray-300 rounded-md p-3 w-full"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              onClick={() => setPasswordVisible((prev) => !prev)}
              className="absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1/2 cursor-pointer opacity-70"
              width={20}
              src={isPasswordVisible ? HidePasswordIcon : ShowPasswordIcon}
            />
          </div>
          <p className="text-xs text-red-500">{errors.password ?? ""}</p>
        </div>
      </div>
      <button className="btn-primary btn-lg w-full" onClick={handeLogin}>
        {isLogin ? "Login" : "Signup"}
      </button>
      <flex className="flex w-full items-center justify-end cursor-poiner">
        {/* <span className="underline self-end">Forgot password?</span> */}
      </flex>
      {/* or */}
      <div className="flex items-center justify-center w-full">
        <hr className="w-full border-gray-300" />
        <p className="text-gray-500 mx-2">OR</p>
        <hr className="w-full border-gray-300" />
      </div>
      <div className="flex items-center justify-between w-full flex-wrap">
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${"Iv23ct0odBTkSq3IO2yN"}`}
        >
          <button className="flex items-center border border-gray-200 p-3 rounded-lg mx-auto px-10 disabled:opacity-40">
            <img width={30} src={GithubIcon} alt="" />
          </button>
        </a>

        <a>
          <button
            disabled
            className="flex items-center border border-gray-200 p-3 rounded-lg mx-auto px-10 disabled:opacity-40"
          >
            <img width={30} src={GoogleIcon} alt="" />
          </button>
        </a>
        <a href="#">
          <button
            disabled
            className="flex items-center border border-gray-200 p-3 rounded-lg mx-auto px-10 disabled:opacity-40"
          >
            <img width={30} src={FacebookIcon} alt="" />
          </button>
        </a>
      </div>
      <div className="flex gap-2 items-center [&>*]:text-sm">
        <p>{isLogin ? "Dont have an account?" : "Already have an account?"}</p>
        <span
          className="cursor-pointer underline hover:opacity-50 transition-opacity"
          onClick={() => setLogin((prev) => !prev)}
        >
          {isLogin ? "Sign up" : "Log in"}
        </span>
      </div>
    </div>
  );
}

export default Login;
