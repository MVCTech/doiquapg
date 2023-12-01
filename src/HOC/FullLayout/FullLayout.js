import React from "react";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

FullLayout.propTypes = {
  children: PropTypes.string,
};
export default function FullLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
      <ToastContainer />
    </div>
  );
}
