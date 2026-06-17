// ===================================
// EMAILJS CONFIGURATION
// ===================================
emailjs.init("IocVa_hFONr7an0yK");

// ===================================
// SMOOTH SCROLLING
// ===================================
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

// ===================================
// CONTACT FORM HANDLING
// ===================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Disable submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>שולח...</span>';
        submitBtn.disabled = true;

        // Get form data
        const formData = {
            from_name: document.getElementById('fullName').value,
            from_email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            school_name: document.getElementById('schoolName').value,
            message: document.getElementById('message').value
        };

        try {
            // Send email via EmailJS
            await emailjs.send(
                'service_ybh3cjg',
                'template_ey7wkr6',
                formData
            );

            // Show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';

            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Reset form after 5 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'flex';
                formSuccess.style.display = 'none';
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 5000);

        } catch (error) {
            // Show error message
            alert('אירעה שגיאה בשליחת הטופס. אנא נסי שוב או צרי קשר בטלפון.');
            console.error('EmailJS Error:', error);

            // Re-enable button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// ===================================
// IMAGE SLIDER (for phone mockups)
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.image-slider');

    sliders.forEach(slider => {
        const images = slider.querySelectorAll('.slider-image');
        if (images.length > 1) {
            let currentIndex = 0;

            setInterval(() => {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
            }, 3000); // Change image every 3 seconds
        }
    });
});

// ===================================
// SCROLL REVEAL ANIMATION
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe elements for scroll reveal
document.addEventListener('DOMContentLoaded', () => {
    const elementsToReveal = document.querySelectorAll('.app-column, .feature-card, .contact-card');
    elementsToReveal.forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });
});

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c🎓 ניהול שחרורים מוקדמים לבית הספר', 'font-size: 20px; font-weight: bold; color: #2E849D;');
console.log('%נבנה עם ❤️ עבור בתי ספר בישראל', 'font-size: 14px; color: #06B6D5;');
