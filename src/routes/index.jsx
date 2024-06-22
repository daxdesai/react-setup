import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DefaultLayout from "../layouts";

const AppRoutes = () => {
  return (
    <>
      <ToastContainer position="bottom-right" theme="colored" />
      <Routes>
        <Route path="/" element={<DefaultLayout />}></Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
