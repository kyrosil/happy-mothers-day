document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('intro');
    const game = document.getElementById('game');
    const startButton = document.getElementById('startGame');
    const scoreDisplay = document.getElementById('score');
    const messageDisplay = document.getElementById('message');
    const reward = document.getElementById('reward');
    const claim = document.getElementById('claim');
    const claimButton = document.getElementById('claimReward');
    const langButton = document.getElementById('langBtn');
    let score = 0;
    const maxScore = 15;
    let currentLang = 'tr';

    const messages = {
        tr: [
            "Annemin ruhuna bir dua, bu kalp senin için.",
            "9 yıl oldu, ama annemin sevgisi hep içimde.",
            "Bu kalp, annemin hayrına bir iyilik tohumu.",
            "Annemin duaları sana da güç versin.",
            "Her kalp, annemin ruhuna gönderilen bir Fatiha.",
            "Annemin anısına, kalbin sevgiyle dolsun.",
            "Bu hediye, annemin merhametinin bir yansıması.",
            "Annemin gidişinden beri, dualarım onunla.",
            "Her kalp atışı, annemin ruhuna bir selam.",
            "Annemin anısına, bu iyilik sana ulaşsın.",
            "Annemin sevgisi, 9 yıl sonra bile yol gösteriyor.",
            "Bu kalp, annemin ruhuna bir ışık olsun.",
            "Annemin hayır duası hepimizin üzerinde.",
            "Her kalp, annemin anısına bir sadaka-i cariye.",
            "Annemin ruhu için, bu sevgi sana hediye."
        ],
        en: [
            "A prayer for my mom’s soul, this heart is for you.",
            "It’s been 9 years, but my mom’s love is always with me.",
            "This heart is a seed of kindness for my mom’s charity.",
            "May my mom’s prayers give you strength too.",
            "Each heart is a Fatiha sent to my mom’s soul.",
            "In my mom’s memory, may your heart be filled with love.",
            "This gift is a reflection of my mom’s compassion.",
            "Since my mom’s passing, my prayers are with her.",
            "Each heartbeat is a greeting to my mom’s soul.",
            "In my mom’s memory, may this kindness reach you.",
            "My mom’s love still guides me, even after 9 years.",
            "This heart is a light for my mom’s soul.",
            "My mom’s blessings are upon us all.",
            "Each heart is a continuous charity in my mom’s memory.",
            "For my mom’s soul, this love is a gift to you."
        ]
    };

    const specialMessages = {
        tr: "Annemin ruhu için bir Fatiha…",
        en: "A Fatiha for my mom’s soul…"
    };

    function typeWriter(element, text, speed, callback) {
        let i = 0;
        element.textContent = '';
        element.style.opacity = 1;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        type();
    }

    function animateText() {
        const paragraphs = document.querySelectorAll('.content p');
        let index = 0;
        function nextParagraph() {
            if (index < paragraphs.length) {
                const text = paragraphs[index].getAttribute(`data-${currentLang}`);
                typeWriter(paragraphs[index], text, 50, () => {
                    index++;
                    nextParagraph();
                });
            }
        }
        paragraphs.forEach(p => p.style.opacity = 0);
        nextParagraph();
    }

    function updateLanguage() {
        document.querySelectorAll('[data-tr]').forEach(element => {
            element.innerHTML = element.getAttribute(`data-${currentLang}`);
        });
        document.querySelectorAll('.score').forEach(element => {
            const baseText = element.getAttribute(`data-${currentLang}`);
            element.innerHTML = `${baseText} <span id="score">${score}</span>/15`;
        });
        animateText();
    }

    langButton.addEventListener('click', () => {
        currentLang = currentLang === 'tr' ? 'en' : 'tr';
        langButton.textContent = currentLang === 'tr' ? 'English' : 'Türkçe';
        updateLanguage();
    });

    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.classList.add('star-dust');
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDelay = `${Math.random() * 8}s`;
        document.body.appendChild(star);
    }

    for (let i = 0; i < 15; i++) {
        const light = document.createElement('div');
        light.classList.add('light');
        light.style.left = `${Math.random() * 100}vw`;
        light.style.top = `${Math.random() * 100}vh`;
        light.style.animationDelay = `${Math.random() * 3}s`;
        document.body.appendChild(light);
    }

    animateText();

    startButton.addEventListener('click', () => {
        intro.style.display = 'none';
        game.style.display = 'block';
        startGame();
    });

    function startGame() {
        function createHeart() {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = `${Math.random() * (window.innerWidth - 30)}px`;
            heart.style.top = `${Math.random() * (window.innerHeight - 30)}px`;
            heart.style.animationDelay = `${Math.random() * 2}s`;
            const colors = ['#f8bbd0', '#bbdefb', '#d1c4e9'];
            heart.style.background = `url('https://img.icons8.com/emoji/30/red-heart.png') no-repeat center, ${colors[Math.floor(Math.random() * colors.length)]}`;
            heart.style.backgroundSize = 'cover';
            document.body.appendChild(heart);

            heart.addEventListener('click', () => {
                heart.remove();
                score++;
                scoreDisplay.textContent = score;
                const message = score % 5 === 0 ? specialMessages[currentLang] : messages[currentLang][Math.floor(Math.random() * messages[currentLang].length)];
                messageDisplay.textContent = message;
                messageDisplay.style.display = 'block';
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
            const burst = document.createElement('div');
            burst.classList.add('light');
            burst.style.left = '50%';
            burst.style.top = '50%';
            burst.style.animation = 'lightBurst 1s ease-in-out';
            burst.style.animationDelay = `${i * 0.1}s`;
            document.body.appendChild(burst);
        }
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.top = `${Math.random() * 100}vh`;
            heart.style.animationDelay = `${Math.random() * 2}s`;
            document.body.appendChild(heart);
        }
    }

    claimButton.addEventListener('click', () => {
        reward.style.display = 'none';
        claim.style.display = 'block';
    });

    document.getElementById('submitAddress').addEventListener('click', () => {
        claim.style.display = 'none';
    });
});
