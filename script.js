/* ========================================
   JANAGI - Enhanced JavaScript
   All Interactive Features & Animations
   ======================================== */

// ========================================
// Initialize on DOM Load
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initAOS();
    initLoadingScreen();
    initCustomCursor();
    initScrollProgress();
    initParticles();
    initNavigation();
    initTypingEffect();
    initThemeToggle();
    initTimelineInteraction();
    initStatCounters();
    initFormHandling();
    initModalSystem();
    initFlowExample();
    initAudienceToggle();
    initAnchorHighlights();
    initSVGTooltips();
});

// ========================================
// AOS (Animate On Scroll) Initialization
// ========================================
function initAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: false,
        offset: 100,
        delay: 0
    });
}

// ========================================
// Loading Screen
// ========================================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1500);
    });
}

// ========================================
// Custom Cursor
// ========================================
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower animation
    function animateFollower() {
        const distX = mouseX - followerX;
        const distY = mouseY - followerY;
        
        followerX += distX * 0.1;
        followerY += distY * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .glass-card, .ripple-effect');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorFollower.classList.add('active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorFollower.classList.remove('active');
        });
    });
}

// ========================================
// Scroll Progress Bar
// ========================================
function initScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        scrollProgress.style.width = scrollPercentage + '%';
    });
}

// ========================================
// Particle Background System
// ========================================
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrame;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = document.documentElement.scrollHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around screen
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(0, 169, 165, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    function createParticles() {
        const particleCount = Math.min(100, Math.floor(canvas.width / 20));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    createParticles();
    
    // Connect nearby particles
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = (1 - distance / 100) * 0.2;
                    ctx.strokeStyle = `rgba(0, 169, 165, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        animationFrame = requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

// ========================================
// Navigation
// ========================================
function initNavigation() {
    const nav = document.getElementById('mainNav');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    // Scroll behavior
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Close menu on link click
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
    
}


function smoothScrollTo(targetId) {
    const targetSection = document.querySelector(targetId);
    if (!targetSection) return;

    const offsetTop = targetSection.offsetTop - 80;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

function initAnchorHighlights() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            smoothScrollTo(targetId);
            setTimeout(() => {
                target.classList.add('section-highlight');
                setTimeout(() => target.classList.remove('section-highlight'), 1300);
            }, 450);
        });
    });
}

function initFlowExample() {
    const timeline = document.getElementById('flowTimeline');
    const switchButtons = document.querySelectorAll('.flow-switch-btn');
    if (!timeline || switchButtons.length === 0) return;

    const flowData = {
        email: {
            summary: 'Email Assistant: Záměr → workflow kroky → AI návrh → provedení → schválení → audit',
            caption: 'Ukázka třídění příchozí komunikace a návrhu odpovědi s kontrolovaným schválením.',
            steps: [
                ['fa-inbox', 'Inbound', 'Inbound (Email/Chat)', 'Příchozí zpráva nebo chat vytvoří ticket a přidá historii komunikace.', 'Trigger v n8n zachytí zprávu a připojí CRM kontext.'],
                ['fa-diagram-project', 'n8n', 'n8n orchestruje', 'Workflow řeší routing, review, retries a governance pravidla.', 'Workflow branch určí prioritu a připraví úkol pro AI vrstvu.'],
                ['fa-brain', 'OpenClaw', 'OpenClaw reasoning', 'AI klasifikuje intent, připraví draft a navrhne další bezpečné kroky.', 'Role main/web/spec/fast se volí podle typu požadavku.'],
                ['fa-plug', 'Adapter', 'Tools/Adapters', 'Adapter provede akci v cílovém systému (SMTP/IMAP, REST API, DB).', 'Integration layer volá jen nástroje povolené tool policy.'],
                ['fa-user-check', 'Human-in-the-loop', 'Human-in-the-loop (schválení)', 'Volitelná schvalovací brána dovolí schválení před finálním provedením.', 'Operátor může upravit draft, schválit nebo vrátit krok zpět.'],
                ['fa-clipboard-check', 'Audit', 'Action + review log', 'Systém odešle akci, uloží výsledek a uzavře loop s audit trail.', 'Každý krok je auditovatelný včetně vstupu, rozhodnutí i výstupu.']
            ]
        },
        research: {
            summary: 'Web Research: Záměr → workflow kroky → AI návrh → provedení → schválení → audit',
            caption: 'Ukázka sběru zdrojů, AI sumarizace a schválení analytikem před publikací.',
            steps: [
                ['fa-magnifying-glass', 'Inbound', 'Inbound (Email/Chat)', 'Přijde požadavek na výzkum trhu nebo monitoring konkurence.', 'Trigger vytvoří brief, termín a očekávaný formát výstupu.'],
                ['fa-diagram-project', 'n8n', 'n8n orchestruje', 'Workflow spustí sběr zdrojů, ohlídá priority a retry při chybách.', 'Routing oddělí veřejné zdroje od interních podkladů.'],
                ['fa-brain', 'OpenClaw', 'OpenClaw reasoning', 'AI hodnotí relevanci zdrojů, extrahuje fakta a připraví shrnutí.', 'AI layer drží konzistentní metodiku citací i confidence score.'],
                ['fa-globe', 'Adapter', 'Tools/Adapters', 'Adapter provede akci v cílovém systému (SMTP/IMAP, REST API, DB).', 'Integration layer sjednocuje výsledky ze search API a interní DB.'],
                ['fa-user-check', 'Human-in-the-loop', 'Human-in-the-loop (schválení)', 'Analytik schválí závěry a doplní obchodní doporučení.', 'Human-in-the-loop potvrzuje kvalitu a rozhoduje o publikaci.'],
                ['fa-clipboard-check', 'Audit', 'Action + review log', 'Report se odešle týmu/CRM a uloží se transparentní stopa kroků.', 'Audit log zachová zdroje, reasoning i finální rozhodnutí.']
            ]
        },
        erp: {
            summary: 'ERP/CRM: Záměr → workflow kroky → AI návrh → provedení → schválení → audit',
            caption: 'Ukázka řízené změny v ERP/CRM s validací, schválením a auditovatelným výstupem.',
            steps: [
                ['fa-file-import', 'Inbound', 'Inbound (Email/Chat)', 'Požadavek na změnu objednávky nebo zákaznického záznamu v ERP/CRM.', 'Workflow layer založí transakční task s identifikátorem požadavku.'],
                ['fa-diagram-project', 'n8n', 'n8n orchestruje', 'Workflow mapuje pole, kontroluje pravidla a řídí schvalovací větve.', 'Orchestrace vynutí validační kroky před zásahem do ERP/CRM.'],
                ['fa-brain', 'OpenClaw', 'OpenClaw reasoning', 'AI vyhodnotí intent, navrhne validní update a ohlídá tool policy limit.', 'AI layer srovná návrh s historií a zvýrazní rizikové změny.'],
                ['fa-database', 'Adapter', 'Tools/Adapters', 'Adapter provede akci v cílovém systému (SMTP/IMAP, REST API, DB).', 'Integration layer umožní výměnu adaptéru bez přepisu workflow.'],
                ['fa-user-check', 'Human-in-the-loop', 'Human-in-the-loop (schválení)', 'Citlivé změny čekají na schválení odpovědnou osobou.', 'Schvalovací krok zahrne SLA časovač a eskalaci při prodlení.'],
                ['fa-clipboard-check', 'Audit', 'Action + review log', 'Potvrzení odejde zpět do kanálu a audit log uzavře celý proces.', 'Log ukládá snapshot před/po změně i identitu schvalujícího.']
            ]
        }
    };

    const sequences = Array.from(timeline.querySelectorAll('.flow-sequence'));
    const tabCaption = document.getElementById('flowTabCaption');

    function renderFlow(usecase) {
        const target = timeline.querySelector(`.flow-sequence[data-usecase="${usecase}"]`);
        if (!target) return;

        target.innerHTML = flowData[usecase].steps
            .map(([icon, tag, title, text, detail], index) => `
                <article class="flow-step-card${index === 0 ? ' is-active' : ''}${index > 0 ? ' arrow-step' : ''}" tabindex="0">
                    <span class="flow-step-arrow" aria-hidden="true"><i class="fas fa-arrow-right"></i></span>
                    <span class="flow-step-icon"><i class="fas ${icon}"></i></span>
                    <span class="flow-step-tag">${tag}</span>
                    <h4>${title}</h4>
                    <p>${text}</p>
                    <div class="flow-step-detail">${detail}</div>
                </article>
            `)
            .join('');
    }

    Object.keys(flowData).forEach(renderFlow);

    function setActiveUsecase(usecase) {
        switchButtons.forEach(item => {
            const isCurrent = item.dataset.usecase === usecase;
            item.classList.toggle('active', isCurrent);
            item.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
        });

        sequences.forEach(sequence => {
            const visible = sequence.dataset.usecase === usecase;
            sequence.classList.toggle('active', visible);
            sequence.style.display = visible ? 'grid' : 'none';
        });

        const headline = document.querySelector('.flow-example h3');
        if (headline) {
            headline.textContent = `Flow Example: ${flowData[usecase].summary}`;
        }

        if (tabCaption) {
            tabCaption.textContent = flowData[usecase].caption;
        }

        timeline.classList.remove('is-switching');
        void timeline.offsetWidth;
        timeline.classList.add('is-switching');
    }

    switchButtons.forEach(btn => {
        btn.addEventListener('click', () => setActiveUsecase(btn.dataset.usecase));
    });

    setActiveUsecase('email');
}


function initAudienceToggle() {
    const buttons = document.querySelectorAll('[data-audience-filter]');
    const cards = document.querySelectorAll('.audience-card[data-audience]');
    if (!buttons.length || !cards.length) return;

    function applyFilter(filter) {
        buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.audienceFilter === filter));
        cards.forEach(card => {
            const show = filter === 'all' || card.dataset.audience === filter;
            card.style.display = show ? 'block' : 'none';
        });
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => applyFilter(btn.dataset.audienceFilter));
    });

    applyFilter('biz');
}

// ========================================
// Typing Effect
// ========================================
function initTypingEffect() {
    const headline = document.getElementById('typingHeadline');
    if (!headline) return;
    
    const text = "janAGI propojuje AI, lidi a firemní systémy do řízených workflow.";
    let index = 0;
    
    headline.innerHTML = '<span class="cursor"></span>';
    
    function typeWriter() {
        if (index < text.length) {
            headline.innerHTML = text.substring(0, index + 1) + '<span class="cursor"></span>';
            index++;
            setTimeout(typeWriter, 80);
        }
    }
    
    // Start typing after a delay
    setTimeout(typeWriter, 1000);
}

// ========================================
// Theme Toggle (Dark/Light Mode)
// ========================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
        
        // Add transition effect
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    });
}

// ========================================
// Interactive Timeline
// ========================================
function initTimelineInteraction() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('expanded');
        });
    });
}

// Standalone function for onclick
window.toggleTimelineItem = function(element) {
    element.classList.toggle('expanded');
};

// ========================================
// Animated Stat Counters
// ========================================
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let animated = false;
    
    function animateCounters() {
        if (animated || statNumbers.length === 0) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            if (Number.isNaN(target)) return;

            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCounter();
        });
        
        animated = true;
    }
    
    // Trigger animation when stats section is visible
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
}

// ========================================
// Form Handling with Validation & Confetti
// ========================================
function initFormHandling() {
    const heroForm = document.getElementById('heroEmailForm');
    const heroEmail = document.getElementById('heroEmail');

    if (heroEmail) {
        heroEmail.addEventListener('blur', () => validateInput(heroEmail));
    }

    if (heroForm) {
        heroForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailValue = heroEmail ? heroEmail.value.trim() : '';
            if (heroEmail) validateInput(heroEmail);

            const pilotSection = document.getElementById('janagi');
            const pilotEmail = document.getElementById('investorEmail');
            const pilotMessage = document.getElementById('investorMessage');

            if (pilotSection) {
                pilotSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            if (emailValue && pilotEmail && !pilotEmail.value) {
                pilotEmail.value = emailValue;
                validateInput(pilotEmail);
            }

            setTimeout(() => {
                if (pilotMessage) pilotMessage.focus();
            }, 550);
        });
    }

    document.querySelectorAll('.enhanced-form').forEach(form => {
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('blur', () => validateInput(input));
        });

        form.addEventListener('submit', () => {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (!submitBtn) return;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Odesílání...';
        });
    });
}

function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    
    let isValid = true;
    
    if (input.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    }
    
    if (isValid) {
        input.style.borderColor = 'var(--primary-color)';
    } else {
        input.style.borderColor = 'var(--accent-color)';
    }
}

// ========================================
// Confetti Animation
// ========================================
function triggerConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confetti = [];
    const confettiCount = 150;
    const colors = ['#00A9A5', '#4E5D94', '#FF6B6B', '#FFD93D', '#6BCB77'];
    
    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 10 + 5;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = 1;
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            
            if (this.y > canvas.height - 100) {
                this.opacity -= 0.02;
            }
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }
    
    for (let i = 0; i < confettiCount; i++) {
        confetti.push(new ConfettiPiece());
    }
    
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach((piece, index) => {
            piece.update();
            piece.draw();
            
            if (piece.opacity <= 0) {
                confetti.splice(index, 1);
            }
        });
        
        if (confetti.length > 0) {
            requestAnimationFrame(animateConfetti);
        }
    }
    
    animateConfetti();
}

// ========================================
// Modal System
// ========================================
function initModalSystem() {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    
    window.openModal = function(type) {
        const content = getModalContent(type);
        modalContent.innerHTML = content;
        modalOverlay.classList.add('active');
        document.body.classList.add('no-scroll');
    };
    
    window.closeModal = function() {
        modalOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
}

function getModalContent(type) {
    const contents = {
        blackbox: `
            <h2><i class="fas fa-eye-slash"></i> Transparentnost janAGI</h2>
            <p>Na rozdíl od tradičních AI systémů, které fungují jako "černé skříňky", janAGI vám poskytuje úplnou kontrolu a přehled:</p>
            <ul style="line-height: 2; margin: 1.5rem 0;">
                <li><i class="fas fa-check-circle" style="color: var(--primary-color);"></i> Vidíte každý krok plánování v reálném čase</li>
                <li><i class="fas fa-check-circle" style="color: var(--primary-color);"></i> Můžete zasáhnout a upravit plán kdykoliv</li>
                <li><i class="fas fa-check-circle" style="color: var(--primary-color);"></i> Kompletní audit log všech operací</li>
                <li><i class="fas fa-check-circle" style="color: var(--primary-color);"></i> Detailní vizualizace workflowů</li>
                <li><i class="fas fa-check-circle" style="color: var(--primary-color);"></i> Sledování výkonu jednotlivých agentů</li>
            </ul>
            <p>S janAGI máte vždy kontrolu nad tím, co se děje a proč.</p>
        `,
        reliability: `
            <h2><i class="fas fa-shield-alt"></i> Spolehlivost janAGI</h2>
            <p>Naše modulární architektura zajišťuje maximální spolehlivost:</p>
            <ul style="line-height: 2; margin: 1.5rem 0;">
                <li><i class="fas fa-check-circle" style="color: var(--primary-color);"></i> Automatické error handling a recovery</li>
                <li><i class="fas fa-check-circle" style="color: var(--primary-color);"></i> Fallback mechanismy pro kritické úlohy</li>
                <li><i class="fas fa-check-circle" style="color: var(--primary-color);"></i> Distribuované zpracování pro odolnost</li>
                <li><i class="fas fa-check-circle" style="color: var(--primary-color);"></i> Kontinuální monitoring a alerting</li>
                <li><i class="fas fa-check-circle" style="color: var(--primary-color);"></i> Testování na reálných scénářích</li>
            </ul>
            <p>janAGI je navržen tak, aby zvládl i ty nejnáročnější úlohy bez selhání.</p>
        `,
        'email-flow': `
            <h2><i class="fas fa-envelope-open-text"></i> Email Assistant: cesta procesu krok za krokem</h2>
            <p>Ukázka reálného průchodu jedním požadavkem přes všechny vrstvy: workflow layer, AI layer a integration layer.</p>
            <ol style="margin: 1.2rem 0 0 1.2rem; line-height: 1.9; color: var(--text-muted);">
                <li><strong>Inbound:</strong> e-mail přijde na sdílenou schránku a n8n trigger vytvoří ticket + načte kontext zákazníka.</li>
                <li><strong>Workflow layer (n8n):</strong> orchestrace vyhodnotí prioritu, SLA a přiřadí správnou větev procesu.</li>
                <li><strong>AI layer (OpenClaw):</strong> role <em>main/spec</em> připraví návrh odpovědi, role <em>fast</em> dělá quick-check.</li>
                <li><strong>Tool policy + adapter:</strong> volání SMTP/CRM API proběhne jen přes povolené konektory integration layeru.</li>
                <li><strong>Human-in-the-loop (schválení):</strong> operátor návrh schválí nebo upraví, teprve pak jde odpověď ven.</li>
                <li><strong>Audit:</strong> uloží se vstup, reasoning, výstup i identita schvalující osoby pro dohledatelnost.</li>
            </ol>
            <p style="margin-top: 1rem;">Výsledek: rychlejší odpovědi bez black-boxu a s jasnou odpovědností lidí i AI.</p>
        `,
        opensource: `
            <h2><i class="fas fa-code-branch"></i> Open-Source Freedom</h2>
            <p>janAGI je 100% open-source projekt s následujícími výhodami:</p>
            <ul style="line-height: 2; margin: 1.5rem 0;">
                <li><i class="fas fa-check-circle" style="color: var(--primary-color);"></i> Žádné vendor lock-in - plná kontrola</li>
                <li><i class="fas fa-check-circle" style="color: var(--primary-color);"></i> Možnost self-hostingu</li>
                <li><i class="fas fa-check-circle" style="color: var(--primary-color);"></i> Komunitní vývoj a podpora</li>
                <li><i class="fas fa-check-circle" style="color: var(--primary-color);"></i> Transparentní bezpečnost</li>
                <li><i class="fas fa-check-circle" style="color: var(--primary-color);"></i> Možnost customizace a rozšíření</li>
                <li><i class="fas fa-check-circle" style="color: var(--primary-color);"></i> Žádné skryté poplatky</li>
            </ul>
            <p>Připojte se k naší open-source komunitě a pomozte tvořit budoucnost AI orchestrace!</p>
        `
    };
    
    return contents[type] || '<p>Obsah nenalezen.</p>';
}

// ========================================
// SVG Tooltips for Architecture Diagram
// ========================================
function initSVGTooltips() {
    const archNodes = document.querySelectorAll('.arch-node');
    const tooltip = document.getElementById('svgTooltip');
    
    if (!tooltip) return;
    
    archNodes.forEach(node => {
        node.addEventListener('mouseenter', (e) => {
            const tooltipText = node.getAttribute('data-tooltip');
            if (tooltipText) {
                tooltip.textContent = tooltipText;
                tooltip.style.opacity = '1';
            }
        });
        
        node.addEventListener('mousemove', (e) => {
            tooltip.style.left = e.pageX + 15 + 'px';
            tooltip.style.top = e.pageY + 15 + 'px';
        });
        
        node.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
    });
}

// ========================================
// Ripple Effect on Buttons
// ========================================
document.addEventListener('click', function(e) {
    if (e.target.closest('.ripple-effect, .cta-button')) {
        const button = e.target.closest('.ripple-effect, .cta-button');
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Parallax Effect on Scroll
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const blobs = document.querySelectorAll('.blob');
    
    blobs.forEach((blob, index) => {
        const speed = 0.5 + (index * 0.1);
        blob.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========================================
// Console Easter Egg
// ========================================
console.log('%c🚀 janAGI - Budoucnost AI orchestrace', 
    'color: #00A9A5; font-size: 20px; font-weight: bold;'
);
console.log('%cZajímá vás, jak to funguje? Jsme open-source!', 
    'color: #4E5D94; font-size: 14px;'
);
console.log('%cGitHub: github.com/janagi (soon)', 
    'color: #888; font-size: 12px;'
);

// ========================================
// Performance Optimization
// ========================================
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// Export functions for external use
// ========================================
window.janAGI = {
    openModal,
    closeModal,
    toggleTimelineItem,
    triggerConfetti
};
