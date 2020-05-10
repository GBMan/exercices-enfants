export default class Timer {
    constructor(autoStartChrono) {
        this.cumulMilliseconds = 0
        if (autoStartChrono) this.startChrono()
    }

    startChrono() {
        this.stopChrono()
        this.initialDate = new Date()
    }
    pauseChrono() {
        this.paused = true
        this.pauseDate = new Date()
    }
    resumeChrono() {
        this.cumulMilliseconds += this.pauseDate - this.initialDate
        this.initialDate = new Date()
        this.pauseDate = null
        this.paused = false
    }
    togglePauseResumeChrono() {
        if (this.paused) this.resumeChrono()
        else this.pauseChrono()
    }
    stopChrono() {
        this.paused = false
        this.initialDate = null
        this.pauseDate = null
        this.cumulMilliseconds = 0
    }

    getMilliseconds() {
        const referenceDate = (this.paused) ? this.pauseDate : new Date()
        return referenceDate - this.initialDate + this.cumulMilliseconds
    }
}