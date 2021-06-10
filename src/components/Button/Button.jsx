import React from "react";
import "./Button.scss";

const Button = ({ label, handleClick, buttonRef }) => {

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      handleClick();
    }
  };
  return (
    <button className="button" ref={buttonRef} onClick={handleClick} onKeyPress={handleKeyPress}>
      {label}
    </button>
  );
};

export default Button;
