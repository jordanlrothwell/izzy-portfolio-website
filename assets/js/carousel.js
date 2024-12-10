// assets/js/carousel.js

class ReviewCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.review-slide');
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        
        // Initialize the carousel
        this.init();
    }

    init() {
        // Show initial slide
        this.showSlide(this.currentSlide);

        // Set up event listeners
        document.querySelector('.prev-slide').addEventListener('click', () => this.prevSlide());
        document.querySelector('.next-slide').addEventListener('click', () => this.nextSlide());

        // Start autoplay
        this.startAutoPlay();
    }

    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => slide.style.display = 'none');
        
        // Show and animate the selected slide
        this.slides[index].style.display = 'block';
        this.slides[index].style.opacity = 0;
        
        // Fade in animation
        let opacity = 0;
        const fadeIn = setInterval(() => {
            opacity += 0.1;
            this.slides[index].style.opacity = opacity;
            if (opacity >= 1) clearInterval(fadeIn);
        }, 50);
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(this.currentSlide);
        this.resetAutoPlay();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(this.currentSlide);
        this.resetAutoPlay();
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    }

    resetAutoPlay() {
        clearInterval(this.autoPlayInterval);
        this.startAutoPlay();
    }
}

// Initialize the carousel when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ReviewCarousel();
});