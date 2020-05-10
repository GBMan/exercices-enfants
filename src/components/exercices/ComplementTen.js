import React, {useState, useEffect, useRef} from 'react'

export default function ComplementTen() {
    const [answer, setAnswer] = useState(undefined)
    const [question, setQuestion] = useState("")
    const [idTimeout, setIdTimeout] = useState(null)
    const [idInterval, setIdInterval] = useState(null)
    const [message, setMessage] = useState("")
    const [error, setError] = useState(false)
    const [nbErrors, setNbErrors] = useState(0)
    const [initialTime, setInitialTime] = useState(new Date())
    const [time, setTime] = useState("00:00")
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [gameComplete, setGameComplete] = useState(false)
    const DURATION_GOOD_ANSWER = 500
    const DURATION_TIMER = 1000
    const NB_QUESTIONS = 4
    const eltAnswer = useRef(null);

    useEffect(() => {
        newGame()
        return () => {
            clearTimeout(idTimeout)
            clearInterval(idInterval)
        }
    }, [])

    useEffect(() => {
        if (!gameComplete) nextQuestion()
    }, [gameComplete])

    function getRandom_1_to_9() {
        return Math.ceil(Math.random()*9)
    }

    function handleValidate(event) {
        event.preventDefault()
        if (gameComplete) {
            newGame()
            return
        }
        const playerAnswer = Number(eltAnswer.current.value)
        if (playerAnswer === answer) {
            setMessage("Bonne réponse !")
            setError(false)
            clearTimeout(idTimeout)
            setIdTimeout(setTimeout(nextQuestion, DURATION_GOOD_ANSWER))
        }
        else {
            setMessage("Oups, il y a une erreur.")
            setError(true)
            setNbErrors((prevNbError) => {return prevNbError + 1})
        }
    }

    function newGame() {
        setInitialTime(new Date())
        setTime("00:00")
        setCurrentQuestion(0)
        setQuestion("")
        setAnswer("")
        setMessage("")
        setNbErrors(0)
        setError(false)
        setGameComplete(false)

        clearTimeout(idTimeout)
        clearInterval(idInterval)
        setIdInterval(setInterval(updateTimer, DURATION_TIMER))
    }

    function nextQuestion() {
        clearTimeout(idTimeout)
        if (gameComplete) return
        if (currentQuestion === NB_QUESTIONS) {
            clearInterval(idInterval)
            setQuestion("")
            setGameComplete(true)
            setMessage(`Bravo ! Vous avez terminé en ${time} avec ${nbErrors === 0 ? "aucune erreur" : (nbErrors === 1) ? "1 erreur" : nbErrors+" erreurs"}.`)
        }
        else {
            const number = getRandom_1_to_9()
            setCurrentQuestion((prevCurrentQuestion) => {return prevCurrentQuestion + 1})
            setQuestion(`${number} + ? = 10`)
            setAnswer(10 - number)
            setMessage("")
            if (eltAnswer && eltAnswer.current) {
                eltAnswer.current.value = ""
                eltAnswer.current.focus()
            }
        }
    }

    function updateTimer() {
        setTime(convertMillisecondsToMinutesSeconds(new Date() - initialTime))
    }

    function convertMillisecondsToMinutesSeconds(totalMilliseconds) {
        const totalSeconds = Math.floor(totalMilliseconds/1000)
        const totalMinutes = Math.floor(totalSeconds/60)
        const seconds = totalSeconds%60
        // const minutes = totalMinutes%60
        return `${totalMinutes <10 ? "0"+totalMinutes : totalMinutes }:${seconds < 10 ? "0"+seconds : seconds}`
    }

    return (
        <form className="exercice" onSubmit={(event) => {handleValidate(event)}}>
            <h2 className="exercice--title">Complément à 10</h2>
            {!gameComplete && <div className="exercice--core">
                <div className="exercice--infos">
                    <div className="exercice--progression">{currentQuestion}/{NB_QUESTIONS}</div>
                    <div className="exercice--timer">{time}</div>
                </div>
                <div className="exercice--question">{question}</div>
                <input 
                    ref={eltAnswer} 
                    type="text" 
                    id="answer" 
                    name="answer" 
                    placeholder="Réponse ?" 
                    className="exercice--input" 
                    autoComplete="off" 
                    pattern="[0-9]*" 
                    aria-labelledby="Réponse"
                    autoFocus 
                />
            </div>}
            <div className={`exercice--message ${(error) ? "error" : ""}`}>{message}</div>
            <button className="btn exercice--btn" type="submit">{gameComplete ? "Rejouer" : "Valider"}</button>
        </form>
    )
}
