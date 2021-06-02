import Letter from '../Letter/Letter'
import './FailedLetters.scss'

const FailedLetters = () => {
    const letterList = ['O', 'B']

    const letterRender = letterList.map(letter => {
        return <Letter letter={letter} isFailedLetter={true}/>
    })

    return(
        <div className="failedLetters-container">
        <div className="failedLetters__title">
            Failed letters
        </div>
        <div className="failerLetters__list">
            {letterRender}
        </div>
        </div>

    )
}

export default FailedLetters