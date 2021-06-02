import './Word.scss'
import Letter from '../Letter/Letter'

const Word = () => {

    const word = 'Valija'
    const arrayWord = [ 'V', 'A', 'L', 'I', 'J', 'A']

    const wordRender = arrayWord.map(letter => {
        return <Letter letter={letter} />
    })

    return(
        <div className="word-container">
            { wordRender }
        </div>
    )
}

export default Word