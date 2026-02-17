// =============================================
// MAIN JAVASCRIPT - Interactive Features
// =============================================

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Navbar background on scroll and Active Link Highlighting
// Optimized with requestAnimationFrame for performance

let isScrolling = false;
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

// Cache section positions (update on resize if needed)
let sectionPositions = [];

function updateSectionPositions() {
    sectionPositions = Array.from(sections).map(section => ({
        id: section.getAttribute('id'),
        top: section.offsetTop - 100,
        bottom: section.offsetTop + section.offsetHeight - 100
    }));
}

// Initial calculation
updateSectionPositions();
window.addEventListener('resize', updateSectionPositions);

function handleScroll() {
    const scrollY = window.scrollY;

    // Navbar background logic
    if (scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.99)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.9)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.99)'; // Keep consistent background
        navbar.style.boxShadow = 'none';
    }

    // Active link highlighting logic
    sectionPositions.forEach(pos => {
        if (scrollY >= pos.top && scrollY < pos.bottom) {
            navLinks.forEach(link => {
                link.style.color = 'var(--text-secondary)';
                if (link.getAttribute('href') === `#${pos.id}`) {
                    link.style.color = 'var(--highlight-color)';
                }
            });
        }
    });

    isScrolling = false;
}

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(handleScroll);
        isScrolling = true;
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill tags and project cards
document.querySelectorAll('.skill-tag, .project-card, .skill-category').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    observer.observe(element);
});

// Keyboard Navigation Enhancement
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Log initialization
// Log initialization
console.log('✨ Portfolio website initialized successfully!');

// =============================================
// DYNAMIC CONTENT RENDERING
// =============================================

function renderSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    if (!skillsGrid || !window.portfolioConfig) return;

    const skills = window.portfolioConfig.skills;
    let html = '';

    for (const [category, skillList] of Object.entries(skills)) {
        html += `
            <div class="skill-category">
                <h3>${category}</h3>
                <div class="skills-list">
                    ${skillList.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        `;
    }

    skillsGrid.innerHTML = html;
}

function applyConfig() {
    if (!window.portfolioConfig) return;
    const config = window.portfolioConfig;

    // About Text
    const aboutTextContainer = document.getElementById('about-text');
    if (aboutTextContainer) {
        aboutTextContainer.innerHTML = `
            <p>${config.aboutText.paragraph1}</p>
            <p>${config.aboutText.paragraph2}</p>
        `;
    }

    // Stats
    const statsContainer = document.getElementById('stats');
    if (statsContainer) {
        statsContainer.innerHTML = `
            <div class="stat">
                <span class="stat-number">${config.stats.projects}</span>
                <span class="stat-label">Projects</span>
            </div>
             <div class="stat">
                <span class="stat-number">${config.stats.languages}</span>
                <span class="stat-label">Languages</span>
            </div>
             <div class="stat">
                <span class="stat-number">${config.stats.passion}</span>
                <span class="stat-label">Passion</span>
            </div>
        `;
    }
}

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    applyConfig();
    renderSkills();
});

