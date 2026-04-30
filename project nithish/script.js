document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navbar Scroll Effect & Smooth Scrolling ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for navbar height
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // --- 2. Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                hamburger.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // --- 3. Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // --- 4. Background Music Toggle ---
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;

    if (musicToggle && bgMusic) {
        // Lower volume for background music
        bgMusic.volume = 0.3;

        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                bgMusic.play().catch(error => {
                    console.log("Audio playback failed (likely due to browser autoplay policies):", error);
                });
                musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
            isPlaying = !isPlaying;
        });
    }

    // --- 5. Gallery Lightbox ---
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = document.querySelector('.close-lightbox');

    if (galleryItems && lightbox && lightboxImg) {
        galleryItems.forEach(item => {
            item.parentElement.addEventListener('click', () => {
                lightbox.style.display = 'block';
                lightboxImg.src = item.src;
            });
        });

        closeLightboxBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        // Close on clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    // (FAQs and RSVP removed)

    // --- 8. Parallax Effect ---
    const parallaxTemple = document.querySelector('.parallax-temple');
    const parallaxTrees = document.querySelectorAll('.parallax-tree');
    const parallaxInstruments = document.querySelectorAll('.parallax-instrument');

    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;

        // Temple moves slower than scroll for depth
        if (parallaxTemple) {
            parallaxTemple.style.transform = `translateX(-50%) translateY(${scrollY * 0.3}px)`;
        }

        // Trees move slightly
        if (parallaxTrees) {
            parallaxTrees.forEach(tree => {
                tree.style.transform = `translateY(${scrollY * 0.1}px) ${tree.classList.contains('right-tree') ? 'scaleX(-1)' : ''}`;
            });
        }

        // Instruments float up faster
        if (parallaxInstruments) {
            parallaxInstruments.forEach(inst => {
                inst.style.transform = `translateY(-${scrollY * 0.2}px)`;
            });
        }
    });

    // --- 9. Falling Petals and Leaves ---
    const petalsContainer = document.getElementById('petals-container');
    
    if (petalsContainer) {
        const createFallingItem = () => {
            const item = document.createElement('div');
            // Randomly choose between petal and leaf (70% chance petal, 30% leaf)
            const isLeaf = Math.random() > 0.7;
            item.classList.add(isLeaf ? 'leaf' : 'petal');
            
            // Randomize starting position, size, and duration
            const startX = Math.random() * window.innerWidth;
            const size = Math.random() * 10 + 5; // 5px to 15px
            const duration = Math.random() * 5 + 5; // 5s to 10s
            const delay = Math.random() * 5;
            
            item.style.left = `${startX}px`;
            item.style.width = `${size}px`;
            item.style.height = `${size}px`;
            item.style.animationDuration = `${duration}s`;
            item.style.animationDelay = `${delay}s`;
            
            petalsContainer.appendChild(item);
            
            // Remove item after animation completes
            setTimeout(() => {
                item.remove();
            }, (duration + delay) * 1000);
        };

        // Create items periodically
        setInterval(createFallingItem, 400); // 1 item every 400ms
    }
});
