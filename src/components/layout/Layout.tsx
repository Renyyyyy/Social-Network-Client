import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import Sidebar from "../forms/sidebar/Sidebar";

const Layout: React.FC = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="content-area">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
