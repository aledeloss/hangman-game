import "./Letter.scss";

const Letter = ({ letter, isFailedLetter = false }) => {

  return (
    <div className={`letter ${isFailedLetter && 'letter__content--failed-letter' }`}>
      <div className="letter__content">{letter}</div>
    </div>
  );
};

export default Letter;
