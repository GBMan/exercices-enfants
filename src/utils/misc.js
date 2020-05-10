export function getRandom_1_to_9() {
    return Math.ceil(Math.random()*9)
}

export function convertMillisecondsToMinutesSeconds(totalMilliseconds) {
    const totalSeconds = Math.floor(totalMilliseconds/1000)
    const totalMinutes = Math.floor(totalSeconds/60)
    const seconds = totalSeconds%60
    // const minutes = totalMinutes%60
    return `${totalMinutes <10 ? "0"+totalMinutes : totalMinutes }:${seconds < 10 ? "0"+seconds : seconds}`
}