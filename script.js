document.addEventListener('DOMContentLoaded', () => {
    // Language Switch Logic
    const langBtnEn = document.getElementById('lang-btn-en');
    const langBtnAr = document.getElementById('lang-btn-ar');
    const body = document.body;

    function switchLanguage(lang) {
        if (lang === 'ar') {
            body.classList.remove('en');
            body.classList.add('ar');
            langBtnAr.classList.add('active');
            langBtnEn.classList.remove('active');
            body.setAttribute('dir', 'rtl');
        } else {
            body.classList.remove('ar');
            body.classList.add('en');
            langBtnEn.classList.add('active');
            langBtnAr.classList.remove('active');
            body.setAttribute('dir', 'ltr');
        }

        // Update all elements with data-en/data-ar
        document.querySelectorAll('[data-en]').forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });
    }

    langBtnEn.addEventListener('click', () => switchLanguage('en'));
    langBtnAr.addEventListener('click', () => switchLanguage('ar'));

    // Intersection Observer for Menu Sections
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.menu-section').forEach(section => {
        observer.observe(section);
    });

    // Floating Icons Logic
    const floatingContainer = document.getElementById('floating-icons-container');
    const iconTypes = ['fa-spa', 'fa-leaf', 'fa-snowflake', 'fa-circle'];
    const iconsCount = 25;
    const icons = [];

    for (let i = 0; i < iconsCount; i++) {
        const icon = document.createElement('i');
        const randomType = iconTypes[Math.floor(Math.random() * iconTypes.length)];
        icon.className = `fas ${randomType} floating-icon`;
        
        // Random initial position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = 8 + Math.random() * 18;
        const speed = 0.03 + Math.random() * 0.06; 
        const rotation = Math.random() * 360;

        icon.style.left = `${x}%`;
        icon.style.top = `${y}%`;
        icon.style.fontSize = `${size}px`;
        icon.style.opacity = 0.15 + Math.random() * 0.25;
        icon.style.transform = `rotate(${rotation}deg)`;
        
        floatingContainer.appendChild(icon);
        icons.push({ element: icon, x, y, speed, rotation });
    }

    // Scroll Effects (Parallax & Floating Icons)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Move floating icons
        icons.forEach(icon => {
            const moveY = scrolled * icon.speed;
            icon.element.style.transform = `translateY(${moveY}px) rotate(${icon.rotation + (scrolled * 0.1)}deg)`;
        });

        // Parallax background effect for sections
        document.querySelectorAll('.menu-section').forEach(section => {
            const bg = section.querySelector('.section-bg');
            if (bg) {
                const speed = 0.5;
                const offset = section.offsetTop;
                const distance = scrolled - offset;
                
                // Only animate if section is near viewport
                if (Math.abs(distance) < window.innerHeight) {
                    const yPos = -(distance * speed);
                    bg.style.transform = `translateY(${yPos}px) scale(1.1)`;
                }
            }
        });
    });
});
