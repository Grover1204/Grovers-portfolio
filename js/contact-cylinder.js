// 3D Cylindrical Flip Effect - Each Line Rotates on its Own Axis
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
    let rotationState = [0, 0, 0, 0, 0, 0, 0]; // Track rotation for each line (in degrees)
    let hasCompleted360 = [false, false, false, false, false, false, false]; // Track if line has completed 360° rotation

    // Rotation speed multipliers for each line (relative to movement)
    // Each line rotates at different speed based on position
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

    // Track mouse movement - ONLY HORIZONTAL. Use requestAnimationFrame batching
    let pendingDelta = 0;
    let ticking = false;

    document.addEventListener('mousemove', (e) => {
        currentMouseX = e.clientX;

        // refresh contact rect each move to avoid stale values after scroll/layout changes
        contactRect = contactSection.getBoundingClientRect();

        // Check if cursor is in contact section
        if (isMouseInContactSection(e.clientX, e.clientY)) {
            const horizontalDelta = currentMouseX - lastMouseX;
            // accumulate delta for next animation frame
            pendingDelta += horizontalDelta;

            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    // Only respond to horizontal movement; ignore tiny jitter
                    if (Math.abs(pendingDelta) > 0.5) {
                        updateCylindricalRotation(pendingDelta);
                    }
                    pendingDelta = 0;
                    ticking = false;
                });
            }
        }

        lastMouseX = currentMouseX;
    });

    // Handle touch for mobile - similar batching
    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        currentMouseX = touch.clientX;
        contactRect = contactSection.getBoundingClientRect();

        if (isMouseInContactSection(currentMouseX, touch.clientY)) {
            const horizontalDelta = currentMouseX - lastMouseX;
            pendingDelta += horizontalDelta;
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    if (Math.abs(pendingDelta) > 0.5) {
                        updateCylindricalRotation(pendingDelta);
                    }
                    pendingDelta = 0;
                    ticking = false;
                });
            }
        }

        lastMouseX = currentMouseX;
    }, { passive: true });

    function isMouseInContactSection(x, y) {
        // compute contactRect on demand (defensive) in case layout changed
        if (!contactSection) return false;
        contactRect = contactSection.getBoundingClientRect();
        return (
            x >= contactRect.left &&
            x <= contactRect.right &&
            y >= contactRect.top &&
            y <= contactRect.bottom
        );
    }

    function updateCylindricalRotation(horizontalDelta) {
        // Update rotation state for each line based on horizontal movement
        // Each line rotates around its Y-axis (left-right rotation creates flip effect)
        // STOP at 360° (or -360° for counter-clockwise)
        rotationState = rotationState.map((currentRotation, index) => {
            // Only allow rotation if haven't completed 360° yet
            if (hasCompleted360[index]) {
                return currentRotation;
            }

            // Add rotation based on horizontal movement and speed multiplier
            const rotationIncrement = horizontalDelta * rotationSpeeds[index] * 2.5;
            const newRotation = currentRotation + rotationIncrement;

            // Check if we've completed 360° rotation in either direction
            const absMod = Math.abs(newRotation % 360);
            if (absMod >= 360 || (absMod <= 5 && Math.abs(newRotation) >= 360)) {
                hasCompleted360[index] = true;
                return Math.sign(newRotation) * 360; // Lock at 360 or -360
            }

            return newRotation;
        });

        // Apply rotations to each text line
        textLines.forEach((line, index) => {
            const lineInner = line.querySelector('.text-line-inner');
            if (lineInner) {
                // Calculate rotation progress (0 to 1) for curved effect intensity
                const rotationProgress = Math.abs(rotationState[index]) / 360;
                // Increase backward curve as rotation progresses
                const curveAmount = 15 + (rotationProgress * 25); // 15-40deg curve
                
                // Apply Y-axis rotation for flip + curved backward stretch
                lineInner.style.transform = `rotateY(${rotationState[index]}deg) rotateX(${curveAmount}deg) scaleZ(${1 - rotationProgress * 0.2})`;
            }
        });
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
    if (contactSection) {
        contactSection.addEventListener('mouseleave', () => {
            resetRotation();
        });

        // Keep lastMouseX in sync when entering
        contactSection.addEventListener('mouseenter', (e) => {
            lastMouseX = e.clientX || lastMouseX;
        });
    }

    function resetRotation() {
        // Smoothly decelerate rotation (only if not at 360°)
        rotationState = rotationState.map((rotation, index) => {
            if (hasCompleted360[index]) {
                return rotation; // Keep at 360/-360
            }
            return rotation * 0.93;
        });
        
        const hasActiveRotation = rotationState.some((rot, index) => !hasCompleted360[index] && Math.abs(rot) > 0.5);
        
        if (hasActiveRotation) {
            textLines.forEach((line, index) => {
                const lineInner = line.querySelector('.text-line-inner');
                if (lineInner) {
                    lineInner.style.transform = `rotateY(${rotationState[index]}deg)`;
                }
            });
            requestAnimationFrame(resetRotation);
        } else {
            // Reset only non-completed lines; keep completed lines at 360°
            rotationState = rotationState.map((rot, index) => hasCompleted360[index] ? rot : 0);
            textLines.forEach((line, index) => {
                const lineInner = line.querySelector('.text-line-inner');
                if (lineInner) {
                    lineInner.style.transform = `rotateY(${rotationState[index]}deg)`;
                }
            });
        }
    }

    // Add smooth transition to all line-inner elements
    textLines.forEach(line => {
        const lineInner = line.querySelector('.text-line-inner');
        if (lineInner) {
            lineInner.style.transition = 'transform 0.05s ease-out';
        }
    });

})();
