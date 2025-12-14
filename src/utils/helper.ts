export const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const inputSec = Math.floor(time % 60);
    const outputSec = inputSec < 10 ? `0${inputSec}` : inputSec;

    return `${min}:${outputSec}`;
}

