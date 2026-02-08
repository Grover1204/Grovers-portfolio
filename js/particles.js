// Cursor-following particle background effect (inspired by Google Antigravity)
(function() {
    'use strict';

    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let mouseActive = false;

    // Set canvas size to match window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 1.5 + 0.5;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.baseOpacity = this.opacity;
            this.burst = false;
            this.burstFrames = 0;
        }

        update(mouseX, mouseY) {
            // Handle burst
            if (this.burst) {
                this.x += this.vx;
                this.y += this.vy;
                this.burstFrames = (this.burstFrames || 0) + 1;
                if (this.burstFrames > 60) { // Even longer burst duration
                    this.burst = false;
                    this.burstFrames = 0;
                    this.vx = (Math.random() - 0.5) * 0.5;
                    this.vy = (Math.random() - 0.5) * 0.5;
                }
                return;
            }

            // Add subtle drift
            this.vx += (Math.random() - 0.5) * 0.01;
            this.vy += (Math.random() - 0.5) * 0.01;

            // Limit velocity
            this.vx *= 0.99;
            this.vy *= 0.99;

            // Move toward mouse if active (3D attraction effect)
            if (mouseActive) {
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 200;

                if (distance < maxDistance) {
                    const attractionStrength = (maxDistance - distance) / maxDistance * 0.15;
                    this.vx += (dx / distance) * attractionStrength;
                    this.vy += (dy / distance) * attractionStrength;

                    // Increase opacity when near cursor
                    this.opacity = this.baseOpacity + (1 - distance / maxDistance) * 0.7;
                } else {
                    this.opacity = this.baseOpacity;
                }
            } else {
                this.opacity = this.baseOpacity;
            }

            // Update position
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
                this.vx *= -1;
                this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
            }
            if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
                this.vy *= -1;
                this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
            }
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Create particles
    const particleCount = 100;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        mouseActive = true;
    });

    document.addEventListener('mouseleave', () => {
        mouseActive = false;
    });

    // Burst logic parameters
    const burstThreshold = 20; // Distance to cursor for "close"
    const burstDistance = 100; // How far particles burst out
    let burstTriggered = false;
    let rotationStartTime = null;
    const ROTATION_DURATION = 12000; // 12 seconds in ms

    function allParticlesCloseToCursor() {
        return particles.every(p =>
            Math.hypot(p.x - mouseX, p.y - mouseY) < burstThreshold
        );
    }

    function burstParticles() {
        console.log('Burst triggered!');
        particles.forEach(p => {
            const angle = Math.random() * 2 * Math.PI;
            p.vx = Math.cos(angle) * burstDistance / 5; // Much faster burst
            p.vy = Math.sin(angle) * burstDistance / 5;
            p.burst = true;
            p.burstFrames = 0;
        });
    }

    // Animation loop
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Burst timer logic
        if (mouseActive && allParticlesCloseToCursor()) {
            if (!rotationStartTime) {
                rotationStartTime = Date.now();
            }
            if (!burstTriggered && Date.now() - rotationStartTime >= ROTATION_DURATION) {
                burstParticles();
                burstTriggered = true;
            }
        } else {
            rotationStartTime = null;
            burstTriggered = false;
        }

        // Update and draw particles
        particles.forEach(particle => {
            particle.update(mouseX, mouseY);
            particle.draw(ctx);
        });

        // Draw connecting lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 120) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
})();
