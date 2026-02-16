# CUSTOMIZATION GUIDE

This guide will help you customize your portfolio website to match your personal brand and preferences.

## 📋 Quick Start Customization

### Step 1: Update Personal Information

**File: `config.js` (Lines 6-12)**

```javascript
personal: {
    name: 'Your Name',
    title: 'Your Title',
    description: 'Your description',
    avatar: 'URL to your avatar'
}
```

And update in **`index.html`**:
- Line 218: Change GitHub URL
- Line 219: Change LinkedIn URL  
- Line 220: Update email address

### Step 2: Change Color Scheme

**File: `config.js` (Lines 15-25)**

Change the `highlight` color for a completely different theme:

```javascript
colors: {
    highlight: '#e94560',  // Change this hex color
    // ... other colors will be derived automatically
}
```

Popular color suggestions:
- **Blue**: `#0066ff` or `#3b82f6`
- **Green**: `#00d084` or `#10b981`
- **Purple**: `#a855f7` or `#8b5cf6`
- **Cyan**: `#06b6d4` or `#0891b2`
- **Orange**: `#ff6b35` or `#f97316`

### Step 3: Add Your Projects

**File: `js/projects.js` (Around Line 8)**

Add a new project to the `projectsData` array:

```javascript
{
    icon: '🚀',                           // Choose an emoji
    title: 'Your Project Name',           // Project title
    description: 'What this project does...',  // Description
    technologies: ['Tech1', 'Tech2'],     // Array of technologies used
    link: 'https://github.com/your-project'   // GitHub link
}
```

### Step 4: Update Skills

**File: `config.js` (Lines 55-73)**

Edit the `skills` object:

```javascript
skills: {
    'Your Category': [
        'Skill 1',
        'Skill 2',
        'Skill 3'
    ]
}
```

Or in **`index.html`** (Lines 152-176) for more control over styling.

## 🎨 Advanced Customization

### Change Font Family

**File: `css/styles.css` (Line 20)**

```css
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', ...;
}
```

Replace with your preferred font:
```css
font-family: 'Georgia', serif;
/* or */
font-family: 'Courier New', monospace;
```

### Add Google Fonts

1. Go to https://fonts.google.com
2. Select your font
3. Copy the `<link>` tag
4. Add to `index.html` head section (after line 5)
5. Update CSS font-family

Example:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

### Adjust Hero Section Height

**File: `css/styles.css` (Line 181)**

```css
.hero {
    min-height: calc(100vh - 80px);  /* Change 100vh to adjust height */
}
```

### Modify Button Styles

**File: `css/styles.css` (Lines 213-226)**

```css
.btn {
    padding: 1rem 2rem;           /* Change for larger/smaller buttons */
    border-radius: 8px;           /* Change for rounder/sharper corners */
    /* Other properties */
}
```

### Change Animation Speed

**File: `css/animations.css`**

Look for animation definitions like:

```css
animation: pulse 2s infinite;    /* Change '2s' to adjust speed */
```

Lower = faster (0.5s), Higher = slower (3s, 4s, etc.)

### Add Background Images

**File: `css/styles.css` (Around Line 188)**

```css
.hero {
    background: url('your-image.jpg');
    background-size: cover;
    background-position: center;
}
```

### Create Custom Color Palette

**File: `css/styles.css` (Lines 7-18)**

Replace all colors at once:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --accent-color: #your-color;
    --highlight-color: #your-color;
    --text-primary: #ffffff;
    --text-secondary: #your-color;
    --bg-dark: #your-color;
    --bg-light: #your-color;
    --border-color: #your-color;
}
```

## 📱 Mobile-Specific Adjustments

### Change Mobile Menu Breakpoint

**File: `css/responsive.css` (Line 20)**

```css
@media (max-width: 768px) {  /* Change 768 to your preferred breakpoint */
```

### Adjust Mobile Font Sizes

**File: `css/responsive.css` (Lines 59-61)**

```css
.hero-text h1 {
    font-size: 2.5rem;  /* Change for mobile heading size */
}
```

## 🔗 Add Social Links

**File: `index.html` (Lines 214-220)**

Add new social links:

```html
<a href="https://twitter.com/your-handle" class="contact-link" target="_blank">Twitter</a>
<a href="https://instagram.com/your-handle" class="contact-link" target="_blank">Instagram</a>
```

Or update **`config.js`** (Lines 28-34):

```javascript
socialLinks: {
    github: 'your-url',
    linkedin: 'your-url',
    twitter: 'your-url',
    instagram: 'your-url',
    email: 'your-email'
}
```

## 🌟 Add New Sections

### Add a Blog Section

Create a new section in **`index.html`** after the projects section:

```html
<section class="blog" id="blog">
    <div class="container">
        <h2 class="section-title">Latest Articles</h2>
        <!-- Add blog posts here -->
    </div>
</section>
```

Add styling in **`css/styles.css`**:

```css
.blog {
    padding: 6rem 0;
    background: var(--primary-color);
}
```

### Add Testimonials Section

```html
<section class="testimonials" id="testimonials">
    <div class="container">
        <h2 class="section-title">Testimonials</h2>
        <div class="testimonials-grid">
            <div class="testimonial-card">
                <p class="testimonial-text">"Great work!"</p>
                <p class="testimonial-author">- Person Name</p>
            </div>
        </div>
    </div>
</section>
```

## 🛠️ Performance Tips

1. **Optimize Images**: Compress images before adding
2. **Use Modern Formats**: Use WebP format when possible
3. **Minify CSS/JS**: Remove unnecessary code for production
4. **Lazy Loading**: Add `loading="lazy"` to images
5. **Remove Unused Code**: Delete unused CSS and JavaScript

## 📝 SEO Optimization

### Update Meta Tags

**File: `index.html` (Lines 4-5)**

```html
<meta name="description" content="Your portfolio description">
<meta name="keywords" content="keyword1, keyword2, keyword3">
```

### Add Open Graph Tags

Add after line 6 in `index.html`:

```html
<meta property="og:title" content="Your Name - Portfolio">
<meta property="og:description" content="Your description">
<meta property="og:image" content="URL to your preview image">
```

## 🎯 Testing Checklist

- [ ] All links work correctly
- [ ] Website is responsive on mobile
- [ ] All social links point to correct profiles
- [ ] Email link works
- [ ] Navigation menu works on mobile
- [ ] All project links open in new tabs
- [ ] No broken images
- [ ] Animations are smooth
- [ ] Page loads quickly
- [ ] Text is readable on all devices

## 🚀 Deployment

### GitHub Pages (Free)

1. Create a repository named `username.github.io`
2. Push your portfolio files
3. Your site will be live at `https://username.github.io`

### Netlify (Free)

1. Go to https://netlify.com
2. Click "Deploy sites"
3. Drag and drop your folder
4. Your site is live instantly

### Custom Domain

1. Buy a domain from GoDaddy, Namecheap, etc.
2. Point DNS to your hosting (GitHub Pages or Netlify)
3. Update DNS settings according to platform instructions

## 💡 Tips & Tricks

- Use emoji in project icons for visual appeal
- Keep descriptions concise and impactful
- Update projects regularly
- Add new skills as you learn them
- Use consistent spacing and alignment
- Test on different browsers and devices
- Get feedback from others
- Keep your portfolio up-to-date

## 🐛 Troubleshooting

### Website not loading styles

- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Check file paths are correct
- Ensure CSS files are in `css/` folder

### Mobile menu not working

- Check `js/main.js` is linked correctly
- Open browser console for errors (F12)
- Verify JavaScript is enabled

### Images not showing

- Check image file paths
- Ensure images are in the correct folder
- Verify file names match exactly (case-sensitive)

---

**Need Help?** Open `index.html`, `css/styles.css`, and `js/projects.js` - most customizations are straightforward!
