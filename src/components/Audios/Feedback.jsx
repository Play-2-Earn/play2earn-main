import React from "react";

const Feedback = ({ message, isError }) => {
  return <div className={`feedback ${isError ? "error" : ""}`}>{message}</div>;
};

export default Feedback;
