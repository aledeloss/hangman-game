import { createRef } from "react";
import './Input.scss'

const Input = ({ handleChange, handleInput, handleKeyPress, isActive, value }) => {

  const inputRef = createRef();

    return(
        <div className={`input ${!isActive && 'input--ended'}`}>
        {isActive}
            <div className="input__label">
                Please enter a letter
            </div>
            <input type="text" ref={inputRef} placeholder={value} className="input__letter-input" maxlength="1" onChange={handleChange} onKeyPress={handleKeyPress}/>
            <button type="submit" className="submit-button search__button ml-1" onClick={handleInput}>
          Try
        </button>
        {isActive}
        </div>
    )
}
export default Input