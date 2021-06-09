// import { useState } from 'react';

const setGame = (sourceText, lives) => {
    // Pick a word
    const allWordsArray = sourceText.split(' ');
    const onlyWordsArray = allWordsArray.filter(word => word.match(/^[a-z]+$/));
    const longWordsArray = onlyWordsArray.filter(word => word.length > 4);
    const randomIndex = Math.floor(Math.random() * longWordsArray.length);
    const playingWord = longWordsArray[randomIndex]
    console.log(`The word is ${playingWord}`);

  // Split word building
  const splitWord = playingWord.toUpperCase().split('').map((letter) => {
    return {
      letter: letter,
      status: 'hidden',
      index: playingWord.indexOf(letter),
    };
  });
    return splitWord;
}

export default setGame;