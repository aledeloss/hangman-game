import './Modal.scss';
import Button from '../Button/Button';

const Modal = ({ handleClose, show, content, handleKeyPress }) => {
  const showHideClassName = show ? "modal modal--display-block" : "modal modal--display-none";

  return (
    <div className={showHideClassName} 
    onKeyPress={handleKeyPress}>
      <section className="modal__main">
        <div className="modal__content">
        {content}
        </div>
        <Button label='Close' handleClick={handleClose} />
      </section>
    </div>
  );
};

export default Modal;