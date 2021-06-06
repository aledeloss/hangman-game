import { useState } from 'react';
import './Game.scss';

import Hangman from '../Hangman/Hangman';
import Input from '../Input/Input';
import Word from '../Word/Word';
import FailedLetters from '../FailedLetters/FailedLetters';
import Modal from '../Modal/Modal';

const Game = () => {
  const [lives, setLives] = useState(2);
  const [isActive, setIsActive] = useState(true);
  const [input, setInput] = useState('');
  const [enteredLetters, setEnteredLetters] = useState([]);

  // Modal
  const [modalContent, setModalContent] = useState('');
  const [show, setShow] = useState(false);
  const showModal = () => {
    setShow(true);
  };
  const hideModal = () => {
    setShow(false);
  };

  // Word building
  const originalWord = 'calamar';
  const splitWord = originalWord.split('').map((letter) => {
    return {
      letter: letter,
      status: 'hidden',
      index: originalWord.indexOf(letter),
    };
  });

  let [word, setWord] = useState(splitWord);
  let [failedLetters, setFailedLetters] = useState([]);

  // Input proccesing
  const checkLetter = (input, word) => {
    const changeLetterStatus = (el) => {
      if (el.letter === input) {
        el.status = 'hit';
        setWord(() => [...word]);
      }
    };
    word.forEach(changeLetterStatus);
    if (!word.find((el) => el.letter === input)) {
      setFailedLetters([...failedLetters, input]);
      setLives(lives - 1);
    return endGame(lives);
    }
    console.log(input)
  };

  // Lives checking
  const endGame = () => {
    if(lives <= 1){
      setIsActive(false)
      word.map(letter => letter.status = 'showed')
      setModalContent('No lives left, you lost');
      setShow(true);
    }
    console.log(lives)
  };
  // Validatations
  const isRepeated = (input) =>
    enteredLetters.find((letter) => letter === input) && true;
  const isNotLetter = (input) => !input.match(/[a-z]/i) && true;

  // Events handling
  const handleChange = (evt) => {
    setInput(evt.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRepeated(input)) {
      setModalContent('You have already entered that letter');
      return showModal();
    }
    setEnteredLetters(() => [...enteredLetters, input]);
    console.log('enteredLetters', enteredLetters);
    if (isNotLetter(input)) {
      setModalContent('Please enter a letter ;)');
      return showModal();
    }
    checkLetter(input, word);
    console.log(isActive);
  };
  console.log('ahora sí isActive', endGame);

  return (
    <div className="game">
      <Hangman lives={lives} />
      <Input
        handleInput={handleSubmit}
        handleChange={handleChange}
        input={input}
        isActive={isActive}
      />
      <Word word={word} input={input} isActive={false} lostGame={true} />
      <FailedLetters word={failedLetters} input={input} lostGame={true} />
      <Modal show={show} handleClose={hideModal} content={modalContent} />
    </div>
  );
};

export default Game;
