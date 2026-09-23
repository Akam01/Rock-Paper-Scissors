function getComputerChoice() {
    const choices = ["Rock", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function playRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return { message: `It's a tie! You both picked ${playerChoice}.`, winner: 'tie' };
    }

    if (
        (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
        (playerChoice === 'Paper' && computerChoice === 'Rock') ||
        (playerChoice === 'Scissors' && computerChoice === 'Paper')
    ) {
        return { message: `You win! ${playerChoice} beats ${computerChoice}.`, winner: 'player' };
    }

    return { message: `You lose! ${computerChoice} beats ${playerChoice}.`, winner: 'computer' };
}

let playerScore = 0;
let computerScore = 0;
let round = 0;

const buttons = document.querySelectorAll('.choice');
const resultText = document.getElementById('result');
const scoreText = document.getElementById('score');
const roundText = document.getElementById('round');
const playAgainButton = document.getElementById('play-again');

function updateScoreboard() {
    scoreText.textContent = `Score: ${playerScore} - ${computerScore}`;
    roundText.textContent = `Round: ${round} / 5`;
}

function endGame() {
    buttons.forEach((button) => {
        button.disabled = true;
    });

    playAgainButton.hidden = false;

    if (playerScore > computerScore) {
        resultText.textContent = `Final result: You win the game ${playerScore} - ${computerScore}!`;
    } else if (computerScore > playerScore) {
        resultText.textContent = `Final result: Computer wins the game ${computerScore} - ${playerScore}!`;
    } else {
        resultText.textContent = `Final result: It's a draw ${playerScore} - ${computerScore}!`;
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    round = 0;

    buttons.forEach((button) => {
        button.disabled = false;
    });

    playAgainButton.hidden = true;
    resultText.textContent = '';
    updateScoreboard();
}

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (round >= 5) {
            return;
        }

        const playerChoice = button.dataset.choice;
        const computerChoice = getComputerChoice();
        const roundResult = playRound(playerChoice, computerChoice);

        if (roundResult.winner === 'player') {
            playerScore += 1;
        } else if (roundResult.winner === 'computer') {
            computerScore += 1;
        }

        round += 1;
        updateScoreboard();
        resultText.textContent = `${roundResult.message} Current score: ${playerScore} - ${computerScore}.`;

        if (round === 5) {
            endGame();
        }
    });
});

playAgainButton.addEventListener('click', resetGame);

updateScoreboard();
