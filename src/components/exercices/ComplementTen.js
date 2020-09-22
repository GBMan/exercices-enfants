import React from 'react'
import { getRandom_min_to_max, convertMillisecondsToMinutesSeconds } from '../../utils/misc'
import { FORMAT } from '../../utils/const'
import QuizzTemplate from './QuizzTemplate'

const LOCAL_STORAGE_KEY = "exercices-cp"

export default function ComplementTen() {
    const title = "Complément à 10"
    const nbQuestions = 10
    const rules = `Tu dois saisir le nombre complémentaire permettant d'obtenir 10. Il y aura ${nbQuestions} questions.`
    const format = FORMAT.NUMBER

    function getQuestion() {
        const number = getRandom_min_to_max(1, 9)
        const question = `${number} + ? = 10`
        const answer = 10 - number
        return {question: question, answer:answer}
    }
    function getBilan(timerMs, nbErrors, highScore) {
        let score = 5

        if (nbErrors > 0) score-- 
        if (nbErrors > 1) score--
        if (timerMs > nbQuestions*4500) score-- 
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
