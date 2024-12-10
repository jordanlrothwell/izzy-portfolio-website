// assets/js/carousel.js

(function() {
    // Wait for both DOM and window load to ensure all resources are available
    window.addEventListener('load', initCarousel);
    
    function initCarousel() {
        try {
            const slides = document.querySelectorAll('.review-slide');
            if (!slides || slides.length === 0) {
                console.warn('No carousel slides found');
                return;
            }

            let currentSlide = 0;
            let autoPlayInterval = null;

            // Show initial slide
            showSlide(currentSlide);

            // Set up navigation buttons
            const prevButton = document.querySelector('.prev-slide');
            const nextButton = document.querySelector('.next-slide');

            if (prevButton) {
                prevButton.addEventListener('click', () => {
                    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                    showSlide(currentSlide);
                    resetAutoPlay();
                });
            }

            if (nextButton) {
                nextButton.addEventListener('click', () => {
                    currentSlide = (currentSlide + 1) % slides.length;
                    showSlide(currentSlide);
                    resetAutoPlay();
                });
            }

            function showSlide(index) {
                slides.forEach(slide => {
                    if (slide && slide.style) {
                        slide.style.display = 'none';
                        slide.style.opacity = 0;
                    }
                });

                if (slides[index] && slides[index].style) {
                    slides[index].style.display = 'block';
                    
                    // Fade in animation
                    let opacity = 0;
                    const fadeIn = setInterval(() => {
                        opacity += 0.1;
                        if (slides[index] && slides[index].style) {
                            slides[index].style.opacity = opacity;
                        }
                        if (opacity >= 1) clearInterval(fadeIn);
                    }, 50);
                }
            }

            function startAutoPlay() {
                if (autoPlayInterval) clearInterval(autoPlayInterval);
                autoPlayInterval = setInterval(() => {
                    currentSlide = (currentSlide + 1) % slides.length;
                    showSlide(currentSlide);
                }, 5000);
            }

            function resetAutoPlay() {
                if (autoPlayInterval) clearInterval(autoPlayInterval);
                startAutoPlay();
            }

            // Start auto-play
            startAutoPlay();

            // Clean up on page unload
            window.addEventListener('unload', () => {
                if (autoPlayInterval) clearInterval(autoPlayInterval);
            });

        } catch (error) {
            console.error('Error initializing carousel:', error);
        }
    }
})();