import React from 'react'
import { getRandom_1_to_9 } from '../../utils/misc'
import QuizzTemplate from './QuizzTemplate'

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
    function getBilan(time, nbErrors, timer) {
        return `Bravo ! Vous avez terminé en ${time} avec ${nbErrors === 0 ? "aucune erreur" : (nbErrors === 1) ? "1 erreur" : nbErrors+" erreurs"}. Cela fait à peu près ${Math.round((timer.getMilliseconds()/1000)/nbQuestions)} secondes par question.`
    }

    return (
        <QuizzTemplate title={title} getQuestion={getQuestion} getBilan={getBilan} nbQuestions={nbQuestions} rules={rules} />
    )
}
