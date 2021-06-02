import "./Letter.scss";

const Letter = ({ letter, isFailedLetter = false }) => {

  return (
    <div className={`letter-container ${isFailedLetter && 'failed-letter' }`}>
      <div className="letter-content">{letter}</div>
    </div>
  );
};

export default Letter;
