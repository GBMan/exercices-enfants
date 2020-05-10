import React from 'react'
import { getRandom_1_to_9 } from '../../utils/misc'
import QuizzTemplate from './QuizzTemplate'

export default function ComplementTen() {
    const title = "Complément à 10"
    const nbQuestions = 10
    const rules = `Il faut saisir le nombre complémentaire permettant d'obtenir 10. Il y aura ${nbQuestions} questions.`

    function getQuestion() {
        const number = getRandom_1_to_9()
        const question = `${number} + ? = 10`
        const answer = 10 - number
        return {question: question, answer:answer}
    }
    function getBilan(time, nbErrors, timer) {
        return `Bravo ! Vous avez terminé en ${time} avec ${nbErrors === 0 ? "aucune erreur" : (nbErrors === 1) ? "1 erreur" : nbErrors+" erreurs"}. Cela fait à peu près ${Math.round((timer.getMilliseconds()/1000)/nbQuestions)} secondes par question.`
    }

    return (
        <QuizzTemplate title={title} getQuestion={getQuestion} getBilan={getBilan} nbQuestions={nbQuestions} rules={rules} />
    )
}
