import { useState, useRef, useEffect } from "react";
import "./Game.scss";

import Hangman from "../Hangman/Hangman";
import Input from "../Input/Input";
import Word from "../Word/Word";
import FailedLetters from "../FailedLetters/FailedLetters";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import setGame from "../../hooks/setGame";
import sourceTexts from "../../assets/data/sourceTexts";
// import getDefinition from "../../services/getDefinition";

const Game = () => {
  const [lives, setLives] = useState(5);
  const [input, setInput] = useState("");
  const [enteredLetters, setEnteredLetters] = useState([]);
  const [definition, setDefinition] = useState([]);
  const [modalContent, setModalContent] = useState("");
  const [showModal, setShowModal] = useState(false);

  const hideModal = () => {
    setShowModal(false);
  };

  const { splitWord, playingWord } = setGame(sourceTexts);

  const [word, setWord] = useState(splitWord);
  const [failedLetters, setFailedLetters] = useState([]);

  const isActive = lives > 0 || word.every((letter) => letter.status === "hit");

  useEffect(() => {
    const language = "en_US";
    fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/${language}/${playingWord}`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("definition:", response);
        setDefinition(() => response[0].meanings[0].definitions[0].definition);
      });
  }, [word]);

  const inputRef = useRef(null);
  const replayRef = useRef(null);

  // Input proccesing
  const checkLetter = (input, word) => {
    const changeLetterStatus = (el) => {
      if (el.letter === input) {
        el.status = "hit";
        setWord(() => [...word]);
        return winGame(input);
      }
    };
    word.forEach(changeLetterStatus);
    if (!word.find((el) => el.letter === input)) {
      setFailedLetters([...failedLetters, input]);
      setLives(lives - 1);
      if (lives <= 1) {
        looseGame(lives);
      }
    }
  };

  // Game ending
  const looseGame = () => {
    word.map((letter) => (letter.status = "showed"));
    setModalContent("No lives left, you lost :(");
    return setShowModal(true);
  };
  const winGame = () => {
    if (word.every((letter) => letter.status === "hit")) {
      setModalContent("You won, good work :)");
      return setShowModal(true);
    }
  };

  // Replay
  const handleReplayClick = () => {
    const { splitWord, playingWord } = setGame(sourceTexts);
    setWord(splitWord);
    setLives(5);
    setFailedLetters([]);
    setEnteredLetters([]);
    setInput("");
    inputRef.current.focus();
  };
  // Hint
  const handleHintClick = () => {
    setModalContent(definition);
    return setShowModal(true);
  };

  // Validations
  const isRepeated = (input) =>
    enteredLetters.find((letter) => letter === input) && true;
  const isNotLetter = (input) => !input.match(/[a-z]/i) && true;

  // Events handling
  const handleChange = (evt) => {
    setInput(evt.target.value.toUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRepeated(input)) {
      setModalContent("You have already entered that letter");
      return setShowModal(true);
    }
    setEnteredLetters(() => [...enteredLetters, input]);
    if (isNotLetter(input)) {
      setModalContent("Please enter a letter ;)");
      return setShowModal(true);
    }
    checkLetter(input, word);
    setInput("");
    inputRef.current.focus();
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && showModal === false) {
      handleSubmit(e);
    } else {
      setShowModal(false);
    }
  };
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div className="game">
      <Button
        className="seeDefinitionButton"
        label="Hint"
        handleClick={handleHintClick}
      />
      <Button
        className="replayButton"
        label="Replay"
        buttonRef={replayRef}
        handleClick={handleReplayClick}
        replay={true}
      />
      <div className="game__container">
        <Hangman lives={lives} />
        <div className="game__activity">
          <Input
            handleInput={handleSubmit}
            handleChange={handleChange}
            handleKeyPress={handleKeyPress}
            inputRef={inputRef}
            input={input}
            isActive={isActive}
          />
          <Word word={word} input={input} isActive={false} lostGame={true} />
          <FailedLetters
            failedLetters={failedLetters}
            input={input}
            lostGame={true}
          />
          {/* {definition[0].word} */}
        </div>
      </div>
      <Modal
        show={showModal}
        handleClose={hideModal}
        content={modalContent}
        handleKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default Game;
