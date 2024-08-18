import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams(); //In React, the useSearchParams hook is part of the react-router-dom package and is used to work with query strings in URLs. This hook allows you to read and manipulate the URL search parameters.

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  //   console.log(success, orderId);
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async (req, res, next) => {
    const response = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });
    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
