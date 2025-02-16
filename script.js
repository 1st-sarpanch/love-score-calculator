document.addEventListener('DOMContentLoaded', function() {
    const floatingHeartsContainer = document.getElementById('floatingHearts');
    const heartSymbols = ['❤️', '💖', '💗', '💓', '💝'];
    const angrySymbols = ['😠', '😡', '💢', '🤬'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 5 + 10) + 's';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        floatingHeartsContainer.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }

    function createAngryEmoji() {
        const angry = document.createElement('div');
        angry.className = 'angry-emoji';
        angry.textContent = angrySymbols[Math.floor(Math.random() * angrySymbols.length)];
        angry.style.left = Math.random() * 100 + 'vw';
        angry.style.animationDuration = (Math.random() * 3 + 5) + 's';
        angry.style.fontSize = (Math.random() * 30 + 20) + 'px';
        floatingHeartsContainer.appendChild(angry);
        setTimeout(() => {
            angry.remove();
        }, 8000);
    }

    let heartInterval = setInterval(createHeart, 1000);
    let angryInterval = null;

    const loveForm = document.getElementById('loveForm');
    const resultContainer = document.getElementById('result');
    const loveScoreElement = document.getElementById('loveScore');
    const loveQuoteElement = document.getElementById('loveQuote');

    function switchToAngryTheme() {
        document.body.classList.add('theme-angry');
        clearInterval(heartInterval);
        angryInterval = setInterval(createAngryEmoji, 500);
        document.documentElement.style.setProperty('--dark-pink', '#FF0000');
        resultContainer.style.borderColor = '#FF0000';
    }

    function switchToCalculateTheme() {
        document.body.classList.add('theme-calculate');
        clearInterval(angryInterval);
        heartInterval = setInterval(createHeart, 500);
    }

    function resetTheme() {
        document.body.classList.remove('theme-angry', 'theme-calculate');
        clearInterval(angryInterval);
        clearInterval(heartInterval);
        heartInterval = setInterval(createHeart, 1000);
        document.documentElement.style.setProperty('--dark-pink', '#FF69B4');
        resultContainer.style.borderColor = '#FF69B4';
    }

    // Career and Money Quotes (1-30%)
    const careerQuotes = [
        "Focus on your career! Success is the best revenge. 💼💪  YOU SHOULD FOCUS ON CAREER",
        "Your ambition will lead you to great places. Money is waiting! 💰✨  YOU SHOULD FOCUS ON CAREER",
        "The greatest love story is your journey to success. 📈🌟  YOU SHOULD FOCUS ON CAREER",
        "Your career path is more exciting than any romance right now. 🚀💼  YOU SHOULD FOCUS ON CAREER",
        "Keep grinding! Your bank account will thank you later. 💸💪  YOU SHOULD FOCUS ON CAREER"
    ];

    // Single Life Quotes (30-50%)
    const singleQuotes = [
        "Single life is your superpower! Embrace your freedom. 🦋✨ STAY SINGLE BUDDY",
        "Self-love is the best love. Keep shining! ⭐️💫 STAY SINGLE BUDDY",
        "Your independence is your greatest asset. Rock it! 🎸💃 STAY SINGLE BUDDY",
        "Living your best life needs no partner. You're amazing! 🌟✨ STAY SINGLE BUDDY",
        "Freedom to be yourself is priceless. Enjoy the journey! 🎉🌈 STAY SINGLE BUDDY"
    ];

    // Love and Relationship Quotes (50-100%)
    const loveQuotes = [
        "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day. 💑",
        "When I look into your eyes, I know I have found the mirror of my soul. 👀💕",
        "A successful relationship requires falling in love multiple times, but always with the same person. 💘",
        "In all the world, there is no heart for me like yours. 💖",
        "Every love story is beautiful, but ours is my favorite. 📖💕",
        "You are my sunshine on the cloudiest days, my rainbow after every storm. 🌈☀️",
        "Together we're a perfect recipe of chaos and love. 👩‍🍳❤️👨‍🍳",
        "Our love story is my favorite fairytale come true. 👑💫",
        "With you, every day feels like a new adventure waiting to begin. 🌅💕",
        "You make my heart smile in ways no one else can. 😊💝",
        "Like a fine wine, our love gets better with time. 🍷💑",
        "You're the missing piece to my puzzle, the harmony to my melody. 🧩🎵",
        "In your arms is where I belong, where love feels like home. 🏠💕",
        "Our love is like a beautiful garden, growing stronger each day. 🌸💖",
        "You're not just my love, you're my best friend and soulmate. 👫✨"
    ];

    // Function to generate consistent hash from two names
    function generateLoveScore(name1, name2) {
        const combinedNames = (name1.toLowerCase() + name2.toLowerCase()).replace(/\s/g, '');
        let hash = 0;

        for (let i = 0; i < combinedNames.length; i++) {
            hash = ((hash << 5) - hash) + combinedNames.charCodeAt(i);
            hash = hash & hash;
        }

        // Convert hash to a number between 0 and 100
        const loveScore = Math.abs(hash % 101);
        return loveScore;
    }

    // Function to get a quote based on love score
    function getQuote(score) {
        if (score <= 30) {
            return careerQuotes[Math.floor((score / 30) * careerQuotes.length)];
        } else if (score <= 50) {
            return singleQuotes[Math.floor(((score - 30) / 20) * singleQuotes.length)];
        } else {
            return loveQuotes[Math.floor(((score - 50) / 50) * loveQuotes.length)];
        }
    }

    // Function to animate the love score counter
    function animateScore(targetScore) {
        let currentScore = 0;
        const duration = 2000; // 2 seconds
        const interval = 20; // Update every 20ms
        const steps = duration / interval;
        const increment = targetScore / steps;

        const counter = setInterval(() => {
            currentScore += increment;
            if (currentScore >= targetScore) {
                currentScore = targetScore;
                clearInterval(counter);
            }
            loveScoreElement.textContent = `${Math.round(currentScore)}%`;
        }, interval);
    }

    loveForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name1 = document.getElementById('name1').value.trim().toLowerCase();
        const name2 = document.getElementById('name2').value.trim().toLowerCase();

        if (!name1 || !name2) {
            return;
        }

        // Check for "manish" in either name
        if (name1.includes('manish') || name2.includes('manish')) {
            switchToAngryTheme();
            resultContainer.style.display = 'block';
            loveScoreElement.textContent = '0%';
            loveQuoteElement.textContent = 'KUDHKO DEKHA HAI KABHI? 😡';
            return;
        }

        // Regular love calculation
        switchToCalculateTheme();
        const loveScore = generateLoveScore(name1, name2);
        const quote = getQuote(loveScore);

        resultContainer.style.display = 'block';
        animateScore(loveScore);

        loveQuoteElement.style.opacity = 0;
        loveQuoteElement.textContent = quote;
        setTimeout(() => {
            loveQuoteElement.style.opacity = 1;
        }, 500);

        localStorage.setItem(`${name1}-${name2}`, JSON.stringify({
            score: loveScore,
            quote: quote
        }));

        // Reset theme after 10 seconds
        setTimeout(resetTheme, 10000);
    });

    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
});