 let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dot');
        const totalSlides = slides.length; // Now 5 slides total
        let slideInterval;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                dots[i].classList.remove('active');
            });

            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }

        function changeSlide(direction) {
            let newIndex = currentSlide + direction;
            if (newIndex >= totalSlides) newIndex = 0;
            if (newIndex < 0) newIndex = totalSlides - 1;
            showSlide(newIndex);
            resetInterval();
        }

        function goToSlide(index) {
            showSlide(index);
            resetInterval();
        }

        function nextSlide() {
            let newIndex = (currentSlide + 1) % totalSlides;
            showSlide(newIndex);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 6000);
        }

        // Auto-advance slides
        slideInterval = setInterval(nextSlide, 6000);

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        function toggleMobileMenu() {
            const overlay = document.getElementById('mobileOverlay');
            overlay.classList.toggle('active');
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Pause slider when video is in view
        const videoSection = document.querySelector('.video-section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    clearInterval(slideInterval);
                } else {
                    resetInterval();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(videoSection);