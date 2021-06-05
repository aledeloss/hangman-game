import "./Word.scss";
import Letter from "../Letter/Letter";

const Word = ({ word, input }) => {
    
  const wordRender = word.map((letter) => {
    return <Letter letter={letter.status === "showed" ? letter.letter : ""} />;
  });

  console.log(wordRender);

  return <div className="word-container">{wordRender}</div>;
};

export default Word;
