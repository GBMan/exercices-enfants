import React from 'react'
import { getRandom_1_to_9, convertMillisecondsToMinutesSeconds } from '../../utils/misc'
import QuizzTemplate from './QuizzTemplate'

const LOCAL_STORAGE_KEY = "exercices-ce2"

export default function Multiplication() {
    const title = "Multiplication"
    const nbQuestions = 20
    const rules = `Il faut saisir le résultat de la multiplication. Il y aura ${nbQuestions} questions.`

    function getQuestion() {
        const number1 = getRandom_1_to_9()
        const number2 = getRandom_1_to_9()
        const question = `${number1} x ${number2} = ?`
        const answer = number1*number2
        return {question: question, answer:answer}
    }
    function getBilan(timerMs, nbErrors, highScore) {
        return `Bravo ! Vous avez terminé en ${convertMillisecondsToMinutesSeconds(timerMs)} avec ${nbErrors === 0 ? "aucune erreur" : (nbErrors === 1) ? "1 erreur" : nbErrors+" erreurs"}. Cela fait à peu près ${Math.round((timerMs/1000)/nbQuestions)} secondes par question. Le record est ${convertMillisecondsToMinutesSeconds(highScore)}.`
    }

    return (
        <QuizzTemplate title={title} getQuestion={getQuestion} getBilan={getBilan} nbQuestions={nbQuestions} rules={rules} localStorageKey={LOCAL_STORAGE_KEY} />
    )
}
