// Product data
const products = [
    {
        id: 1,
        name: "XANAX",
        description: "Temporarily boosts cognitive functions by 200%.",
        price: "2 NC 1pc",
        image: "https://filtermag.org/wp-content/uploads/2021/01/Xan-Double-Green-Bar-1.png"
    },
    {
        id: 2,
        name: "SOON",
        description: "SOON",
        price: "0 NC",
        image: "https://www.writermag.com/wp-content/uploads/2019/03/question-marks.jpg"
    },
    {
        id: 3,
        name: "SOON",
        description: "SOON",
        price: "0 NC",
        image: "https://www.writermag.com/wp-content/uploads/2019/03/question-marks.jpg"
    },
    {
        id: 4,
        name: "SOON",
        description: "SOON",
        price: "0 NC",
        image: "https://www.writermag.com/wp-content/uploads/2019/03/question-marks.jpg"
    }
];

// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(function() {
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
            initImageEffects(); // Initialize image effects after page loads
        }, 500);
    }, 2000);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Load products
function loadProducts() {
    const productContainer = document.getElementById('product-container');
    
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-6 col-lg-3 product-card';
        productCard.style.transitionDelay = `${index * 0.1}s`;
        
        productCard.innerHTML = `
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
                <div class="card-body product-body">
                    <h5 class="card-title product-title">${product.name}</h5>
                    <p class="card-text product-description">${product.description}</p>
                    <p class="product-price">${product.price}</p>
                </div>
            </div>
        `;
        
        productContainer.appendChild(productCard);
        
        // Trigger animation when element comes into view
        setTimeout(() => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(productCard);
        }, 100);
    });
}

// Initialize image effects
function initImageEffects() {
    const pixelImage = document.querySelector('.pixel-image');
    const dataOverlay = document.querySelector('.data-overlay');
    
    if (!pixelImage) return;
    
    // Random glitch effect
    setInterval(() => {
        if (Math.random() > 0.85) {
            // Horizontal glitch
            pixelImage.style.transform = `translateX(${Math.random() > 0.5 ? '-' : ''}${Math.random() * 5}px)`;
            pixelImage.style.filter = `
                sepia(80%) 
                hue-rotate(${-20 + Math.random() * 40}deg) 
                contrast(${1.4 + Math.random() * 0.8}) 
                saturate(${0.5 + Math.random() * 0.5})
                brightness(${0.7 + Math.random() * 0.3})
                drop-shadow(0 0 ${Math.random() * 8}px var(--neon-orange))
            `;
            
            setTimeout(() => {
                pixelImage.style.transform = 'translateX(0)';
                pixelImage.style.filter = `
                    sepia(80%) 
                    hue-rotate(-10deg) 
                    contrast(1.4) 
                    saturate(0.7) 
                    brightness(0.8)
                    drop-shadow(0 0 5px var(--neon-orange))
                `;
            }, 100 + Math.random() * 200);
        }
    }, 3000);
    
    // Data corruption effect
    setInterval(() => {
        if (Math.random() > 0.9 && dataOverlay) {
            dataOverlay.style.backgroundSize = `${5 + Math.random() * 30}px ${5 + Math.random() * 30}px`;
            dataOverlay.style.opacity = `${0.3 + Math.random() * 0.7}`;
            
            setTimeout(() => {
                if (dataOverlay) {
                    dataOverlay.style.backgroundSize = '20px 20px';
                    dataOverlay.style.opacity = '1';
                }
            }, 500);
        }
    }, 5000);
    
    // Random static effect
    setInterval(() => {
        if (Math.random() > 0.92) {
            const staticOverlay = document.createElement('div');
            staticOverlay.className = 'static-overlay';
            staticOverlay.style.background = `
                repeating-linear-gradient(
                    0deg,
                    rgba(255, 94, 26, ${Math.random() * 0.3}),
                    rgba(255, 94, 26, ${Math.random() * 0.1}) ${Math.random() * 20}px,
                    transparent ${Math.random() * 50}px
                )
            `;
            staticOverlay.style.animation = `static ${Math.random() * 0.5 + 0.1}s linear`;
            
            const container = pixelImage.parentElement;
            if (container) {
                container.appendChild(staticOverlay);
                setTimeout(() => {
                    staticOverlay.remove();
                }, 200);
            }
        }
    }, 2000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    
    // Set active nav link based on current section
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Random glitch effect on text elements
    setInterval(() => {
        const glitchTexts = document.querySelectorAll('.glitch-text');
        glitchTexts.forEach(text => {
            if (Math.random() > 0.7) {
                text.style.animation = 'none';
                setTimeout(() => {
                    text.style.animation = '';
                }, 100);
            }
        });
    }, 3000);
});
