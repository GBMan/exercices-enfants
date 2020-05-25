import React, {useState, useEffect, useRef} from 'react'
import { convertMillisecondsToMinutesSeconds } from '../../utils/misc'
import { FORMAT } from '../../utils/const'
import Timer from '../../utils/Timer'
import Speaker from '../../utils/Speaker'
import anime from 'animejs/lib/anime.es.js'
import ReactHtmlParser from 'react-html-parser';

export default function OralTemplate(props) {
    const {
        title,
        localStorageKey,
        getQuestion,
        getBilan,
        nbQuestions,
        rules,
        format
    } = props

    const STEP_INTRO = "intro"
    const STEP_GAME = "game"
    const STEP_BILAN = "bilan"
    const MESSAGE_STATUS_DEFAULT = ""
    const MESSAGE_STATUS_GOOD = "good"
    const MESSAGE_STATUS_ERROR = "error"
    const DURATION_GOOD_ANSWER = 500
    const DURATION_TIMER = 1000
    const [answer, setAnswer] = useState(undefined)
    const [question, setQuestion] = useState("")
    const [message, setMessage] = useState("")
    const [messageStatus, setMessageStatus] = useState(MESSAGE_STATUS_DEFAULT)
    const [nbErrors, setNbErrors] = useState(0)
    const [time, setTime] = useState("00:00")
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [currentStep, setCurrentStep] = useState(STEP_INTRO)
    const [gamePaused, setGamePaused] = useState(false)
    const [lastKeyCode, setLastKeyCode] = useState(null)
    const eltAnswer = useRef(null)
    const eltBilan = useRef(null)
    const idTimeout = useRef(null)
    const idInterval = useRef(null)
    const highScore = useRef(null)
    const timer = useRef(null)
    const speaker = useRef(null)

    useEffect(() => {
        const recipesJSON = localStorage.getItem(localStorageKey)
        if (recipesJSON !== null) {
            highScore.current = JSON.parse(recipesJSON)
        }
        document.addEventListener('keyup', handleKeyUp);

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
        if (lastKeyCode === "Enter") {
            if (currentStep === STEP_GAME) handleValidate()
            else initGame()
            setLastKeyCode(null)
        }
    }, [lastKeyCode])

    function handleKeyUp(event) {
        setLastKeyCode(event.code)
    }

    function handleValidate(event) {
        if (gamePaused) return
        const playerAnswer = eltAnswer.current.value
        if ((format === FORMAT.NUMBER && Number(playerAnswer) === answer)
            || (format === FORMAT.STRING && playerAnswer === answer)) {
            setMessageStatus(MESSAGE_STATUS_GOOD)
            setMessage("Bonne réponse !")
            clearTimeout(idTimeout.current)
            eltAnswer.current.disabled = true
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
            setMessageStatus(MESSAGE_STATUS_ERROR)
            if (playerAnswer === "") {
                setMessage("Oups ! Mets une réponse avant de valider.")
                eltAnswer.current.focus()
            }
            else {
                setMessage("Oups ! Il y a une erreur.")
                eltAnswer.current.select()
                setNbErrors((prevNbError) => {return prevNbError + 1})
            }
        }
    }

    function newGame() {
        setCurrentStep(STEP_INTRO)
    }

    function initGame() {
        timer.current = new Timer(true)
        speaker.current = new Speaker()
        setTime("00:00")
        setCurrentQuestion(0)
        setCurrentStep(STEP_GAME)
        setQuestion("")
        setAnswer("")
        setMessage("")
        setNbErrors(0)
        setMessageStatus(MESSAGE_STATUS_DEFAULT)

        clearTimeout(idTimeout.current)
        clearInterval(idInterval.current)
        updateTimer()
        idInterval.current = setInterval(() => {updateTimer()}, DURATION_TIMER)
    }

    function togglePause() {
        timer.current.togglePauseResumeChrono()
        clearInterval(idInterval.current)
        setMessageStatus(MESSAGE_STATUS_DEFAULT)
        if (gamePaused) {
            setMessage("")
            updateTimer()
            idInterval.current = setInterval(updateTimer, DURATION_TIMER)
        }
        else {
            setMessage("Jeu en pause.")
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
            speaker.current.playText(newQuestion.question)
            setQuestion(newQuestion.question)
            setAnswer(newQuestion.answer)
            setMessage("")
            if (eltAnswer && eltAnswer.current) {
                eltAnswer.current.disabled = false
                eltAnswer.current.value = ""
                eltAnswer.current.focus()
            }
        }
    }

    function speak() {
        anime({
            targets: '.exercice--btn-reload',
            rotate: 179,
            duration: 400,
            direction: 'alternate',
            easing: "easeInOutExpo"
        })
        speaker.current.playText(question)
        eltAnswer.current.focus()
    }

    function updateTimer() {
        setTime(convertMillisecondsToMinutesSeconds(timer.current.getMilliseconds()))
    }

    return (
        <div className="exercice">
            <h2 className="exercice--title">{title}</h2>
            {currentStep === STEP_INTRO && <div className="exercice--intro">
                <div className="exercice--rules">{rules}</div>
                <button className="btn exercice--btn" type="button" onClick={initGame}>Prêt !</button>
            </div>}
            {currentStep === STEP_GAME && <div className="exercice--game">
                <div className="exercice--infos">
                    <div className="exercice--progression">{currentQuestion}/{nbQuestions}</div>
                    <div className="exercice--timer">{time} <span className="btn exercice--btn-play-pause" onClick={togglePause}>{!gamePaused ? "e" : "c"}</span></div>
                </div>
                {!gamePaused && <>
                    <div className="exercice--question">Redicter le mot <span className="btn exercice--btn-reload" onClick={speak}>{"g"}</span></div>
                    <input 
                        ref={eltAnswer} 
                        type="text" 
                        id="answer" 
                        name="answer" 
                        placeholder="Réponse ?" 
                        className="exercice--input" 
                        autoComplete="off" 
                        // pattern="[0-9]*" 
                        aria-labelledby="Réponse"
                        autoFocus 
                    />
                </>}
                <div className={`exercice--message ${messageStatus}`}>{message}</div>
                <div className="exercice--actions">
                    {currentStep === STEP_GAME && <button className="btn exercice--btn" type="button" onClick={newGame}>Nouvelle partie</button>}
                    <button className="btn exercice--btn" type="button" onClick={handleValidate}>Valider</button>
                </div>
            </div>}
            {currentStep === STEP_BILAN && <div className="exercice--bilan">
                <div className="exercice--bilan-txt" ref={eltBilan}>{ReactHtmlParser(message)}</div>
                <button className="btn exercice--btn" type="button" onClick={initGame}>Rejouer</button>
            </div>}
        </div>
    )
}
