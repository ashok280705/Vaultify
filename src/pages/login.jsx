import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isRegister, setisRegister] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors ,isSubmitting},
  } = useForm();

  const delay = (d) => new Promise((resolve) => setTimeout(resolve, d * 1000));

  const onSubmit = async (data) => {
    await delay(2);

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (isRegister) {
      const userExists = existingUsers.some(
        (user) => user.username === data.username
      );
      if (userExists) {
        alert("Username already exists!");
        return;
      }

      const newUser = {
        username: data.username,
        password: data.password,
      };
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      localStorage.setItem("currentUser", data.username); // ✅ Save logged-in user
      alert("Registered successfully!");
      await delay(2);
      navigate("/app");
    } else {
      const matchedUser = existingUsers.find(
        (user) =>
          user.username === data.username && user.password === data.password
      );

      if (matchedUser) {
        localStorage.setItem("currentUser", data.username); // ✅ Save logged-in user
        alert("Login successful");
        await delay(1);
        navigate("/app");
      } else {
        alert("Invalid username or password");
      }
    }
  };

  return (
    <>
     {isSubmitting && (<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
  <div className="flex flex-col items-center gap-2">
    <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    <h1 className="text-green-800 font-semibold">Loading...</h1>
  </div>
</div>)}
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(132,238,174,0.5)_100%)]"></div>

      {/* Center container */}
      <div className="w-screen h-screen flex items-center justify-center bg-transparent">
        {/* Glassmorphic card */}
        <div className="w-[80%] sm:w-[33vw] h-[70vh] border border-green-200 rounded-2xl bg-white bg-opacity-40 backdrop-blur-md shadow-2xl p-6 flex flex-col justify-between">
          {/* Logo/Header */}
          <div className="h-[15%] w-full flex justify-center items-center animate-bounce ">
            <div className="text-3xl font-bold text-black">
              <span className="text-green-600">&lt;</span>
              <span>VAULTI</span>
              <span className="text-green-700">FY</span>
              <span className="text-green-600">/&gt;</span>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center my-3">
            <div className="flex-grow h-px bg-gradient-to-r from-green-400 via-green-200 to-green-400"></div>
            <span className="mx-3 text-green-700 font-semibold text-sm tracking-wider">
              {isRegister ? "REGISTER" : "LOGIN"} TO CONTINUE
            </span>
            <div className="flex-grow h-px bg-gradient-to-l from-green-400 via-green-200 to-green-400"></div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 flex flex-col justify-center items-center gap-4 text-black"
          >
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: true })}
              className="w-[80%] px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white bg-opacity-60"
            />
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true , minLength: { value: 8, message: "Password must be at least 8 characters" },})}
              className="w-[80%] px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white bg-opacity-60"
            />
            <button
           
            disabled={isSubmitting}
              type="submit"
              className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
            >
              {isRegister ? "Register" : "Login"}
            </button>
          </form>

          {/* Toggle link */}
          <div className="text-center text-sm text-gray-600">
            {isRegister ? "Already" : "Don't"} have an account?{" "}
            <span
              className="text-green-700 cursor-pointer hover:underline"
              onClick={() => setisRegister(!isRegister)}
            >
              {isRegister ? "Login" : "Register"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;