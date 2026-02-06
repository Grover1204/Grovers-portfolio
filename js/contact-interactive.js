// Interactive Contact Page - Cursor Tracking Effect
(function() {
    'use strict';

    const interactiveContainer = document.querySelector('.interactive-text-container');
    const interactiveText = document.getElementById('interactiveText');

    if (!interactiveContainer || !interactiveText) return;

    let mouseX = 0;
    let mouseY = 0;
    let containerRect = interactiveContainer.getBoundingClientRect();

    // Update container dimensions on resize
    window.addEventListener('resize', () => {
        containerRect = interactiveContainer.getBoundingClientRect();
    });

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Check if cursor is over the interactive container
        if (isMouseInContainer(mouseX, mouseY)) {
            updateTextEffect(mouseX, mouseY);
        }
    });

    // Handle touch for mobile
    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        mouseX = touch.clientX;
        mouseY = touch.clientY;

        if (isMouseInContainer(mouseX, mouseY)) {
            updateTextEffect(mouseX, mouseY);
        }
    });

    function isMouseInContainer(x, y) {
        return (
            x >= containerRect.left &&
            x <= containerRect.right &&
            y >= containerRect.top &&
            y <= containerRect.bottom
        );
    }

    function updateTextEffect(x, y) {
        // Calculate position relative to container center
        const centerX = containerRect.left + containerRect.width / 2;
        const centerY = containerRect.top + containerRect.height / 2;

        const distX = x - centerX;
        const distY = y - centerY;

        // Calculate angles for 3D rotation
        const rotateY = (distX / containerRect.width) * 20;
        const rotateX = -(distY / containerRect.height) * 20;

        // Calculate skew for distortion effect
        const skewX = (distX / containerRect.width) * 5;
        const skewY = (distY / containerRect.height) * 5;

        // Apply 3D transform
        interactiveText.style.transform = `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            skewX(${skewX}deg)
            skewY(${skewY}deg)
            scale(${1 + Math.abs(distX) / containerRect.width * 0.05})
        `;

        // Update letter spacing based on horizontal position
        const letterSpacing = 0.05 + (Math.abs(distX) / containerRect.width) * 0.08;
        interactiveText.style.letterSpacing = `${letterSpacing}em`;
    }

    // Reset effect when mouse leaves container
    interactiveContainer.addEventListener('mouseleave', () => {
        interactiveText.style.transform = 'rotateX(0deg) rotateY(0deg) skewX(0deg) skewY(0deg) scale(1)';
        interactiveText.style.letterSpacing = '0.05em';
    });

    // Add smooth transition
    interactiveText.style.transition = 'transform 0.1s ease-out, letter-spacing 0.1s ease-out';

    // Create glitch effect occasionally
    function createGlitchEffect() {
        const textWord = interactiveText.querySelector('.text-word');
        if (!textWord) return;

        const originalText = textWord.textContent;
        const glitchChars = '゛ㄣ︴ᴛ︿ᴺ︶';

        // Randomly apply glitch
        if (Math.random() < 0.1) {
            const randomIndex = Math.floor(Math.random() * originalText.length);
            const glitchChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
            
            const chars = originalText.split('');
            chars[randomIndex] = glitchChar;
            
            textWord.textContent = chars.join('');
            
            // Restore after short delay
            setTimeout(() => {
                textWord.textContent = originalText;
            }, 50);
        }
    }

    // Optional: Create glitch effect periodically
    setInterval(createGlitchEffect, 2000);

})();
