export default class Speaker {
    constructor() {
        console.log("new Speaker()")
        this.utterance = new SpeechSynthesisUtterance()
        this.voices = []
        this.currentCharacter = 0
        this.patchPause = false // To patch the "paused" status which is not always set properly 
        this.source = ""
        this.defaultLang = "fr-FR"

        // this.utterance.onstart = () => {console.log("onstart")}
        // this.utterance.onend = () => {console.log("onend")}
        // this.utterance.onresume = () => {console.log("onresume")}
        // this.utterance.onpause = () => {console.log("onpause")}
        // this.utterance.onmark = () => {console.log("onmark")}
        // this.utterance.onboundary = () => {console.log("onboundary")}

        this.initVoices()
        window.speechSynthesis.onvoiceschanged = (event) => {
            this.initVoices()
        }

        // this.utterance.addEventListener('end', () => {
        // })
        this.utterance.addEventListener('boundary', (event) => {
            this.currentCharacter = event.charIndex
        })

        // this.playButton.addEventListener('click', () => {
        //     this.playText(this.textInput.value)
        // })
        // this.pauseButton.addEventListener('click', this.pauseText)
        // this.stopButton.addEventListener('click', this.stopText)
        // this.speedInput.addEventListener('input', this.speedText)
        // this.langSelect.addEventListener('change', () => {this.prepareVoices(this.langSelect.value)})
        // this.voiceSelect.addEventListener('change', this.setVoice)
    }

    initVoices() {
        console.log("initVoices()")
        if (this.voices.length > 0) return
        // this.prepareVoices((window.speechSynthesis.getVoices())[0].lang)
        this.prepareVoices(this.defaultLang)
        // this.prepareLangs()
    }

    setText(text) {
        this.source = text
    }

    playText(text) {
        console.log("playText()")
        this.source = text
        if (window.speechSynthesis.speaking) {
            if (this.patchPause) {
                window.speechSynthesis.resume()
                this.patchPause = false
            }
            return
        }
        this.stopText() // To patch a Chrome bug
        this.utterance.text = text
        this.utterance.voice = this.voices[0]
        console.log(this.voices)
        console.log(this.voices[0])
        window.speechSynthesis.speak(this.utterance)
    }

    pauseText() {
        if (window.speechSynthesis && !window.speechSynthesis.speaking) return 
        (this.patchPause) ? window.speechSynthesis.resume() : window.speechSynthesis.pause()
        this.patchPause = !this.patchPause
    }

    stopText() {
        if (!window.speechSynthesis.speaking) return
        window.speechSynthesis.resume()
        this.patchPause = false
        window.speechSynthesis.cancel()
    }

    speedText() {
        this.update()
    }

    prepareVoices(lang) {
        while (this.voices.length > 0) this.voices.shift()
        const tempVoices = window.speechSynthesis.getVoices()
        tempVoices.forEach((voice, i) => {
            if (voice.lang === lang) {
                this.voices.push(voice)
            }
        })
        this.utterance.voice = this.voices[0]
        this.update()
    }

    prepareLangs() {
        const tempVoices = window.speechSynthesis.getVoices()
        const langs = []
        const defaultLang = tempVoices[0].lang

        tempVoices.forEach((voice, i) => {
            const lang = voice.lang
            if (!langs.includes(lang)) {
                langs.push(lang)
            }
        })
        langs.sort()
        langs.forEach((lang) => {
        })
    }

    setVoice() {
        this.update()
    }

    update() {
        if (!window.speechSynthesis.speaking) return
        const tPause = this.patchPause
        window.speechSynthesis.cancel()
        this.playText(this.utterance.text.substring(this.currentCharacter))
        if (tPause) {
            window.speechSynthesis.pause()
            this.patchPause = tPause
        }
    }
}