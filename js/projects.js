// =============================================
// PROJECTS DATA & RENDERING
// =============================================

const projectsData = [
    {
        icon: '🤖',
        title: 'REST API',
        description: 'Backend application built with Python. Working on robust REST API development with scalable architecture.',
        technologies: ['Python', 'REST API', 'Backend'],
        link: 'https://github.com/Grover1204/restapi'
    },
    {
        icon: '🧠',
        title: 'AI Coding Agent',
        description: 'Claude Code style AI agent built from scratch using Python. Implements intelligent code generation and assistance.',
        technologies: ['Python', 'AI', 'Claude'],
        link: 'https://github.com/Grover1204/ai-coding-agent'
    },
    {
        icon: '🤖',
        title: 'GPT4All',
        description: 'Run Local LLMs on Any Device. Open-source and available for commercial use with C++ optimization.',
        technologies: ['C++', 'LLMs', 'Open Source'],
        link: 'https://github.com/Grover1204/gpt4all'
    },
    {
        icon: '😊',
        title: 'Facial Emotion Recognition',
        description: 'ML model to identify facial expressions using deep learning techniques. Classifies emotions from facial features.',
        technologies: ['Deep Learning', 'Computer Vision', 'TensorFlow'],
        link: 'https://github.com/Grover1204/Facial-Emotion-Recognition'
    },
    {
        icon: '🚗',
        title: 'Vehicle Detection CNN',
        description: 'Machine learning model for detecting vehicles in images using Convolutional Neural Networks for multiple applications.',
        technologies: ['CNN', 'Computer Vision', 'Python'],
        link: 'https://github.com/Grover1204/Vehicle-Detection-using-convolutional-neural-network'
    },
    {
        icon: '🔥',
        title: 'Wild Fire Prediction',
        description: 'Predictive model for forecasting wildfire occurrence using machine learning algorithms and environmental data.',
        technologies: ['ML', 'Prediction', 'Data Analysis'],
        link: 'https://github.com/Grover1204/Wild-Fire-Prediction'
    },
    {
        icon: '👁️',
        title: 'Eye Gaze Estimation',
        description: 'RNN-based mechanism for predicting eye gaze using Recurrent Neural Networks for advanced human-computer interaction.',
        technologies: ['RNN', 'Deep Learning', 'Computer Vision'],
        link: 'https://github.com/Grover1204/Eye-Gaze-Estimation'
    },
    {
        icon: '📊',
        title: 'HR Analytics',
        description: 'Employee analytics dashboard providing insights into HR metrics, performance, and organizational patterns.',
        technologies: ['Data Analysis', 'Analytics', 'Python'],
        link: 'https://github.com/Grover1204/HR-Analytics-Employee'
    },
    {
        icon: '📈',
        title: 'Stock Price Prediction',
        description: 'Predict stock prices of mutual funds and ETFs using machine learning and financial data analysis.',
        technologies: ['ML', 'Finance', 'Time Series'],
        link: 'https://github.com/Grover1204/Stock-price-prediction'
    },
    {
        icon: '🔢',
        title: 'Handwritten Math Symbols',
        description: 'ML model that recognizes and interprets handwritten mathematical symbols for digital conversion.',
        technologies: ['Deep Learning', 'Image Recognition', 'Python'],
        link: 'https://github.com/Grover1204/HandWritten-Math-Symbols'
    },
    {
        icon: '💬',
        title: 'WhatsApp Clone',
        description: 'Full-stack chat application works on both Android and web without Firebase dependency.',
        technologies: ['JavaScript', 'Mobile', 'Web'],
        link: 'https://github.com/Grover1204/whatsapp_clone'
    },
    {
        icon: '📱',
        title: 'Instagram Clone',
        description: 'Social media platform clone built with Flutter. Features real-time updates and user interactions.',
        technologies: ['Flutter', 'Dart', 'Mobile'],
        link: 'https://github.com/Grover1204/Instagram-clone'
    }
];

// Function to render projects
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (!projectsGrid) return;

    projectsGrid.innerHTML = projectsData.map((project, index) => `
        <div class="project-card" style="animation-delay: ${index * 0.1}s;">
            <div class="project-header">
                <div class="project-icon">${project.icon}</div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
            </div>
            <div class="project-footer">
                <div class="project-tech">
                    ${project.technologies.map(tech => 
                        `<span class="project-tech-tag">${tech}</span>`
                    ).join('')}
                </div>
                <a href="${project.link}" target="_blank" class="project-link">
                    View on GitHub →
                </a>
            </div>
        </div>
    `).join('');

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .project-card {
            animation: slideUp 0.6s ease-out forwards;
            opacity: 0;
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Render projects when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderProjects);
} else {
    renderProjects();
}

// Filter/Search functionality (optional enhancement)
function searchProjects(query) {
    const projectsGrid = document.getElementById('projectsGrid');
    const filtered = projectsData.filter(project => 
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(query.toLowerCase()))
    );

    projectsGrid.innerHTML = filtered.map((project, index) => `
        <div class="project-card" style="animation-delay: ${index * 0.1}s;">
            <div class="project-header">
                <div class="project-icon">${project.icon}</div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
            </div>
            <div class="project-footer">
                <div class="project-tech">
                    ${project.technologies.map(tech => 
                        `<span class="project-tech-tag">${tech}</span>`
                    ).join('')}
                </div>
                <a href="${project.link}" target="_blank" class="project-link">
                    View on GitHub →
                </a>
            </div>
        </div>
    `).join('');

    if (filtered.length === 0) {
        projectsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No projects found</p>';
    }
}

// Export search function for external use
window.searchProjects = searchProjects;

console.log('📦 Projects loaded successfully!');
