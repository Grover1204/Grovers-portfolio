// Interactive Contact Page - Cursor Tracking Effect
(function() {
    'use strict';

    const interactiveContainer = document.querySelector('.interactive-text-container');
    const interactiveText = document.getElementById('interactiveText');
    const textWord = document.querySelector('.text-word');

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

        // Normalize distances (-1 to 1)
        const normalizedX = distX / (containerRect.width / 2);
        const normalizedY = distY / (containerRect.height / 2);

        // Calculate angles for 3D rotation with stronger effect
        const rotateY = normalizedX * 25;
        const rotateX = -normalizedY * 25;

        // Calculate skew for more dramatic distortion
        const skewX = normalizedX * 8;
        const skewY = normalizedY * 8;

        // Scale based on distance
        const scale = 1 + Math.abs(normalizedX) * 0.1;

        // Apply 3D transform with smooth animation
        interactiveText.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            skewX(${skewX}deg)
            skewY(${skewY}deg)
            scale(${scale})
        `;

        // Update letter spacing based on horizontal position
        const letterSpacing = 0.05 + Math.abs(normalizedX) * 0.12;
        interactiveText.style.letterSpacing = `${letterSpacing}em`;

        // Update gradient based on cursor position
        const hueRotation = (normalizedX + 1) * 60;
        interactiveText.style.filter = `
            hue-rotate(${hueRotation}deg)
            drop-shadow(0 0 40px rgba(233, 69, 96, 0.8))
        `;
    }

    // Reset effect when mouse leaves container
    interactiveContainer.addEventListener('mouseleave', () => {
        interactiveText.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) skewX(0deg) skewY(0deg) scale(1)';
        interactiveText.style.letterSpacing = '0.05em';
        interactiveText.style.filter = 'drop-shadow(0 0 30px rgba(233, 69, 96, 0.6))';
    });

    // Add smooth transition
    interactiveText.style.transition = 'transform 0.08s ease-out, letter-spacing 0.08s ease-out, filter 0.08s ease-out';

    // Optional: Create occasional text distortion for dynamic effect
    function createDistortionEffect() {
        if (!textWord || Math.random() < 0.95) return;

        const originalText = textWord.textContent;
        const distortionChars = ['𝐆𝐫𝐨𝐯𝐞𝐫', '𝑮𝒓𝒐𝒗𝒆𝒓', '𝑮𝑹𝑶𝑽𝑬𝑹', 'GROVER'];

        textWord.textContent = distortionChars[Math.floor(Math.random() * distortionChars.length)];

        setTimeout(() => {
            textWord.textContent = originalText;
        }, 150);
    }

    // Create distortion effect occasionally for visual interest
    setInterval(createDistortionEffect, 3000);

})();
