// ── Replace these 3 values with yours from emailjs.com ──────────────
const EMAILJS_PUBLIC_KEY  = '2cmU6QLlRrdhGgIjJ';
const EMAILJS_SERVICE_ID  = 'service_ax20q0c';
const EMAILJS_TEMPLATE_ID = 'template_mj8dunq';
// ────────────────────────────────────────────────────────────────────

emailjs.init(EMAILJS_PUBLIC_KEY);

// ── Scroll reveal ───────────────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ── Project card → modal ────────────────────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const id = card.getAttribute('data-modal');
        document.getElementById(id).classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

// ── Close modals ────────────────────────────────────────────────────
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal-overlay').classList.remove('open');
        document.body.style.overflow = '';
    });
});
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(overlay => {
            overlay.classList.remove('open');
        });
        document.body.style.overflow = '';
    }
});

// ── Contact form → EmailJS ──────────────────────────────────────────
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const btn    = this.querySelector('.submit-btn');
    const status = document.getElementById('form-status');

    btn.textContent = 'Sending…';
    btn.disabled    = true;
    status.textContent = '';

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name:    this.name.value,
        email:   this.email.value,
        time:    new Date().toLocaleString(),
        message: this.message.value
    })
    .then(() => {
        status.textContent = '✓ Message sent! I will get back to you soon.';
        status.style.color = '#4ade80';
        this.reset();
    })
    .catch((err) => {
        console.error('EmailJS error:', err);
        status.textContent = '✗ Something went wrong. Please try again.';
        status.style.color = '#f87171';
    })
    .finally(() => {
        btn.textContent = 'Send message →';
        btn.disabled    = false;
    });
});

// ── Sticky nav shadow on scroll ─────────────────────────────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20
        ? '0 8px 40px rgba(0,0,0,0.4)'
        : '';
});