import React from "react";
import "./Button.scss";

const Button = ({ label, handleClick, buttonRef, replay = false }) => {

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      handleClick();
    }
  };
  return (
    <button className={`button ${replay && 'replay'}`} ref={buttonRef} onClick={handleClick} onKeyPress={handleKeyPress}>
      {label}
    </button>
  );
};

export default Button;
