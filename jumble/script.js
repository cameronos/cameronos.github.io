const numberDisplay = document.getElementById('numberDisplay');
const numberInner = numberDisplay.querySelector('.number-inner');
const timerText = document.getElementById('timerText');
const timerFill = document.getElementById('timerFill');
const tickSound = document.getElementById('tickSound');

const blockDurationMs = 60 * 1000;
let lastBlock = null;

function getSeedNumber(block) {
    const seed = (block * 2654435761) % 9973;
    return (seed % 100) + 1;
}

const rumbleQuote = "Mr. Rumble wants you to develop GOOD mods. (https://cameronos.github.io/)";
console.log(`%c${rumbleQuote}`, "color: #8fb8d4; font-weight: bold; font-family: Courier New, monospace;");

function flipNumber(newNumber) {
    // Flip down
    numberInner.style.transform = 'rotateX(-90deg)';

    setTimeout(() => {
        numberInner.textContent = newNumber; // update number
        numberInner.style.transform = 'rotateX(0deg)'; // flip back
    }, 300);

    tickSound.play();
}

function updateNumberAndTimer() {
    const now = new Date();
    const minutesSinceEpoch = Math.floor(now.getTime() / 60000);
    const currentBlock = minutesSinceEpoch;

    const currentNumber = getSeedNumber(currentBlock);

    if (lastBlock !== null && lastBlock !== currentBlock) {
        flipNumber(currentNumber);
    } else {
        numberInner.textContent = currentNumber; // initial display
    }

    lastBlock = currentBlock;

    const msInBlock = now.getTime() % blockDurationMs;
    const msLeft = blockDurationMs - msInBlock;
    const mins = Math.floor(msLeft / 60000);
    const secs = Math.floor((msLeft % 60000) / 1000);
    timerText.textContent = `Next update in ${mins}:${secs.toString().padStart(2,'0')}`;
    timerFill.style.width = `${(msInBlock / blockDurationMs) * 100}%`;
}

updateNumberAndTimer();
setInterval(updateNumberAndTimer, 1000);
