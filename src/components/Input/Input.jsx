import "./Input.scss";
import Button from "../Button/Button";

const Input = ({
  handleChange,
  handleInput,
  handleKeyPress,
  isActive,
  inputRef,
  input,
}) => {
  return (
    <div className={`input ${!isActive && "input--ended"}`}>
      {isActive}
      <div className="input__label">Please enter a letter</div>
      <input
        type="text"
        ref={inputRef}
        value={input}
        className="input__letter-input"
        maxlength="1"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />

      <Button
        label="Check"
        handleClick={handleInput}
      />
      {isActive}
    </div>
  );
};
export default Input;
