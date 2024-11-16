// slide-show.js
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra xem các phần tử có tồn tại không
    const track = document.querySelector('.slick-track');
    const slides = document.querySelectorAll('.slick-slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    const dotsContainer = document.querySelector('.slide-dots');

    // Kiểm tra nếu không có slides thì return
    if (!slides.length) {
        console.error('No slides found');
        return;
    }

    let currentSlide = 0;
    let slideWidth = slides[0].getBoundingClientRect().width; // Sử dụng getBoundingClientRect thay vì offsetWidth
    let autoplayInterval;
    let isTransitioning = false;

    // Khởi tạo dots
    function initDots() {
        if (!dotsContainer) return;
        
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                if (!isTransitioning) {
                    goToSlide(index);
                }
            });
            dotsContainer.appendChild(dot);
        });
    }

    // Cập nhật dots
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Chuyển slide
    function goToSlide(index) {
        if (isTransitioning || !track) return;
        isTransitioning = true;
        currentSlide = index;
        
        track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        updateDots();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    // Slide tiếp theo
    function nextSlide() {
        if (!isTransitioning) {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
        }
    }

    // Slide trước
    function prevSlide() {
        if (!isTransitioning) {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(currentSlide);
        }
    }

    // Xử lý sự kiện click
    if (prevButton) prevButton.addEventListener('click', prevSlide);
    if (nextButton) nextButton.addEventListener('click', nextSlide);

    // Autoplay
    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }

    // Xử lý hover
    const slideshow = document.querySelector('.boxslideshow');
    if (slideshow) {
        slideshow.addEventListener('mouseenter', stopAutoplay);
        slideshow.addEventListener('mouseleave', startAutoplay);
    }

    // Xử lý responsive
    function handleResize() {
        slideWidth = slides[0].getBoundingClientRect().width;
        goToSlide(currentSlide);
    }

    window.addEventListener('resize', handleResize);

    // Xử lý swipe trên mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (slideshow) {
        slideshow.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        slideshow.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // Khởi tạo slideshow
    initDots();
    startAutoplay();
});