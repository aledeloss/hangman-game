import './Input.scss'

const Input = ({ handleChange, handleInput }) => {

    return(
        <div className="input">
            <div className="input__label">
                Ingresá una letra
            </div>
            <input type="text" className="input__letter-input" onChange={handleChange}/>
            <button type="submit" className="submit-button search__button ml-1" onClick={handleInput}>
          Probar
        </button>
        </div>
    )
}
export default Input