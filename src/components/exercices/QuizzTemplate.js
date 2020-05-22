import React, {useState, useEffect, useRef} from 'react'
import { convertMillisecondsToMinutesSeconds } from '../../utils/misc'
import Timer from '../../utils/Timer'
import anime from 'animejs/lib/anime.es.js'

export default function QuizzTemplate(props) {
    const {
        title,
        localStorageKey,
        getQuestion,
        getBilan,
        nbQuestions,
        rules
    } = props

    const STEP_INTRO = "intro"
    const STEP_GAME = "game"
    const STEP_BILAN = "bilan"
    const DURATION_GOOD_ANSWER = 500
    const DURATION_TIMER = 1000
    const [answer, setAnswer] = useState(undefined)
    const [question, setQuestion] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState(false)
    const [nbErrors, setNbErrors] = useState(0)
    const [time, setTime] = useState("00:00")
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [currentStep, setCurrentStep] = useState(STEP_INTRO)
    const [gamePaused, setGamePaused] = useState(false)
    const [lastKeyCode, setLastKeyCode] = useState(null)
    const eltAnswer = useRef(null)
    const eltForm = useRef(null)
    const idTimeout = useRef(null)
    const idInterval = useRef(null)
    const highScore = useRef(null)
    const timer = useRef(new Timer())
    const animationRef = useRef(null);

    useEffect(() => {
        const recipesJSON = localStorage.getItem(localStorageKey)
        if (recipesJSON !== null) {
            highScore.current = JSON.parse(recipesJSON)
        }
        document.addEventListener('keyup', handleKeyUp);

        
    // animationRef.current = anime({
    //     targets: ".exercice",
    //     translateX: 250,
    //     delay: function(el, i) {
    //       return i * 100;
    //     },
    //     loop: true,
    //     direction: "alternate",
    //     easing: "easeInOutSine"
    //   });
        return () => {
            clearTimeout(idTimeout.current)
            clearInterval(idInterval.current)
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, [])

    useEffect(() => {
        if (currentStep === STEP_GAME)
            nextQuestion()
    }, [currentStep])

    useEffect(() => {
        switch (true) {
            case lastKeyCode === "Enter":
                handleValidate()
                setLastKeyCode(null)
                break
            default:
                break
        }
    }, [lastKeyCode])

    function handleKeyUp(event) {
        setLastKeyCode(event.code)
    }

    function handleValidate(event) {
        if (event) event.preventDefault()
        switch (true) {
            case currentStep === STEP_INTRO:
                initGame()
                break;
            case currentStep === STEP_GAME:
                if (gamePaused) return
                const playerAnswer = Number(eltAnswer.current.value)
                if (playerAnswer === answer) {
                    setMessage("Bonne réponse !")
                    setError(false)
                    clearTimeout(idTimeout.current)
                    idTimeout.current = setTimeout(nextQuestion, DURATION_GOOD_ANSWER)
                }
                else {
                    anime({
                        targets: '.exercice',
                        translateX: [
                            {value:-10, duration:50, easing: 'easeInOutExpo'},
                            {value:10, duration:100, easing: 'easeInOutExpo'},
                            {value:-10, duration:100, easing: 'easeInOutExpo'},
                            {value:10, duration:100, easing: 'easeInOutExpo'},
                            {value:0, duration:50, easing: 'easeInOutExpo'}
                        ]
                    })
                    if (playerAnswer === "") {
                        setMessage("Oups ! Mets une réponse avant de valider.")
                        setError(true)
                    }
                    else {
                        setMessage("Oups ! Il y a une erreur.")
                        eltAnswer.current.select()
                        setError(true)
                        setNbErrors((prevNbError) => {return prevNbError + 1})
                    }
                }
                break;
            case currentStep === STEP_BILAN:
                initGame()
                setCurrentStep(STEP_GAME)
                break;
            default:
                break;
        }
    }

    function newGame() {
        setCurrentStep(STEP_INTRO)
    }

    function initGame() {
        timer.current = new Timer(true)
        setTime("00:00")
        setCurrentQuestion(0)
        setCurrentStep(STEP_GAME)
        setQuestion("")
        setAnswer("")
        setMessage("")
        setNbErrors(0)
        setError(false)
        // setGameCompleted(false)

        clearTimeout(idTimeout.current)
        clearInterval(idInterval.current)
        updateTimer()
        idInterval.current = setInterval(() => {updateTimer()}, DURATION_TIMER)
    }

    function togglePause() {
        timer.current.togglePauseResumeChrono()
        clearInterval(idInterval.current)
        if (gamePaused) {
            updateTimer()
            idInterval.current = setInterval(updateTimer, DURATION_TIMER)
        }
        setGamePaused((prevGamePaused) => {return !prevGamePaused})
    }

    function nextQuestion() {
        clearTimeout(idTimeout.current)
        if (currentQuestion === nbQuestions) {
            clearInterval(idInterval.current)
            setQuestion("")
            setCurrentStep(STEP_BILAN)
            timer.current.pauseChrono()

            let newHighScore = {timer:timer.current.getMilliseconds(), nbErrors:nbErrors}
            if (highScore && highScore.current) {
                if (highScore.current.timer < newHighScore.timer) {
                    newHighScore = highScore.current
                }
            }
            highScore.current = newHighScore
            localStorage.setItem(localStorageKey, JSON.stringify(highScore.current))

            setMessage(getBilan(timer.current.getMilliseconds(), nbErrors, highScore.current.timer))
        }
        else {
            setCurrentQuestion((prevCurrentQuestion) => {return prevCurrentQuestion + 1})
            const newQuestion = getQuestion()
            setQuestion(newQuestion.question)
            setAnswer(newQuestion.answer)
            setMessage("")
            if (eltAnswer && eltAnswer.current) {
                eltAnswer.current.value = ""
                eltAnswer.current.focus()
            }
        }
    }

    function updateTimer() {
        setTime(convertMillisecondsToMinutesSeconds(timer.current.getMilliseconds()))
    }

    return (
        <form className="exercice" ref={eltForm} onSubmit={(event) => {handleValidate(event)}}>
            <h2 className="exercice--title">{title}</h2>
            {currentStep === STEP_INTRO && <div className="exercice--intro">
                <div className="exercice--rules">{rules}</div>
                <button className="btn exercice--btn" type="submit">Prêt !</button>
            </div>}
            {currentStep === STEP_GAME && <div className="exercice--game">
                <div className="exercice--infos">
                    <div className="exercice--progression">{currentQuestion}/{nbQuestions}</div>
                    <div className="exercice--timer">{time} <span className="btn exercice--btn-play-pause" onClick={togglePause}>{!gamePaused ? "e" : "c"}</span></div>
                </div>
                <div className="exercice--question">{!gamePaused ? question : "Jeu en pause."}</div>
                {!gamePaused && <input 
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
                />}
                <div className={`exercice--message ${(error) ? "error" : ""}`}>{message}</div>
                <div className="exercice--actions">
                    {currentStep === STEP_GAME && <button className="btn exercice--btn" type="button" onClick={newGame}>Nouvelle partie</button>}
                    <button className="btn exercice--btn" type="submit">Valider</button>
                </div>
            </div>}
            {currentStep === STEP_BILAN && <div className="exercice--bilan">
                <div className="exercice--bilan-txt">{message}</div>
                <button className="btn exercice--btn" type="submit">Rejouer</button>
            </div>}
        </form>
    )
}
