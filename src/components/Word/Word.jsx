import React, { useEffect } from "react";
import "./Word.scss";
import Letter from "../Letter/Letter";

const Word = ({ word, input }) => {
    
  const checkLetter = (input, word) => {
      const changeLetterStatus = el => el.status = el.letter === input ? "showed" : el.status
      word.forEach(changeLetterStatus);
    };
    checkLetter(input, word);

  const wordRender = word.map((letter) => {
    return <Letter letter={letter.status === "showed" ? letter.letter : ""} />;
  });

  console.log(wordRender);

  return <div className="word-container">{wordRender}</div>;
};

export default Word;
