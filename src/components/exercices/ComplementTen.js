import React from 'react'
import { getRandom_1_to_9, convertMillisecondsToMinutesSeconds } from '../../utils/misc'
import QuizzTemplate from './QuizzTemplate'

const LOCAL_STORAGE_KEY = "exercices-cp"

export default function ComplementTen() {
    const title = "Complément à 10"
    const nbQuestions = 10
    const rules = `Tu dois saisir le nombre complémentaire permettant d'obtenir 10. Il y aura ${nbQuestions} questions.`

    function getQuestion() {
        const number = getRandom_1_to_9()
        const question = `${number} + ? = 10`
        const answer = 10 - number
        return {question: question, answer:answer}
    }
    function getBilan(timerMs, nbErrors, highScore) {
        return `Bravo ! Tu as terminé en ${convertMillisecondsToMinutesSeconds(timerMs)} avec ${nbErrors === 0 ? "aucune erreur" : (nbErrors === 1) ? "1 erreur" : nbErrors+" erreurs"}. Cela fait à peu près ${Math.round((timerMs/1000)/nbQuestions)} secondes par question. Le record est ${convertMillisecondsToMinutesSeconds(highScore)}.`
    }

    return (
        <QuizzTemplate title={title} getQuestion={getQuestion} getBilan={getBilan} nbQuestions={nbQuestions} rules={rules} localStorageKey={LOCAL_STORAGE_KEY} />
    )
}
