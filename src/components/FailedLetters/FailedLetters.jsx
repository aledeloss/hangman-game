import Letter from "../Letter/Letter";
import "./FailedLetters.scss";

const FailedLetters = ({failedLetters}) => {

  const letterRender = failedLetters.map((letter) => {
      return(
    <Letter letter={letter} isFailedLetter={true} />
  )});

  return (
    <div className={`failedLetters ${!failedLetters.length && 'failedLetters--hidden'}`}>
      <div className="failedLetters__title">Failed letters:</div>
      <div className="failerLetters__list">{letterRender}</div>
    </div>
  );
};

export default FailedLetters;
