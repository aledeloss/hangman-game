import './Hangman.scss'

const Hangman = ({lives}) => {
    return(
        <div className="hangman">
            Vidas restantes
            <div className="hangman__number">
            {lives}
            </div>
        </div>
    )
}

export default Hangman