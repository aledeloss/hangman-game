import React, { useState } from "react";
import Input from "../Input/Input";
import Word from "../Word/Word";
import FailedLetters from "../FailedLetters/FailedLetters";

const GameActivity = () => {
  let [input, setInput] = useState("");
  const originalWord = "amiguis";
  const splitWord = originalWord.split("").map((letter) => {
    return {
      letter: letter,
      status: "hidden",
      index: originalWord.indexOf(letter),
    };
  });

  let [word] = useState(splitWord);


  const checkLetter = (input, word) => {  
    const changeLetterStatus = el => el.status = el.letter === input ? "showed" : el.status
    word.forEach(changeLetterStatus);
  };

  const handleChange = (evt) => {
    setInput(evt.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    checkLetter(input, word);
  };

  return (
    <div className="app__activity-container">
      <Input handleInput={handleSubmit} handleChange={handleChange} input={input} />
      <Word word={word} input={input}/>
      <FailedLetters word={word} input={input} />
    </div>
  );
};

export default GameActivity;
