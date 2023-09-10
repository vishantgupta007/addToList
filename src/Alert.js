import React, { useEffect } from "react";

const Alert = ({ type, msg, removeItem, list }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => removeItem(), 3000);
    return () => clearTimeout(timeOut);
  }, [list]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
