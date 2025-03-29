const choices = ['가위', '바위', '보'];
// 각 선택지에 대한 이모지 매핑
const choiceEmojis = {
    '가위': '✌️', 
    '바위': '✊', 
    '보': '🖐️'  
};
let userScore = 0;
let computerScore = 0;

const userChoiceButtons = document.querySelectorAll('.choice');
const resultText = document.querySelector('#result');
const scoreText = document.querySelector('#score');
const resetButton = document.querySelector('#reset');
const userChoiceDisplay = document.querySelector('#user-choice'); 
const computerChoiceDisplay = document.querySelector('#computer-choice');

userChoiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const userChoice = button.dataset.choice;
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        
        // 이모지로 표시
        const userEmoji = choiceEmojis[userChoice];
        const computerEmoji = choiceEmojis[computerChoice];

        userChoiceDisplay.textContent = userEmoji; // 사용자의 선택 표시
        computerChoiceDisplay.textContent = computerEmoji; // 컴퓨터의 선택 표시
        
        judgeGame(userChoice, computerChoice);
    });
});

resetButton.addEventListener('click', () => {
    userScore = 0;
    computerScore = 0;
    updateScore();
    resultText.textContent = '가위바위보 게임 시작!';
    userChoiceDisplay.textContent = ''; 
    computerChoiceDisplay.textContent = ''; 
});

function judgeGame(user, computer) {
    if (user === computer) {
        resultText.textContent = `무승부!`;
    } else if (
        (user === '바위' && computer === '가위') ||
        (user === '가위' && computer === '보') ||
        (user === '보' && computer === '바위')
    ) {
        userScore++;
        resultText.textContent = `이겼습니다!🥳`;
    } else {
        computerScore++;
        resultText.textContent = `졌습니다!🥲`;
    }
    updateScore();
}

function updateScore() {
    scoreText.textContent = `${userScore} : ${computerScore}`;
}
