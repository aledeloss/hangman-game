const wordToString = (word) => word.map((letter) => letter.letter).join("")

export const GameDomain = {
    lives: 5,
    checkLetter = (input, word) => {
        const changeLetterStatus = (el) => {
            if (el.letter === input) {
                el.status = "hit";
            }
        };
        
        word.forEach(changeLetterStatus);
        
        if (word.every((letter) => letter.status === "hit")) {

        }

        if (!word.find((el) => el.letter === input)) {
            setFailedLetters([...failedLetters, input]);
            setLives(lives - 1);
            return looseGame(lives);
        }
    }
}