document.addEventListener('DOMContentLoaded', function() {
    const profilePicContainer = document.querySelector('.profile-pic-container');
    const profileSection = document.querySelector('.profile-section');
    document.head.appendChild(style);

    profilePicContainer.addEventListener('animationiteration', function() {
        this.style.transform = 'translateX(-50%) translateX(-150%)';
    });
});

const typingElement = document.getElementById('typingEffect');
const phrases = ["Entrepreneur |", "Web Developer |", "Pharmacist."];
let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isTyping = true;
let cursorVisible = true;


const cursor = document.createElement('span');
cursor.className = 'cursor';
cursor.textContent = '|';
typingElement.appendChild(cursor);


const style = document.createElement('style');
style.textContent = `
    .cursor {
        animation: blink 1s infinite;
        color: rgb(230, 0, 0);
    }

    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
`;
document.head.appendChild(style);

function typeWriter() {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isTyping) {
        const charSpan = document.createElement('span');
        charSpan.textContent = currentPhrase[currentCharIndex];
        typingElement.insertBefore(charSpan, cursor);

        currentCharIndex++;

        if (currentCharIndex === currentPhrase.length) {
            isTyping = false;

            
            if (currentPhraseIndex < phrases.length - 1) {
                const space = document.createTextNode(' ');
                typingElement.insertBefore(space, cursor);
            }

            
            if (currentPhraseIndex < phrases.length - 1) {
                setTimeout(() => {
                    currentPhraseIndex++;
                    currentCharIndex = 0;
                    isTyping = true;
                    typeWriter();
                }, 1000);
            } else {
    
                cursor.style.display = 'none';
                
                clearInterval(cursorBlinkInterval);
            }
        } else {
            setTimeout(typeWriter, 90); 
        }
    }
}


setTimeout(typeWriter, 500);


const cursorBlinkInterval = setInterval(() => {
    cursorVisible = !cursorVisible;
    cursor.style.opacity = cursorVisible ? '1' : '0';
}, 500);

document.addEventListener('DOMContentLoaded', function() {

    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';

    mobileMenu.innerHTML = `
        <a href="#profile">Profile</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
    `;

    document.body.appendChild(mobileMenu);

    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        if (this.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    const themeSwitch = document.getElementById('theme-switch');
    const root = document.documentElement;


    const savedTheme = localStorage.getItem('theme') || 'dark';
    root.setAttribute('data-theme', savedTheme);
    themeSwitch.checked = savedTheme === 'dark';

    themeSwitch.addEventListener('change', function() {
        const theme = this.checked ? 'dark' : 'light';
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    const projectCards = document.querySelectorAll('.project-card');
    const socialLinks = document.querySelectorAll('.social-links a'); 
    
    
    const animateSocialLinksOnScroll = () => {
        socialLinks.forEach((link, index) => {
            const linkPosition = link.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (linkPosition < screenPosition) {
                if (index % 2 === 0) {
                    link.classList.add('slideInFromLeft');
                } else {
                    link.classList.add('slideInFromRight');
                }
            }
        });
    };

    const animateOnScroll = () => {
        projectCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (cardPosition < screenPosition) {
                card.style.opacity = '3';
                card.style.transform = 'translateY(0)';
            }
        });
        animateSocialLinksOnScroll(); 
    };

    projectCards.forEach(card => {
        card.style.opacity = '1.5';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'opacity 1s ease, transform 1s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});