// Cursor-following particle background effect (Optimized)
(function () {
    'use strict';

    // Wait for DOM content to load if script is in head, or just run if deferred/at end of body
    const initParticles = () => {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true }); // optimize for alpha
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
                // Increased size by ~25% (was 1.5 + 0.5 -> roughly 2.0 + 0.6)
                this.radius = Math.random() * 2.0 + 0.6;
                this.opacity = Math.random() * 0.5 + 0.3;
                this.baseOpacity = this.opacity;
                this.history = []; // Trail history
                this.isAttracted = false; // Flag to track if moving towards mouse
            }

            update() {
                // Reset attraction flag
                this.isAttracted = false;

                // Add subtle drift
                this.vx += (Math.random() - 0.5) * 0.01;
                this.vy += (Math.random() - 0.5) * 0.01;

                // Limit velocity
                this.vx *= 0.99;
                this.vy *= 0.99;

                // Move toward mouse if active
                if (mouseActive) {
                    const dx = mouseX - this.x;
                    const dy = mouseY - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const maxDistance = 250;

                    if (distance < maxDistance) {
                        this.isAttracted = true; // Mark as being effectively attracted
                        const attractionStrength = (maxDistance - distance) / maxDistance * 0.05; // Reduced strength
                        this.vx += (dx / distance) * attractionStrength;
                        this.vy += (dy / distance) * attractionStrength;
                    }
                }

                // Update position
                this.x += this.vx;
                this.y += this.vy;

                // Update Trail History
                // Save current position
                this.history.push({ x: this.x, y: this.y });
                // Limit trail length (Increased from 8 to 20 for longer tails)
                if (this.history.length > 20) {
                    this.history.shift();
                }

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw(ctx) {
                // Draw Trail - Tapered and Fading
                if (this.history.length > 1) {
                    for (let i = 0; i < this.history.length - 1; i++) {
                        const point = this.history[i];
                        const nextPoint = this.history[i + 1];

                        // Calculate progress (0 at tail end, 1 at head)
                        const progress = i / this.history.length;

                        ctx.beginPath();
                        ctx.moveTo(point.x, point.y);
                        ctx.lineTo(nextPoint.x, nextPoint.y);

                        // Tapered opacity: Fades out towards the end of the tail
                        // Tapered width: Thinner at the end of the tail
                        const alpha = this.opacity * progress * 0.6; // Max opacity 0.6 * particle opacity
                        const lineWidth = this.radius * progress; // Max width is particle radius

                        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                        ctx.lineWidth = lineWidth;
                        ctx.lineCap = 'round';
                        ctx.stroke();
                    }
                }

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        // Create particles - REDUCED COUNT for performance (was 100)
        const particleCount = 50;
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

        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw(ctx);
            });

            // Draw connecting lines - Optimized distance
            // Increased thickness and distance
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'; // Increased opacity slightly
            ctx.lineWidth = 1.0; // Increased from 0.5

            for (let i = 0; i < particles.length; i++) {
                // Skip connection logic if this particle is being attracted
                if (particles[i].isAttracted) continue;

                for (let j = i + 1; j < particles.length; j++) {
                    // Skip connection if the other particle is being attracted
                    if (particles[j].isAttracted) continue;

                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    // Squared distance check is faster than Math.sqrt
                    // Increased distance: sqrt(40000) = 200px (was 150px)
                    const distSq = dx * dx + dy * dy;

                    if (distSq < 40000) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        // Dynamic opacity based on distance for smoother look
                        const alpha = 1 - (distSq / 40000);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.2})`;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        }

        animate();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initParticles);
    } else {
        initParticles();
    }
})();
