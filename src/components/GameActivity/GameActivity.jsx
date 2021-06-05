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

  let [word, setWord] = useState(splitWord);
  let [failedLetters, setFailedLetters] = useState([]);

  const checkLetter = (input, word) => {
    const changeLetterStatus = (el) => {
      if (el.letter === input) {
        let letter = (el.status = "showed");
        setWord(() => [...word]);
      }
    };
    word.forEach(changeLetterStatus);
    !word.find((el) => el.letter === input) &&
      setFailedLetters([...failedLetters, input]);
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
      <Input
        handleInput={handleSubmit}
        handleChange={handleChange}
        input={input}
      />
      <Word word={word} input={input} />
      <FailedLetters word={failedLetters} input={input} />
    </div>
  );
};

export default GameActivity;
