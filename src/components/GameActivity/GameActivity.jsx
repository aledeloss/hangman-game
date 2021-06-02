import Input from "../Input/Input";
import Word from "../Word/Word";
import FailedLetters from "../FailedLetters/FailedLetters";

const GameActivity = () => {
    
  const handleKeyPress = (e) => {
      e.preventDefault()
  };

  return (
    <div className="app__activity-container">
      <Input handleKeyPress={handleKeyPress} />
      <Word />
      <FailedLetters />
    </div>
  );
};

export default GameActivity;
