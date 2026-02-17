// =============================================
// CONFIGURATION FILE - Easy Customization
// =============================================

// This file makes it easy to customize your portfolio without editing multiple files

window.portfolioConfig = {
    // ===== Personal Information =====
    personal: {
        name: 'Rahul Modugu',
        title: 'Developer & AI Enthusiast',
        description: 'Building intelligent solutions with Python, JavaScript, and cutting-edge AI technologies. Exploring machine learning, backend systems, and full-stack development.',
        avatar: 'https://avatars.githubusercontent.com/u/97908707?s=200&v=4'
    },

    // ===== Social Links =====
    socialLinks: {
        github: 'https://github.com/Grover1204',
        linkedin: 'https://www.linkedin.com/in/rahul-modugu-a707051b1/',
        email: 'contact@example.com', // Change this to your email
        twitter: null, // Add URL or leave null
        instagram: null // Add URL or leave null
    },

    // ===== Color Scheme =====
    // Update these to customize the entire site appearance
    colors: {
        primary: '#1a1a2e',
        secondary: '#16213e',
        accent: '#0f3460',
        highlight: '#DC143C',      // Main accent color - change this for different theme
        textPrimary: '#ffffff',
        textSecondary: '#b0b0b0',
        bgDark: '#0f0f1e',
        bgLight: '#16213e',
        border: '#2a2a4e'
    },

    // ===== About Section Stats =====
    stats: {
        projects: '19+',
        languages: '5+',
        passion: '∞'
    },

    // ===== Navigation Menu Items =====
    navItems: [
        { label: 'Home', href: '#hero' },
        { label: 'About', href: '#about' },
        { label: 'Skills', href: '#skills' },
        { label: 'Projects', href: '#projects' },
        { label: 'Contact', href: '#contact' }
    ],

    // ===== Skills by Category =====
    skills: {
        'Backend & Scripting': [
            'Python',
            'REST API',
            'Backend Development'
        ],
        'Frontend & Mobile': [
            'JavaScript',
            'React',
            'Flutter',
            'Dart'
        ],
        'Machine Learning & AI': [
            'Deep Learning',
            'Neural Networks',
            'Computer Vision',
            'TensorFlow'
        ],
        'Other Technologies': [
            'Firebase',
            'C++',
            'Objective-C',
            'Jupyter Notebooks'
        ]
    },

    // ===== About Text =====
    aboutText: {
        paragraph1: 'I\'m passionate about solving real-world problems through code and machine learning. With experience in backend development, AI/ML, and full-stack applications, I love creating solutions that make a difference.',
        paragraph2: 'My journey spans multiple domains - from facial emotion recognition and vehicle detection to stock price prediction and mobile app development. I believe in continuous learning and adapting to new technologies.'
    },

    // ===== CTA Button Labels =====
    cta: {
        primary: 'View My Work',
        secondary: 'Get in Touch'
    },

    // ===== Section Titles =====
    titles: {
        about: 'About Me',
        skills: 'Skills & Technologies',
        projects: 'Featured Projects',
        contact: 'Let\'s Connect'
    },

    // ===== Footer =====
    footer: {
        year: new Date().getFullYear(),
        copyright: 'Rahul Modugu'
    },

    // ===== Theme Settings =====
    theme: {
        darkMode: true,
        animationsEnabled: true,
        useParallax: true
    },

    // ===== API Tokens =====
    // WARNING: In a real production app, never expose tokens in client-side code.
    // Use a backend proxy instead. For this portfolio demo, it allows direct access.
    tokens: {
        huggingFace: null // Removed for security
    },

    // ===== Firebase Configuration =====
    // REMOVED as per user request
    firebase: null

};

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioConfig;
}

// Make it globally available
window.portfolioConfig = portfolioConfig;

console.log('⚙️ Portfolio configuration loaded:', portfolioConfig);
