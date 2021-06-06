import './Modal.scss';

const Modal = ({ handleClose, show, content }) => {
  const showHideClassName = show ? "modal modal--display-block" : "modal modal--display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal__main">
        {content}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;