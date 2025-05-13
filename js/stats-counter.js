document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    const numberElements = document.querySelectorAll('.number');
    
    // Function to animate counting
    const animateCount = (element, target, duration) => {
        let start = 0;
        const increment = target / (duration / 16); // 60fps
        const updateCount = () => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                return;
            }
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCount);
        };
        requestAnimationFrame(updateCount);
    };
    
    // Intersection Observer to trigger animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                numberElements.forEach(element => {
                    const target = parseInt(element.getAttribute('data-count'));
                    animateCount(element, target, 2000); // 2 seconds duration
                });
                observer.unobserve(statsSection); // Stop observing after animation
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of section is visible
    });
    
    observer.observe(statsSection);
});