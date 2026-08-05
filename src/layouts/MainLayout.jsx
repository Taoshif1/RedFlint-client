import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar></Navbar>

      <main>
        <Outlet></Outlet>
      </main>

      <Footer></Footer>
    </>
  );
};

export default MainLayout;
