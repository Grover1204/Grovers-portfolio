// =============================================
// PROJECTS DATA & RENDERING
// =============================================

// projectsData is now loaded from js/projects-data.js

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
                <a href="${project.link}" target="${project.isLiveDemo ? '_self' : '_blank'}" class="project-link">
                    ${project.isLiveDemo ? 'Try It Live →' : 'View on GitHub →'}
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
                <a href="${project.link}" target="${project.isLiveDemo ? '_self' : '_blank'}" class="project-link">
                    ${project.isLiveDemo ? 'Try It Live →' : 'View on GitHub →'}
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
