// --- High Performance AI Portfolio Engine ---

// Global variables for canvas animation
let canvasRequest;
let preloaderRequest;

// Utility: Canvas Binary Matrix Animation
function startBinaryCanvas(canvas, isPreloader = false) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size based on parent
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth || window.innerWidth;
    canvas.height = parent.offsetHeight || window.innerHeight;

    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(0);

    const draw = () => {
        ctx.fillStyle = 'rgba(11, 17, 32, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = fontSize + 'px "Fira Code", monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = Math.round(Math.random());
            const random = Math.random();
            
            if (random > 0.98) {
                ctx.fillStyle = '#fff';
            } else if (text === 1) {
                ctx.fillStyle = isPreloader ? '#10b981' : '#334155';
            } else {
                ctx.fillStyle = isPreloader ? '#38bdf8' : '#1e293b';
            }

            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        
        if (isPreloader) {
            preloaderRequest = requestAnimationFrame(draw);
        } else {
            canvasRequest = requestAnimationFrame(draw);
        }
    };

    draw();
}

function stopBinaryCanvas(isPreloader = false) {
    if (isPreloader) {
        if (preloaderRequest) cancelAnimationFrame(preloaderRequest);
    } else {
        if (canvasRequest) cancelAnimationFrame(canvasRequest);
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. AI Preloader Logic ---
    const preloader = document.getElementById('ai-preloader');
    if (preloader) {
        const progressBar = document.getElementById('preloader-progress');
        const percentageText = document.getElementById('preloader-percentage');
        const terminalText = document.getElementById('preloader-text');
        const plCanvas = document.getElementById('preloader-canvas');

        // Start Preloader Visuals
        startBinaryCanvas(plCanvas, true);

        const steps = [
            { text: '> INITIALIZING AI_CORE...', progress: 15 },
            { text: '> LOADING NEURAL WEIGHTS...', progress: 30 },
            { text: '> FETCHING DATASETS...', progress: 50 },
            { text: '> OPTIMIZING ARCHITECTURE...', progress: 70 },
            { text: '> PERFORMING SELF-DIAGNOSTICS...', progress: 90 },
            { text: '> SYSTEM_READY: ACCESS_GRANTED', progress: 100 }
        ];

        let currentStep = 0;
        const duration = 2500;
        const interval = duration / steps.length;

        document.body.style.overflow = 'hidden';

        const runLoading = setInterval(() => {
            if (currentStep < steps.length) {
                const step = steps[currentStep];
                terminalText.textContent = step.text;
                progressBar.style.width = step.progress + '%';
                percentageText.textContent = step.progress + '%';
                currentStep++;
            } else {
                clearInterval(runLoading);
                setTimeout(() => {
                    preloader.classList.add('loaded');
                    // Wait for the 1s CSS transition to finish before stopping canvas
                    setTimeout(() => {
                        stopBinaryCanvas(true);
                        document.body.style.overflow = 'auto';
                        if (typeof AOS !== 'undefined') AOS.refresh();
                    }, 1000);
                }, 600);
            }
        }, interval);
    }

    // --- 1.5 Hero Typewriter Effect ---
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const roles = ['AI & Data Science Student', 'Full Stack Developer', 'Problem Solver', 'ML Enthusiast'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }
        type();
    }
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    if (typeof AOS !== 'undefined') {
        AOS.init({ once: true, offset: 100, duration: 800, easing: 'ease-out-cubic' });
    }

    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;
    
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        updateThemeIcon('dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            updateThemeIcon(newTheme);
            if (typeof initParticles === 'function') initParticles(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    // --- 2.5 Particles Initialization ---
    function initParticles(theme) {
        if (typeof particlesJS === 'undefined') return;
        
        const color = theme === 'dark' ? '#38bdf8' : '#2563eb';
        const lineColor = theme === 'dark' ? '#38bdf8' : '#2563eb';

        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": color },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": lineColor, "opacity": 0.2, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        });
    }

    // Initialize particles for the first time
    initParticles(savedTheme || 'dark');

    // --- 3. Navigation & Scroll Logic ---
    const header = document.querySelector('.header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
    }
    if (navClose) {
        navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
    }
    navLinks.forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
    });

    window.addEventListener('scroll', () => {
        if (header) {
            window.scrollY >= 50 ? header.classList.add('scroll-header') : header.classList.remove('scroll-header');
        }
    });

    // --- 4. Contact Form Logic ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            formData.append('form-name', 'contact');
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            // Basic Validation
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('invalid');
                }
            });

            if (!isValid) {
                contactForm.classList.add('shake');
                setTimeout(() => contactForm.classList.remove('shake'), 500);
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.classList.add('loading');

            try {
                const response = await fetch("/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams(formData).toString(),
                });

                if (response.ok) {
                    runTerminalAnimation();
                    contactForm.reset();
                } else {
                    throw new Error("Form submission failed");
                }
            } catch (error) {
                showNotification("Network error. Please try again later.", "error");
            } finally {
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }
        });
    }

    function runTerminalAnimation() {
        const overlay = document.getElementById('form-success');
        const output = document.getElementById('terminal-output');
        const canvas = document.getElementById('binary-canvas');
        if (!overlay || !output) return;

        overlay.classList.remove('hidden');
        output.innerHTML = '';
        startBinaryCanvas(canvas, false);

        const lines = [
            { text: '> INITIALIZING NEURAL PIPELINE...', delay: 0 },
            { text: '> LOADING PRE-TRAINED WEIGHTS...', delay: 400 },
            { text: '> VECTORIZING MESSAGE TENSORS...', delay: 800 },
            { text: '> ASSEMBLY_EXEC: MOV EAX, [INPUT]', delay: 1100, class: 'glitch-text' },
            { text: '> ASSEMBLY_EXEC: CALL NEURAL_NET_INF', delay: 1500, class: 'glitch-text' },
            { text: '> PERFORMING SENTIMENT ANALYSIS...', delay: 2000 },
            { text: '> OPTIMIZING GRADIENT DESCENT...', delay: 2400 },
            { text: '> CLASSIFICATION: [SUCCESSFUL_TRANSMISSION]', delay: 2800 },
            { text: 'MODEL INFERENCE COMPLETE! I\'LL ANALYZE YOUR MESSAGE AND REPLY SHORTLY.', delay: 3400, class: 'success-msg' }
        ];

        lines.forEach((line, index) => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = 'terminal-line' + (line.class ? ' ' + line.class : '');
                div.textContent = line.text;
                output.appendChild(div);
                output.scrollTop = output.scrollHeight;

                if (index === lines.length - 1) {
                    const resetBtn = document.createElement('button');
                    resetBtn.className = 'btn-reset';
                    resetBtn.type = 'button'; // Critical: Prevents form re-submission
                    resetBtn.textContent = '> RETRAIN_MODEL (Send Another)';
                    resetBtn.onclick = () => {
                        overlay.classList.add('hidden');
                        stopBinaryCanvas(false);
                        // Clear any lingering validation styles
                        const inputs = contactForm.querySelectorAll('input, textarea');
                        inputs.forEach(input => input.classList.remove('invalid'));
                    };
                    setTimeout(() => output.appendChild(resetBtn), 1500);
                }
            }, line.delay);
        });
    }

    function showNotification(message, type = 'success') {
        const container = document.getElementById('notification-container');
        if (!container) return;
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i><span>${message}</span>`;
        container.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 400);
        }, 5000);
    }

    // --- 5. Custom Cursor Logic ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, .nav-toggle, .btn-reset, #theme-toggle');

    if (cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            // Use left/top to avoid conflicting with CSS transforms (translate -50%)
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 50);
        });

        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                follower.classList.add('cursor-hover');
            });
            link.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                follower.classList.remove('cursor-hover');
            });
        });
    }
    // --- 6. Live Training Tensor Background ---
    function initTensorBackground() {
        const canvas = document.getElementById('tensor-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        let width, height, columns;
        const fontSize = 14;
        let symbols = [];
        let isReacting = false;
        let reactionColor = '#38bdf8';
        let reactionSpeed = 1;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            columns = Math.floor(width / fontSize);
            symbols = [];
            for (let i = 0; i < columns; i++) {
                symbols[i] = {
                    x: i * fontSize,
                    y: Math.random() * height,
                    speed: 1 + Math.random() * 3
                };
            }
        }

        function draw() {
            ctx.fillStyle = 'rgba(11, 17, 32, 0.1)'; 
            ctx.fillRect(0, 0, width, height);

            ctx.font = fontSize + 'px Fira Code';
            
            for (let i = 0; i < symbols.length; i++) {
                const s = symbols[i];
                const text = Math.random() > 0.8 ? (Math.random()).toFixed(2) : Math.floor(Math.random() * 2);
                
                ctx.fillStyle = isReacting ? reactionColor : '#38bdf8';
                ctx.globalAlpha = isReacting ? 0.3 : 0.12;
                
                ctx.fillText(text, s.x, s.y);

                s.y += s.speed * (isReacting ? reactionSpeed : 1);
                if (s.y > height) {
                    s.y = -fontSize;
                }
            }
            requestAnimationFrame(draw);
        }

        window.addEventListener('resize', resize);
        resize();
        draw();

        // Skill Card Interactions
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                isReacting = true;
                const prof = parseInt(card.getAttribute('data-proficiency')) || 80;
                reactionSpeed = 2 + (prof / 30);
                reactionColor = '#10b981';
            });
            card.addEventListener('mouseleave', () => {
                isReacting = false;
                reactionSpeed = 1;
            });
        });
    }

    initTensorBackground();

    // --- 7. Project Sharing Logic ---
    const shareDrawer = document.getElementById('share-drawer');
    const shareOverlay = document.getElementById('share-overlay');
    const closeShare = document.getElementById('close-share');
    const shareBtns = document.querySelectorAll('.share-btn');
    
    let activeShareData = { title: '', url: '' };

    function showNotification(message) {
        const container = document.getElementById('notification-container');
        if (!container) return;
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        container.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    shareBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            activeShareData.title = btn.getAttribute('data-title');
            activeShareData.url = btn.getAttribute('data-url');
            
            // Try native share first on mobile
            if (navigator.share && window.innerWidth < 768) {
                navigator.share({
                    title: activeShareData.title,
                    url: activeShareData.url
                }).catch(err => console.log('Native share failed', err));
            } else if (shareDrawer && shareOverlay) {
                // Show custom drawer
                shareDrawer.classList.add('active');
                shareOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeShare && shareOverlay) {
        const closeMenu = () => {
            shareDrawer.classList.remove('active');
            shareOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeShare.addEventListener('click', closeMenu);
        shareOverlay.addEventListener('click', closeMenu);

        // Share Options Implementation
        const whatsappBtn = document.getElementById('share-whatsapp');
        const twitterBtn = document.getElementById('share-twitter');
        const linkedinBtn = document.getElementById('share-linkedin');
        const copyBtn = document.getElementById('share-copy');

        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.open(`https://api.whatsapp.com/send?text=Check out this project: ${activeShareData.title} - ${activeShareData.url}`, '_blank');
            });
        }

        if (twitterBtn) {
            twitterBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.open(`https://twitter.com/intent/tweet?text=Check out this project: ${activeShareData.title}&url=${activeShareData.url}`, '_blank');
            });
        }

        if (linkedinBtn) {
            linkedinBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${activeShareData.url}`, '_blank');
            });
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(activeShareData.url).then(() => {
                    showNotification('Neural Link copied to clipboard!');
                    closeMenu();
                });
            });
        }
    }
});
