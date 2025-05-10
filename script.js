document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('intro');
    const game = document.getElementById('game');
    const startButton = document.getElementById('startGame');
    const scoreDisplay = document.getElementById('score');
    const reward = document.getElementById('reward');
    let score = 0;
    const maxScore = 10;

    // Işık efektleri
    for (let i = 0; i < 8; i++) {
        const light = document.createElement('div');
        light.classList.add('light');
        light.style.left = `${Math.random() * 100}vw`;
        light.style.top = `${Math.random() * 100}vh`;
        light.style.animationDelay = `${Math.random() * 3}s`;
        document.body.appendChild(light);
    }

    startButton.addEventListener('click', () => {
        intro.style.display = 'none';
        game.style.display = 'block';
        startGame();
    });

    function startGame() {
        function createHeart() {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.top = `${Math.random() * 100}vh`;
            heart.style.animationDelay = `${Math.random() * 2}s`;
            document.body.appendChild(heart);

            heart.addEventListener('click', () => {
                heart.remove();
                score++;
                scoreDisplay.textContent = score;
                if (score >= maxScore) {
                    showReward();
                } else {
                    createHeart();
                }
            });

            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                    createHeart();
                }
            }, 6000);
        }

        for (let i = 0; i < 5; i++) {
            createHeart();
        }
    }

    function showReward() {
        document.querySelectorAll('.heart').forEach(heart => heart.remove());
        reward.style.display = 'block';
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.top = `${Math.random() * 100}vh`;
            heart.style.animationDelay = `${Math.random() * 2}s`;
            document.body.appendChild(heart);
        }
    }
});
