export function getRandom_min_to_max(min, max, isInt = true) {
    let rand = Math.random()*(max - min) + min
    return (isInt) ? Math.ceil(rand) : rand
}

export function convertMillisecondsToMinutesSeconds(totalMilliseconds) {
    const totalSeconds = Math.floor(totalMilliseconds/1000)
    const totalMinutes = Math.floor(totalSeconds/60)
    const seconds = totalSeconds%60
    // const minutes = totalMinutes%60
    return `${totalMinutes <10 ? "0"+totalMinutes : totalMinutes }:${seconds < 10 ? "0"+seconds : seconds}`
}