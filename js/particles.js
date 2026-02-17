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
                this.radius = Math.random() * 1.5 + 0.5;
                this.opacity = Math.random() * 0.5 + 0.3;
                this.baseOpacity = this.opacity;
            }

            update() {
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
                        const attractionStrength = (maxDistance - distance) / maxDistance * 0.05; // Reduced strength
                        this.vx += (dx / distance) * attractionStrength;
                        this.vy += (dy / distance) * attractionStrength;
                    }
                }

                // Update position
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw(ctx) {
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

            // Draw connecting lines - REMOVED for "fully black" design
            /* 
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 0.5;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distSq = dx * dx + dy * dy;
                    
                    if (distSq < 10000) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            */

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
