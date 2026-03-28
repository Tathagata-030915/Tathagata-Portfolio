document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animateElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .fade-up');
    animateElements.forEach(el => observer.observe(el));

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Accessibility attribute update
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });

        // Close mobile menu when a link is clicked
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', false);
            });
        });
    }

    // GPA & CGPA Line Chart
    const ctx = document.getElementById('gpaCgpaChart');

    if (ctx && typeof Chart !== 'undefined') {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Sem I', 'Sem II', 'Sem III', 'Sem IV', 'Sem V', 'Sem VI', 'Sem VII'],
                datasets: [
                    {
                        label: 'GPA',
                        data: [8.10, 8.82, 8.00, 8.15, 8.05, 8.32, 9.00],
                        borderColor: '#d4af37',
                        backgroundColor: 'rgba(212, 175, 55, 0.15)',
                        tension: 0.4,
                        fill: true,
                        pointRadius: 5
                    },
                    {
                        label: 'CGPA',
                        data: [8.10, 8.46, 8.31, 8.27, 8.23, 8.32, 8.32],
                        borderColor: '#ffffff',
                        borderDash: [6, 6],
                        tension: 0.4,
                        pointRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#e0e0e0'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#a0a0a0' },
                        grid: { color: 'rgba(255,255,255,0.05)' }
                    },
                    y: {
                        min: 7.5,
                        max: 9.5,
                        ticks: { color: '#a0a0a0' },
                        grid: { color: 'rgba(255,255,255,0.05)' }
                    }
                }
            }
        });
    }

    // --- Custom Cursor Particle Effect ---
    const canvas = document.getElementById('cursor-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const particlesArray = [];
        const colors = ['#d4af37', '#f1c40f', '#ffffff']; // Gold, Light Gold, White

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 2.5 + 1; // 1 to 3.5 px
                this.speedX = Math.random() * 2 - 1; // -1 to +1
                this.speedY = Math.random() * 2 - 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.life = 100; // Acts as opacity/lifespan
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.size *= 0.96; // Gradually shrink
                this.life -= 1.5;  // Gradually fade
            }
            draw() {
                ctx.globalAlpha = Math.max(0, this.life / 100);
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1; // Reset
            }
        }

        let mouse = { x: null, y: null };
        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
            // Spawn 3 particles per mouse event for a thick stardust trail
            for (let i = 0; i < 3; i++) {
                particlesArray.push(new Particle(mouse.x, mouse.y));
            }
        });

        // Touch support for mobile devices
        window.addEventListener('touchmove', (event) => {
            mouse.x = event.touches[0].clientX;
            mouse.y = event.touches[0].clientY;
            for (let i = 0; i < 3; i++) {
                particlesArray.push(new Particle(mouse.x, mouse.y));
            }
        });

        function handleParticles() {
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                // Remove microscopic or dead particles
                if (particlesArray[i].size <= 0.2 || particlesArray[i].life <= 0) {
                    particlesArray.splice(i, 1);
                    i--;
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            handleParticles();
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

});