import React from "react";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

function MainLayout({ children }) {
  return <div className="app-shell">
    <Header />
    <main className="main-content">{children}</main>
    <Footer />
  </div>;
}

export default MainLayout;
