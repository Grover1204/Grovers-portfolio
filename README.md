# Rahul Modugu - Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. Inspired by the Antigravity Google design with a dark, professional aesthetic.

## 🔗 Live Demo
[**View Live Project**](https://Grover1204.github.io/Grovers-portfolio/)


## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── css/
│   ├── styles.css         # Main styles and theme
│   └── responsive.css     # Media queries for responsive design
├── js/
│   ├── main.js            # Interactive features and functionality
│   └── projects.js        # Projects data and rendering
└── README.md              # This file
```

## 🚀 Features

- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Interactive Navigation**: Smooth scrolling and mobile hamburger menu
- **Dark Theme**: Modern dark design with accent colors
- **Project Showcase**: Dynamic project cards with GitHub links
- **Smooth Animations**: CSS animations and transitions
- **SEO Friendly**: Semantic HTML structure
- **No Database Required**: Pure frontend solution with static data
- **Easy to Customize**: Modular file structure for easy modifications

## 🎨 Customization Guide

### Update Personal Information

**Edit `index.html`:**
- Update the hero section heading and description (lines 41-45)
- Modify the about section content (lines 74-77)
- Update contact links to your actual email (line 220)

### Change Colors and Theme

**Edit `css/styles.css`:**
Look at the `:root` CSS variables section (lines 7-18):

```css
:root {
    --primary-color: #1a1a2e;
    --secondary-color: #16213e;
    --accent-color: #0f3460;
    --highlight-color: #e94560;      /* Main accent color */
    --text-primary: #ffffff;
    --text-secondary: #b0b0b0;
    --bg-dark: #0f0f1e;
    --bg-light: #16213e;
    --border-color: #2a2a4e;
}
```

Simply change the hex colors to your preferred palette.

### Add or Modify Projects

**Edit `js/projects.js`:**

```javascript
const projectsData = [
    {
        icon: '🤖',                    // Change emoji
        title: 'Project Name',         // Update title
        description: 'Project description here...',
        technologies: ['Tech1', 'Tech2', 'Tech3'],
        link: 'https://github.com/your-link'
    },
    // Add more projects...
];
```

### Update Skills

**Edit `index.html` (lines 152-176):**

Modify the skill categories and tags:

```html
<div class="skill-category">
    <h3>Your Category</h3>
    <div class="skills-list">
        <span class="skill-tag">Skill 1</span>
        <span class="skill-tag">Skill 2</span>
    </div>
</div>
```

### Modify Navigation Links

**Edit `index.html` (lines 17-23):**

```html
<ul class="nav-menu" id="navMenu">
    <li><a href="#hero">Your Link</a></li>
    <!-- Add or modify navigation items -->
</ul>
```

## 📱 Responsive Breakpoints

The website is optimized for:

- **Desktop**: 1025px and above
- **Tablet**: 768px to 1024px
- **Mobile**: 480px to 768px
- **Small Mobile**: Below 480px
- **Landscape**: Special adjustments for landscape orientation

## 🔧 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations and transitions
- **JavaScript (ES6)**: Vanilla JavaScript for interactivity
- **No Dependencies**: Pure frontend, no external libraries needed

## 🌟 Key Features Explained

### Mobile Menu Toggle
The hamburger menu automatically appears on mobile devices and collapses/expands with click.

### Smooth Scrolling
Navigation links smoothly scroll to sections. Active section is highlighted in the navbar.

### Project Search (Optional)
Use `window.searchProjects('keyword')` in the browser console to filter projects.

### Intersection Observer
Elements fade in as they come into view for a polished scrolling experience.

### Parallax Effect
Hero section has a subtle parallax effect on scroll.

## 🚀 Quick Start in 5 Minutes

1.  **Open in Browser**: Simply double-click `index.html`. No server needed!
2.  **Update Email**: Edit `index.html` line 220 to your actual email.
3.  **Personalize**: Edit `config.js` to change your name, title, and social links.
4.  **Add Projects**: Edit `js/projects.js` to showcase your own work.

## 🎨 Customization Guide

### Changing Colors
Edit `config.js` (lines 27-37) to change the entire theme.
```javascript
colors: {
    highlight: '#e94560',  // Change this hex color for main accent
    primary: '#1a1a2e',    // Background color
}
```

### Updating Skills
Edit `config.js` or `index.html` (lines 152-176) to list your specific technologies.

### Adding Social Links
Update the `socialLinks` object in `config.js`:
```javascript
socialLinks: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourprofile',
    email: 'you@example.com'
}
```

## 📁 File Structure
- **index.html**: Main structure and content.
- **config.js**: Easy configuration settings.
- **css/**: Styles (`styles.css` for main, `responsive.css` for mobile).
- **js/**: Logic (`main.js` for interactivity, `projects.js` for data).

## 📄 License
This portfolio template is free to use and modify for personal projects.
