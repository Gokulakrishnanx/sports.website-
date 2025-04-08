// DOM Elements
const navbar = document.querySelector('.navbar');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');
const animatedElements = document.querySelectorAll('.animate-on-scroll');
const modal = document.getElementById('trainingModal');
const startTrainingBtn = document.getElementById('startTrainingBtn');
const closeModalBtn = document.querySelector('.close-modal');
const trainingForm = document.getElementById('trainingForm');
const exploreProgramsBtn = document.querySelector('.cta-button.secondary');

// Create notification element
const notification = document.createElement('div');
notification.className = 'notification';
document.body.appendChild(notification);

// Function to show notification
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    
    // Add animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Auto hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.style.display = 'none';
        }, 300);
    }, 3000);
}

// Add styles for notification
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background-color: #4CAF50;
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        display: none;
        transform: translateY(-20px);
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .notification.error {
        background-color: #f44336;
    }
`;
document.head.appendChild(style);

// Modal functionality
startTrainingBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Handle form submission
trainingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(trainingForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send this data to your server
    console.log('Form submitted:', data);
    
    // Show success notification
    showNotification('Registration submitted successfully! We will contact you soon. 🎉');
    
    // Reset form and close modal
    trainingForm.reset();
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Handle scroll events
function handleScroll() {
    // Navbar background effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });

    // Animate elements on scroll
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
}

// Mobile menu toggle
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    handleScroll();
});

// Explore Programs button functionality
exploreProgramsBtn.addEventListener('click', () => {
    document.getElementById('programs').scrollIntoView({
        behavior: 'smooth'
    });
}); 