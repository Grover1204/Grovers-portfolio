// Accenture-Style Carousel Effect with Vertical Grover Text
(function() {
    'use strict';

    const carouselWrapper = document.getElementById('carouselWrapper');
    const textLines = document.querySelectorAll('.text-line');

    if (!carouselWrapper || textLines.length === 0) return;

    // Convert each text line to individual characters
    textLines.forEach(line => {
        const textWord = line.querySelector('.text-word');
        if (textWord) {
            const text = textWord.textContent;
            textWord.innerHTML = text.split('').map((char, index) => 
                `<span class="char" data-index="${index}">${char}</span>`
            ).join('');
        }
    });

    let mouseX = 0;
    let containerRect = carouselWrapper.getBoundingClientRect();

    // Update container dimensions on resize
    window.addEventListener('resize', () => {
        containerRect = carouselWrapper.getBoundingClientRect();
    });

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;

        if (isMouseInContainer(mouseX, e.clientY)) {
            updateCarouselEffect(mouseX);
        }
    });

    // Handle touch for mobile
    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        mouseX = touch.clientX;

        if (isMouseInContainer(mouseX, touch.clientY)) {
            updateCarouselEffect(mouseX);
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

    function updateCarouselEffect(x) {
        const centerX = containerRect.left + containerRect.width / 2;
        const distX = x - centerX;
        const normalizedX = distX / (containerRect.width / 2);

        // Update each text line with carousel offset
        textLines.forEach((line, lineIndex) => {
            // Calculate offset based on cursor position
            // Left movement: slide lines to the right
            // Right movement: slide lines to the left
            const offset = normalizedX * 150; // Maximum pixel displacement

            // Apply transform to each line
            const currentTransform = line.style.transform;
            
            // Extract current scale and opacity values
            const scales = getScaleValues(lineIndex);
            const translateX = scales.translateX + offset;

            line.style.transform = `scaleX(${scales.scaleX}) scaleY(${scales.scaleY}) translateX(${translateX}px)`;

            // Optional: Vary opacity with movement
            const opacityBoost = Math.abs(normalizedX) * 0.1;
            line.style.opacity = (scales.opacity + opacityBoost).toString();
        });
    }

    function getScaleValues(index) {
        // Define scale values for each line (matching the CSS)
        const scales = [
            { scaleX: 0.3, scaleY: 0.4, translateX: -280, opacity: 0.2 },
            { scaleX: 0.5, scaleY: 0.65, translateX: -180, opacity: 0.4 },
            { scaleX: 0.75, scaleY: 0.85, translateX: -90, opacity: 0.65 },
            { scaleX: 1, scaleY: 1, translateX: 0, opacity: 1 },
            { scaleX: 0.75, scaleY: 0.85, translateX: 90, opacity: 0.65 },
            { scaleX: 0.5, scaleY: 0.65, translateX: 180, opacity: 0.4 },
            { scaleX: 0.3, scaleY: 0.4, translateX: 280, opacity: 0.2 }
        ];

        return scales[index] || scales[3];
    }

    // Reset effect when mouse leaves container
    carouselWrapper.addEventListener('mouseleave', () => {
        textLines.forEach((line, index) => {
            const scales = getScaleValues(index);
            line.style.transform = `scaleX(${scales.scaleX}) scaleY(${scales.scaleY}) translateX(${scales.translateX}px)`;
            line.style.opacity = scales.opacity.toString();
        });
    });

    // Add smooth transition to all lines
    textLines.forEach(line => {
        line.style.transition = 'all 0.08s ease-out';
    });

})();
