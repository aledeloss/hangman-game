import Letter from "../Letter/Letter";
import "./FailedLetters.scss";

const FailedLetters = (word, input) => {
  const letterList = ["O", "B"];
  const checkLetter = (input, word) => {
    const changeLetterStatus = (el) =>
      (el.status = el.letter === input ? "showed" : el.status);
    word.forEach(changeLetterStatus);
  };
  checkLetter(input, word);

  const letterRender = word.map((letter) => {
      return(
    letter.status === "hidden" && <Letter letter={letter.letter} />
  )});

  // const letterRender = letterList.map(letter => {
  //     return <Letter letter={letter} isFailedLetter={true}/>
  // })

  return (
    <div className="failedLetters-container">
      <div className="failedLetters__title">Failed letters</div>
      <div className="failerLetters__list">{letterRender}</div>
    </div>
  );
};

export default FailedLetters;
