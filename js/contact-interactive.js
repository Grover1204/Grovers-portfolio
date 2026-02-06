// Interactive Contact Page - Accenture-Style Cursor Tracking Effect
(function() {
    'use strict';

    const interactiveContainer = document.querySelector('.interactive-text-container');
    const interactiveText = document.getElementById('interactiveText');
    const textWord = document.querySelector('.text-word');

    if (!interactiveContainer || !interactiveText || !textWord) return;

    // Convert text to individual character spans for distortion effect
    const text = textWord.textContent;
    textWord.innerHTML = text.split('').map((char, index) => 
        `<span class="char" style="display: inline-block;" data-index="${index}">${char}</span>`
    ).join('');

    const chars = textWord.querySelectorAll('.char');
    let mouseX = 0;
    let mouseY = 0;
    let containerRect = interactiveContainer.getBoundingClientRect();

    // Store original positions
    const charData = Array.from(chars).map(char => ({
        element: char,
        originalX: 0,
        originalY: 0,
        randomOffsetX: (Math.random() - 0.5) * 30,
        randomOffsetY: (Math.random() - 0.5) * 30,
        randomRotation: (Math.random() - 0.5) * 15
    }));

    // Update container dimensions on resize
    window.addEventListener('resize', () => {
        containerRect = interactiveContainer.getBoundingClientRect();
    });

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

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

        // Apply displacement to each character - VERTICAL LAYOUT
        charData.forEach((data, index) => {
            // Calculate individual character offset based on position in text (vertical)
            const charPosition = (index / chars.length) - 0.5;
            
            // Vertical displacement - characters spread left/right and up/down
            const displaceX = normalizedX * 100 + charPosition * 60 + data.randomOffsetX * Math.abs(normalizedX);
            const displaceY = normalizedY * 50 + charPosition * 20 + data.randomOffsetY * Math.abs(normalizedY);
            
            // Rotation effect
            const rotation = normalizedX * 20 + data.randomRotation;
            
            // Opacity/scale effect based on distance
            const scale = 1 + Math.abs(normalizedX) * 0.05;
            const opacity = 0.7 + Math.abs(normalizedX) * 0.3;

            // Apply transform to individual character
            data.element.style.transform = `
                translateX(${displaceX}px)
                translateY(${displaceY}px)
                rotate(${rotation}deg)
                scale(${scale})
            `;
            
            data.element.style.opacity = opacity;
        });
    }

    // Reset effect when mouse leaves container
    interactiveContainer.addEventListener('mouseleave', () => {
        charData.forEach(data => {
            data.element.style.transform = 'translateX(0) translateY(0) rotate(0deg) scale(1)';
            data.element.style.opacity = '1';
        });
    });

    // Add smooth transition
    chars.forEach(char => {
        char.style.transition = 'transform 0.06s ease-out, opacity 0.06s ease-out';
    });

})();
