import React, { useState, useContext,useRef,useEffect } from "react";
import Usercontext from "../context/context";
import Table from "./table";
const Content = () => {
  const { currmanager, setcurrmanager } = useContext(Usercontext);
  const [data, setdata] = useState({
    site: "",
    username: "",
    password: "",
  });
  const [passwordType, setPasswordType] = useState("password");

const handleToggle = () => {
  setPasswordType((prev) => (prev === "password" ? "text" : "password"));
};
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const existingData = JSON.parse(localStorage.getItem("vault-data")) || {};
      setcurrmanager(existingData[currentUser] || []);
    }
  }, []);

  const Handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const HandleClick = () => {
    if (!data.site || !data.username || !data.password) {
      alert("All fields are required!");
      return;
    }
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      alert("No user logged in");
      return;
    }
    const newEntry = {
      site: data.site,
      username: data.username,
      password: data.password,
    };
    const existingData = JSON.parse(localStorage.getItem("vault-data")) || {};

    const updatedUserData = existingData[currentUser]
      ? [...existingData[currentUser], newEntry]
      : [newEntry];

    const updatedVault = {
      ...existingData,
      [currentUser]: updatedUserData,
    };

    localStorage.setItem("vault-data", JSON.stringify(updatedVault));

    if (currentUser && updatedVault[currentUser]) {
      setcurrmanager(updatedVault[currentUser]); // ✅ Only
      // current user's data
      console.log(updatedVault[currentUser]);
    } else {
      setcurrmanager([]); // No data found
    }
    setdata({
      site: "",
    username: "",
    password: "",
    })
  };

  return (
    <>
      {/* Background Layer */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-300 opacity-20 blur-[100px]"></div>
      </div>

      {/* Foreground Container */}
      <div className="container max-w-4xl m-auto my-4 h-[80vh]  rounded-xl shadow-lg p-6 ">
        <div className="flex items-center justify-center ">
          <div className="text-3xl font-bold text-black px-5">
            <span className="text-green-600">&lt;</span>
            <span className="text-black">VAULTI</span>
            <span className="text-green-600">FY</span>
            <span className="text-green-600">/&gt;</span>
          </div>
        </div>
        <div className="flex items-center justify-center p-2">
          <h1 className="text-2l font-light text-green-900">
            Your own password manager
          </h1>
        </div>
        <div>
          <input
            name="site"
            value={data.site}
            onChange={Handlechange}
            type="text"
            placeholder="Enter your URL"
            className="w-full rounded-2xl p-2 border-1 border-green-500 "
          />
          <div className="flex items-center justify-between ">
            <input
              name="username"
              value={data.username}
              onChange={Handlechange}
              type="text"
              placeholder="Enter Username "
              className="w-[70%] p-2 m-2 border-1 border-green-500 rounded-2xl"
            />
            <div className="w-[20%] m-2 relative">
              <input
                name="password"
                value={data.password}
                onChange={Handlechange}
                type={passwordType}
                placeholder="Enter password"
                className="w-full p-2 pr-10 border-1 border-green-500 rounded-2xl"
              />
              <button className="absolute right-4 top-6 -translate-y-1/2 cursor-pointer" onClick={handleToggle}>
                <lord-icon
                  src="https://cdn.lordicon.com/dicvhxpz.json"
                  trigger="hover"
                  stroke="bold"
                  colors="primary:#121331,secondary:#000000"
                  style={{ width: "20px", height: "25px" }}
                ></lord-icon>
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center p-4">
            <button
              className="flex items-center gap-3 bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-semibold text-lg tracking-wide cursor-pointer"
              onClick={() => {
                HandleClick();
              }}
            >
              <span>Add Password</span>
              <lord-icon
                src="https://cdn.lordicon.com/sbnjyzil.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#ffffff,secondary:#ffffff"
                style={{ width: "28px", height: "28px" }}
              ></lord-icon>
            </button>
          </div>
          <div className="max-h-[250px] overflow-y-auto mt-4 rounded-lg border border-green-200 shadow-inner">
            <Table />
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
