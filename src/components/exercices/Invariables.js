import React from 'react'
import { getRandom_1_to_9, convertMillisecondsToMinutesSeconds } from '../../utils/misc'
import { FORMAT } from '../../utils/const'
import OralTemplate from './OralTemplate'

const LOCAL_STORAGE_KEY = "exercices-ce2"

export default function Invariables() {
    const title = "Mots invariables"
    const nbQuestions = 10
    const rules = `Tu dois saisir le mot dicté avec la bonne orthographe. Il y aura ${nbQuestions} mots.`
    const format = FORMAT.STRING

    const questions = [
        {
            question: "ailleurs",
            answer: "ailleurs"
        },
        {
            question: "à travers",
            answer: "à travers"
        },
        {
            question: "afin",
            answer: "afin"
        },
        {
            question: "ainsi",
            answer: "ainsi"
        },
        {
            question: "alors",
            answer: "alors"
        },
        {
            question: "après",
            answer: "après"
        },
        {
            question: "arrière",
            answer: "arrière"
        },
        {
            question: "assez",
            answer: "assez"
        },
        {
            question: "attentivement",
            answer: "attentivement"
        },
        {
            question: "aucun",
            answer: "aucun"
        },
        {
            question: "aujourd'hui",
            answer: "aujourd'hui"
        },
        {
            question: "auprès",
            answer: "auprès"
        },
        {
            question: "aussi",
            answer: "aussi"
        },
        {
            question: "aussitôt",
            answer: "aussitôt"
        },
        {
            question: "autant",
            answer: "autant"
        },
        {
            question: "autour",
            answer: "autour"
        },
        {
            question: "autrefois",
            answer: "autrefois"
        },
        {
            question: "avant",
            answer: "avant"
        },
        {
            question: "avec",
            answer: "avec"
        },
        {
            question: "beaucoup",
            answer: "beaucoup"
        },
        {
            question: "bien",
            answer: "bien"
        },
        {
            question: "bientôt",
            answer: "bientôt"
        },
        {
            question: "brusquement",
            answer: "brusquement"
        },
        {
            question: "car",
            answer: "car"
        },
        {
            question: "ceci",
            answer: "ceci"
        },
        {
            question: "cela",
            answer: "cela"
        },
        {
            question: "celui",
            answer: "celui"
        },
        {
            question: "celui-ci",
            answer: "celui-ci"
        },
        {
            question: "cependant",
            answer: "cependant"
        },
        {
            question: "certainement",
            answer: "certainement"
        },
        {
            question: "chacun",
            answer: "chacun"
        },
        {
            question: "chaque",
            answer: "chaque"
        },
        {
            question: "chez",
            answer: "chez"
        },
        {
            question: "combien",
            answer: "combien"
        },
        {
            question: "comme",
            answer: "comme"
        },
        {
            question: "comment",
            answer: "comment"
        },
        {
            question: "complètement",
            answer: "complètement"
        },
        {
            question: "contre",
            answer: "contre"
        },
        {
            question: "d'abord",
            answer: "d'abord"
        },
        {
            question: "dans",
            answer: "dans"
        },
        {
            question: "debout",
            answer: "debout"
        },
        {
            question: "dedans",
            answer: "dedans"
        },
        {
            question: "dehors",
            answer: "dehors"
        },
        {
            question: "déjà",
            answer: "déjà"
        },
        {
            question: "demain",
            answer: "demain"
        },
        {
            question: "depuis",
            answer: "depuis"
        },
        {
            question: "derrière",
            answer: "derrière"
        },
        {
            question: "dessous",
            answer: "dessous"
        },
        {
            question: "dessus",
            answer: "dessus"
        },
        {
            question: "devant",
            answer: "devant"
        },
        {
            question: "donc",
            answer: "donc"
        },
        {
            question: "dont",
            answer: "dont"
        },
        {
            question: "doucement",
            answer: "doucement"
        },
        {
            question: "durant",
            answer: "durant"
        },
        {
            question: "également",
            answer: "également"
        },
        {
            question: "en",
            answer: "en"
        },
        {
            question: "en effet",
            answer: "en effet"
        },
        {
            question: "encore",
            answer: "encore"
        },
        {
            question: "enfin",
            answer: "enfin"
        },
        {
            question: "ensemble",
            answer: "ensemble"
        },
        {
            question: "ensuite",
            answer: "ensuite"
        },
        {
            question: "entièrement",
            answer: "entièrement"
        },
        {
            question: "entre",
            answer: "entre"
        },
        {
            question: "envers",
            answer: "envers"
        },
        {
            question: "environ",
            answer: "environ"
        },
        {
            question: "est-ce que",
            answer: "est-ce que"
        },
        {
            question: "eux",
            answer: "eux"
        },
        {
            question: "face",
            answer: "face"
        },
        {
            question: "facilement",
            answer: "facilement"
        },
        {
            question: "généralement",
            answer: "généralement"
        },
        {
            question: "gentiment",
            answer: "gentiment"
        },
        {
            question: "hélas",
            answer: "hélas"
        },
        {
            question: "heureusement",
            answer: "heureusement"
        },
        {
            question: "hier",
            answer: "hier"
        },
        {
            question: "hors",
            answer: "hors"
        },
        {
            question: "ici",
            answer: "ici"
        },
        {
            question: "il y a",
            answer: "il y a"
        },
        {
            question: "immédiatement",
            answer: "immédiatement"
        },
        {
            question: "jamais",
            answer: "jamais"
        },
        {
            question: "joyeusement",
            answer: "joyeusement"
        },
        {
            question: "jusque",
            answer: "jusque"
        },
        {
            question: "justement",
            answer: "justement"
        },
        {
            question: "la plupart",
            answer: "la plupart"
        },
        {
            question: "là-bas",
            answer: "là-bas"
        },
        {
            question: "lentement",
            answer: "lentement"
        },
        {
            question: "loin",
            answer: "loin"
        },
        {
            question: "longtemps",
            answer: "longtemps"
        },
        {
            question: "lors",
            answer: "lors"
        },
        {
            question: "lorsque",
            answer: "lorsque"
        },
        {
            question: "lui",
            answer: "lui"
        },
        {
            question: "maintenant",
            answer: "maintenant"
        },
        {
            question: "mais",
            answer: "mais"
        },
        {
            question: "mal",
            answer: "mal"
        },
        {
            question: "malgré",
            answer: "malgré"
        },
        {
            question: "malheureusement",
            answer: "malheureusement"
        },
        {
            question: "même",
            answer: "même"
        },
        {
            question: "mieux",
            answer: "mieux"
        },
        {
            question: "moi",
            answer: "moi"
        },
        {
            question: "moins",
            answer: "moins"
        },
        {
            question: "naturellement",
            answer: "naturellement"
        },
        {
            question: "ne",
            answer: "ne"
        },
        {
            question: "néanmoins",
            answer: "néanmoins"
        },
        {
            question: "par",
            answer: "par"
        },
        {
            question: "parce que",
            answer: "parce que"
        },
        {
            question: "parfois",
            answer: "parfois"
        },
        {
            question: "parmi",
            answer: "parmi"
        },
        {
            question: "partout",
            answer: "partout"
        },
        {
            question: "pas",
            answer: "pas"
        },
        {
            question: "pendant",
            answer: "pendant"
        },
        {
            question: "personne",
            answer: "personne"
        },
        {
            question: "peu",
            answer: "peu"
        },
        {
            question: "peut-être",
            answer: "peut-être"
        },
        {
            question: "plus",
            answer: "plus"
        },
        {
            question: "plusieurs",
            answer: "plusieurs"
        },
        {
            question: "plutôt",
            answer: "plutôt"
        },
        {
            question: "poliment",
            answer: "poliment"
        },
        {
            question: "pour",
            answer: "pour"
        },
        {
            question: "pourquoi",
            answer: "pourquoi"
        },
        {
            question: "pourtant",
            answer: "pourtant"
        },
        {
            question: "près",
            answer: "près"
        },
        {
            question: "presque",
            answer: "presque"
        },
        {
            question: "puis",
            answer: "puis"
        },
        {
            question: "puisque",
            answer: "puisque"
        },
        {
            question: "quand",
            answer: "quand"
        },
        {
            question: "que",
            answer: "que"
        },
        {
            question: "quelquefois",
            answer: "quelquefois"
        },
        {
            question: "quelqu'un",
            answer: "quelqu'un"
        },
        {
            question: "qui",
            answer: "qui"
        },
        {
            question: "quoi",
            answer: "quoi"
        },
        {
            question: "rapidement",
            answer: "rapidement"
        },
        {
            question: "rarement",
            answer: "rarement"
        },
        {
            question: "régulièrement",
            answer: "régulièrement"
        },
        {
            question: "rien",
            answer: "rien"
        },
        {
            question: "sans",
            answer: "sans"
        },
        {
            question: "seulement",
            answer: "seulement"
        },
        {
            question: "simplement",
            answer: "simplement"
        },
        {
            question: "sinon",
            answer: "sinon"
        },
        {
            question: "soudain",
            answer: "soudain"
        },
        {
            question: "sous",
            answer: "sous"
        },
        {
            question: "souvent",
            answer: "souvent"
        },
        {
            question: "sur",
            answer: "sur"
        },
        {
            question: "surtout",
            answer: "surtout"
        },
        {
            question: "tandis",
            answer: "tandis"
        },
        {
            question: "tant",
            answer: "tant"
        },
        {
            question: "tantôt",
            answer: "tantôt"
        },
        {
            question: "tard",
            answer: "tard"
        },
        {
            question: "tellement",
            answer: "tellement"
        },
        {
            question: "toi",
            answer: "toi"
        },
        {
            question: "tôt",
            answer: "tôt"
        },
        {
            question: "totalement",
            answer: "totalement"
        },
        {
            question: "toujours",
            answer: "toujours"
        },
        {
            question: "tranquillement",
            answer: "tranquillement"
        },
        {
            question: "très",
            answer: "très"
        },
        {
            question: "tristement",
            answer: "tristement"
        },
        {
            question: "trop",
            answer: "trop"
        },
        {
            question: "vers",
            answer: "vers"
        },
        {
            question: "vite",
            answer: "vite"
        },
        {
            question: "vivement",
            answer: "vivement"
        },
        {
            question: "voici",
            answer: "voici"
        },
        {
            question: "voilà",
            answer: "voilà"
        },
        {
            question: "volontiers",
            answer: "volontiers"
        },
        {
            question: "vraiment",
            answer: "vraiment"
        },
    ]

    function getQuestion() {
        const totalQuestions = questions.length
        const question = questions[Math.floor(Math.random() * totalQuestions)]
        return {question: question.question, answer:question.answer}
    }

    function getBilan(timerMs, nbErrors, highScore) {
        let score = 5

        if (nbErrors > 0) score-- 
        if (nbErrors > 2) score--
        if (timerMs > nbQuestions*10000) score-- 
        if (timerMs > nbQuestions*20000) score--

        let starScore = ""
        for (let i = 0; i < 5; i++) {
            if (i < score) starScore += "Z"
            else starScore += "b"
        }

        return `Bravo ! Tu as terminé en <strong>${convertMillisecondsToMinutesSeconds(timerMs)}</strong> avec <strong>${nbErrors === 0 ? "aucune erreur" : (nbErrors === 1) ? "1 erreur" : nbErrors+" erreurs"}</strong>. Cela fait à peu près <strong>${Math.round((timerMs/1000)/nbQuestions)}</strong> secondes par mot.<br />
        <span class="exercice--bilan-score">${starScore}</span><br />
        Le record est <strong>${convertMillisecondsToMinutesSeconds(highScore)}</strong>.`
    }

    return (
        <OralTemplate  title={title} getQuestion={getQuestion} getBilan={getBilan} nbQuestions={nbQuestions} rules={rules} localStorageKey={LOCAL_STORAGE_KEY} format={format} />
    )
}
