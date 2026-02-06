// Accenture-Style Carousel Effect with Circular Rotation Based on Horizontal Cursor Movement
(function() {
    'use strict';

    const carouselWrapper = document.getElementById('carouselWrapper');
    const textLines = document.querySelectorAll('.text-line');
    const contactSection = document.querySelector('.contact');

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

    let lastMouseX = 0;
    let currentMouseX = 0;
    let containerRect = carouselWrapper.getBoundingClientRect();
    let contactRect = contactSection.getBoundingClientRect();
    let rotationState = [0, 0, 0, 0, 0, 0, 0]; // Track rotation for each line

    // Rotation speed multipliers for each line (relative to movement)
    const rotationSpeeds = [
        6.0,  // Line 1 - fastest
        4.5,  // Line 2
        3.0,  // Line 3
        1.5,  // Line 4 - center, slowest
        3.0,  // Line 5
        4.5,  // Line 6
        6.0   // Line 7 - fastest
    ];

    // Update container dimensions on resize
    window.addEventListener('resize', () => {
        containerRect = carouselWrapper.getBoundingClientRect();
        contactRect = contactSection.getBoundingClientRect();
    });

    // Track mouse movement - ONLY HORIZONTAL
    document.addEventListener('mousemove', (e) => {
        currentMouseX = e.clientX;

        // Check if cursor is in contact section
        if (isMouseInContactSection(e.clientX, e.clientY)) {
            const horizontalDelta = currentMouseX - lastMouseX;
            
            // Only update if horizontal movement is significant
            if (Math.abs(horizontalDelta) > 0) {
                updateCircularRotation(horizontalDelta);
            }
        }

        lastMouseX = currentMouseX;
    });

    // Handle touch for mobile
    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        currentMouseX = touch.clientX;

        if (isMouseInContactSection(currentMouseX, touch.clientY)) {
            const horizontalDelta = currentMouseX - lastMouseX;
            
            if (Math.abs(horizontalDelta) > 0) {
                updateCircularRotation(horizontalDelta);
            }
        }

        lastMouseX = currentMouseX;
    }, { passive: true }); // passive: true ensures scrolling isn't blocked

    function isMouseInContactSection(x, y) {
        return (
            x >= contactRect.left &&
            x <= contactRect.right &&
            y >= contactRect.top &&
            y <= contactRect.bottom
        );
    }

    function updateCircularRotation(horizontalDelta) {
        // Update rotation state for each line based on horizontal movement
        rotationState = rotationState.map((currentRotation, index) => {
            // Add rotation based on horizontal movement and speed multiplier
            // Increased multiplier for more visible rotation
            const rotationIncrement = horizontalDelta * rotationSpeeds[index] * 1.5;
            return currentRotation + rotationIncrement;
        });

        // Apply rotations to each text line
        textLines.forEach((line, index) => {
            line.style.transform = applyRotationTransform(index, rotationState[index]);
        });
    }

    function applyRotationTransform(index, rotation) {
        const scales = getScaleValues(index);
        // Add rotateZ for visible spinning effect combined with rotateY for depth
        return `scaleX(${scales.scaleX}) scaleY(${scales.scaleY}) translateX(${scales.translateX}px) rotateY(${rotation}deg) rotateZ(${rotation * 0.3}deg)`;
    }

    function getScaleValues(index) {
        // Define scale values for each line (matching the CSS) - CLOSER SPACING
        const scales = [
            { scaleX: 0.3, scaleY: 0.4, translateX: -140, opacity: 0.2 },
            { scaleX: 0.5, scaleY: 0.65, translateX: -90, opacity: 0.4 },
            { scaleX: 0.75, scaleY: 0.85, translateX: -45, opacity: 0.65 },
            { scaleX: 1, scaleY: 1, translateX: 0, opacity: 1 },
            { scaleX: 0.75, scaleY: 0.85, translateX: 45, opacity: 0.65 },
            { scaleX: 0.5, scaleY: 0.65, translateX: 90, opacity: 0.4 },
            { scaleX: 0.3, scaleY: 0.4, translateX: 140, opacity: 0.2 }
        ];

        return scales[index] || scales[3];
    }

    // Reset effect when mouse leaves contact section
    document.addEventListener('mouseleave', () => {
        // Gradually reset rotation
        resetRotation();
    });

    function resetRotation() {
        rotationState = rotationState.map(rotation => rotation * 0.95); // Smooth deceleration
        
        if (Math.max(...rotationState.map(Math.abs)) > 0.5) {
            textLines.forEach((line, index) => {
                line.style.transform = applyRotationTransform(index, rotationState[index]);
            });
            requestAnimationFrame(resetRotation);
        } else {
            // Complete reset
            rotationState = [0, 0, 0, 0, 0, 0, 0];
            textLines.forEach((line, index) => {
                const scales = getScaleValues(index);
                line.style.transform = `scaleX(${scales.scaleX}) scaleY(${scales.scaleY}) translateX(${scales.translateX}px) rotateY(0deg)`;
            });
        }
    }

    // Add smooth transition to all lines
    textLines.forEach(line => {
        line.style.transition = 'opacity 0.3s ease-out';
    });

})();
