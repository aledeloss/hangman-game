import React from "react";
import "./Button.scss";

const Button = ({ label, handleClick }) => {

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      handleClick();
    }
  };
  return (
    <button className="button" onClick={handleClick} onKeyPress={handleKeyPress}>
      {label}
    </button>
  );
};

export default Button;
