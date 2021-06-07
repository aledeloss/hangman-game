import { useState } from 'react';
import './Game.scss';

import Hangman from '../Hangman/Hangman';
import Input from '../Input/Input';
import Word from '../Word/Word';
import FailedLetters from '../FailedLetters/FailedLetters';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

const Game = () => {
  const [lives, setLives] = useState(5);
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
  const originalWord = 'vacunatorio';
  const splitWord = originalWord.toUpperCase().split('').map((letter) => {
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
        return winGame(input);
      }
    };
    word.forEach(changeLetterStatus);
    if (!word.find((el) => el.letter === input)) {
      setFailedLetters([...failedLetters, input]);
      setLives(lives - 1);
    return looseGame(lives);
    }
    console.log(input)
  };

  // Game ending
  const looseGame = () => {
    if(lives <= 1){
      setIsActive(false)
      word.map(letter => letter.status = 'showed')
      setModalContent('No lives left, you lost');
      return setShow(true);
    }
    console.log(lives)
  };
  const winGame = () => {
    if(word.every(letter => letter.status === 'hit')){
      setIsActive(false)
      setModalContent('You won, good work :)');
      return setShow(true);
    }
    console.log(lives)
  };

  // Replay
  const handleReplayClick = () => {
    alert('Replay!');
  }
  
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
  console.log('ahora sí isActive', looseGame);

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
      <Button label='Replay' handleClick={handleReplayClick} />
      <Modal show={show} handleClose={hideModal} content={modalContent} />
    </div>
  );
};

export default Game;
