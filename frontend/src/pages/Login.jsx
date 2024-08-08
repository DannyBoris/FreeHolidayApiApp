import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailRgx, passwordRgx } from "../utils";
import { api } from "../api";

function Login() {
  const [email, setEmail] = useState("dannyboris1993@gmail.com");
  const [password, setPassword] = useState("tpifSP1062016");

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
  const handeLogin = async () => {
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
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-between items-start w-[350px] h-[450px] absolute border border-gray-300 rounded-lg p-6 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <h1>{isLogin ? "Login" : "Signup"}</h1>
      <div className="flex flex-col w-full">
        <input
          className="border border-gray-300 rounded-md p-2 w-full"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="text-xs text-red-500">{errors.email ?? ""}</p>
      </div>
      <div className="flex flex-col w-full">
        <input
          className="border border-gray-300 rounded-md p-2 w-full"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-xs text-red-500">{errors.password ?? ""}</p>
      </div>
      <button
        className="
        self-end
        bg-blue-500
        hover:bg-blue-700
        text-white
        font-bold
        py-2
        px-4
        rounded
        mt-2
      "
        onClick={handeLogin}
      >
        {isLogin ? "Login" : "Signup"}
      </button>
      {isLogin ? (
        <div className="flex gap-2 items-center [&>*]:text-sm">
          <p>Dont have an account?</p>
          <span onClick={() => setLogin(false)}>Sign up</span>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <p>Already have an account?</p>
          <span onClick={() => setLogin(true)}>Login</span>
        </div>
      )}
    </div>
  );
}

export default Login;
