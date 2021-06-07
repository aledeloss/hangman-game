import './Hangman.scss'

const Hangman = ({lives}) => {
    return(
        <div className="hangman">
            You have
            <div className="hangman__number">
            {lives}
            </div>
            lives left
        </div>
    )
}

export default Hangman