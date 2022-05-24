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
import getDefinition from "../../services/getDefinition";
import { GameDomain } from "../../domain/game";
import { getHint } from "../../data/hint";

const useModal = (initialShow) => {
  const [show, setShow] = useState(initialShow);
  const showModal = () => {
    setShow(true);
  };
  const hideModal = () => {
    setShow(false);
  };

  return { show, showModal, hideModal }
}

const useHint = (word) => {
  const [hint, setHint] = useState("")
  
  useEffect(() => {
    getHint(word).then((hint) => {
      setHint(hint)
    })
  }, [word])

  return hint
}

const Game = () => {
  const [lives, setLives] = useState(GameDomain.lives);
  const [isActive, setIsActive] = useState(true);
  const [input, setInput] = useState("");
  const [enteredLetters, setEnteredLetters] = useState([]);

  // Modal
  const [modalContent, setModalContent] = useState("");
  const { show, showModal, hideModal } = useModal(false)

  const { splitWord, playingWord } = setGame(sourceTexts);
  console.log("PLAYING WORD IS", playingWord);
  let [word, setWord] = useState(splitWord);
  let [failedLetters, setFailedLetters] = useState([]);

  const definition = useHint(playingWord)

  const inputRef = useRef(null);
  const replayRef = useRef(null);

  const looseGame = () => {
    if (lives <= 1) {
        setIsActive(false);
        word.map((letter) => (letter.status = "showed"));
        setModalContent("No lives left, you lost :(");
        setShow(true);
    }
  }

    const winGame = () => {
      setIsActive(false);
      setModalContent("You won, good work :)");
      setShow(true);
    }

  // Replay
  const handleReplayClick = () => {
    setIsActive(true);
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
    return showModal();
  };

  // Validatations
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
      return showModal();
    }
    setEnteredLetters(() => [...enteredLetters, input]);
    if (isNotLetter(input)) {
      setModalContent("Please enter a letter ;)");
      return showModal();
    }

    const hasWon = GameDomain.checkLetter(input, word);
    if (hasWon) {
      winGame()
    } else {
      looseGame()
    }

    setInput("");
    inputRef.current.focus();
    console.log(isActive);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && show === false) {
      handleSubmit(e);
    } else {
      setShow(false);
    }
  };
  useEffect(() => {
    inputRef.current.focus();
  });

  // const language = "en_US";

  // useEffect(() => {
  //   fetch(
  //     `https://api.dictionaryapi.dev/api/v2/entries/${language}/${playingWord}`,
  //     {
  //       method: "GET",
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then(response => {
  //       const {data = []} = response})
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // },[]);

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
      <Modal show={show} handleClose={hideModal} content={modalContent} />
    </div>
  );
};

export default Game;
