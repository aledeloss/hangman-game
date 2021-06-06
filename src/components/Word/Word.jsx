import "./Word.scss";
import Letter from "../Letter/Letter";

const Word = ({ word, input }) => {
    
  const wordRender = word.map((letter) => {
    return <Letter letter={letter.status === 'hit' | letter.status === 'showed' ? letter.letter : ""} />;
  });

  return <div className="word-container">{wordRender}</div>;
};

export default Word;
