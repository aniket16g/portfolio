document.addEventListener('DOMContentLoaded', () => {
    // Loading Animation
    const loader = document.getElementById('loader');
    const progress = document.querySelector('.progress');
    let loadValue = 0;

    const interval = setInterval(() => {
        loadValue += Math.random() * 10;
        if (loadValue >= 100) {
            loadValue = 100;
            clearInterval(interval);
            setTimeout(() => {
                document.body.classList.add('loaded');
            }, 500);
        }
        progress.style.width = `${loadValue}%`;
    }, 100);

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;

            // Small delay for follower
            setTimeout(() => {
                follower.style.left = `${e.clientX}px`;
                follower.style.top = `${e.clientY}px`;
            }, 50);
        });
    }

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add to clicked
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        // Small timeout to allow display block to apply before opacity transition
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 400);
                    }
                });
            });
        });
    }

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.project-item, .section-title, .about-text p, .services-list li');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });

    // Simple Parallax Effect
    const parallaxImage = document.querySelector('.parallax-image .placeholder-img');
    if (parallaxImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (window.innerWidth > 768) {
                const rate = scrolled * 0.05;
                parallaxImage.style.transform = `translateY(${rate}px) scale(1.1)`;
            }
        });
    }

    // Lightbox Functionality
    const lightbox = document.getElementById('video-lightbox');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeBtn = document.querySelector('.close-lightbox');
    const projectItemsWithVideo = document.querySelectorAll('.project-item[data-video-id]');

    projectItemsWithVideo.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const videoId = item.getAttribute('data-video-id');
            const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

            lightboxVideo.src = videoSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    const closeLightbox = () => {
        if (lightbox) {
            lightbox.classList.remove('active');
            lightboxVideo.src = ''; // Stop video
            document.body.style.overflow = '';
        }
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
});
