// DOM Elements
const navbar = document.querySelector('.navbar');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');
const animatedElements = document.querySelectorAll('.animate-on-scroll');

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