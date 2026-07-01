import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
