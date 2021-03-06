import React from 'react'
import { getRandom_min_to_max, convertMillisecondsToMinutesSeconds } from '../../utils/misc'
import { FORMAT } from '../../utils/const'
import QuizzTemplate from './QuizzTemplate'

const LOCAL_STORAGE_KEY = "exercices-ce2m"

export default function Multiplication() {
    const title = "Multiplication"
    const nbQuestions = 10
    const rules = `Tu dois saisir le résultat de la multiplication. Il y aura ${nbQuestions} questions.`
    const format = FORMAT.NUMBER

    function getQuestion() {
        const number1 = getRandom_min_to_max(3, 9)
        // const number1 = 6    // Temp pour aider Louis à réviser
        const number2 = getRandom_min_to_max(3, 9)
        const question = `${number1} x ${number2} = ?`
        const answer = number1*number2
        return {question: question, answer:answer}
    }
    function getBilan(timerMs, nbErrors, highScore) {
        let score = 5

        if (nbErrors > 0) score-- 
        if (nbErrors > 1) score--
        if (timerMs > nbQuestions*5000) score-- 
        if (timerMs > nbQuestions*7000) score--

        let starScore = ""
        for (let i = 0; i < 5; i++) {
            if (i < score) starScore += "Z"
            else starScore += "b"
        }

        return `Bravo ! Tu as terminé en <strong>${convertMillisecondsToMinutesSeconds(timerMs)}</strong> avec <strong>${nbErrors === 0 ? "aucune erreur" : (nbErrors === 1) ? "1 erreur" : nbErrors+" erreurs"}</strong>. Cela fait à peu près <strong>${Math.round((timerMs/1000)/nbQuestions)}</strong> secondes par question.<br />
        <span class="exercice--bilan-score">${starScore}</span><br />
        Le record est <strong>${convertMillisecondsToMinutesSeconds(highScore)}</strong>.`
    }

    return (
        <QuizzTemplate title={title} getQuestion={getQuestion} getBilan={getBilan} nbQuestions={nbQuestions} rules={rules} localStorageKey={LOCAL_STORAGE_KEY} format={format} />
    )
}
