import './Input.scss'

const Input = ({ handleKeyPress }) => {

    return(
        <div className="input">
            <div className="input__label">
                Ingresá una letra
            </div>
            <input type="text" className="input__letter-input" handlekeyPress={handleKeyPress}/>
        </div>
    )
}
export default Input