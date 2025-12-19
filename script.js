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

    // Mobile Menu Toggle (Optional visual feedback)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            // For a full production site, you would toggle a class here to show/hide the menu
            // Currently keeps the cinematic focus on desktop/clean layout
            console.log("Menu clicked");
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

});