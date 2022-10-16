import React from "react";
import Header from "./Navbar";
//*  children == Page Component;
const pageBaseStyle = {};
const Layout = ({ children }) => {
  return (
    <div
      className={"app-layout-wrapper"}
      style={pageBaseStyle}
    >
      <Header />
      {children}
    </div>
  );
};
export default Layout;