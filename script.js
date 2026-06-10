// ── Replace these 3 values with yours from emailjs.com ──────────────
const EMAILJS_PUBLIC_KEY  = '2cmU6QLlRrdhGgIjJ';
const EMAILJS_SERVICE_ID  = 'service_ax20q0c';
const EMAILJS_TEMPLATE_ID = 'template_mj8dunq';
// ────────────────────────────────────────────────────────────────────

emailjs.init(EMAILJS_PUBLIC_KEY);

// ── Scroll reveal ───────────────────────────────────────────────────
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
});

sr.reveal(`.hero-inner > div`);
sr.reveal(`.hero-avatar-wrap`, {delay: 400, origin: 'bottom'});
sr.reveal(`.about-text, .contact-info`, {origin: 'left'});
sr.reveal(`.about-stats, .contact-form`, {origin: 'right'});
sr.reveal(`.edu-card, .project-card, .skill-group`, {interval: 150});

// ── Scroll Sections Active Link ─────────────────────────────────────
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.scrollY

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 80,
              sectionId = current.getAttribute('id')
        
        const navLink = document.querySelector('.nav-links a[href*=' + sectionId + ']');
        if(navLink) {
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                navLink.classList.add('active-link')
            } else {
                navLink.classList.remove('active-link')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive);

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

// ── VanillaTilt ─────────────────────────────────────────────────────
if(typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".project-card, .edu-card, .stat-card"), {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
}

// ── Magnetic Buttons (GSAP) ─────────────────────────────────────────
if(typeof gsap !== 'undefined') {
    const magnets = document.querySelectorAll('.hero-cta, .submit-btn');

    magnets.forEach((magnet) => {
        magnet.classList.add('magnetic');
        
        magnet.addEventListener('mousemove', (e) => {
            const position = magnet.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;

            gsap.to(magnet, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        magnet.addEventListener('mouseleave', () => {
            gsap.to(magnet, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}

// ── Particles.js Network Background ─────────────────────────────────
if(typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: '#7c6dfa' },
            shape: { type: 'circle' },
            opacity: { value: 0.4, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#7c6dfa',
                opacity: 0.3,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
            }
        },
        interactivity: {
            detect_on: 'window',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 160, line_linked: { opacity: 0.8 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

// ── Three.js Neural Point Cloud Animation ─────────────────────────────
if (typeof THREE !== 'undefined') {
    const canvasContainer = document.getElementById('hero-3d-canvas');
    if (canvasContainer) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
        canvasContainer.appendChild(renderer.domElement);

        // Particle configuration
        const particleCount = 2000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const originalPositions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const color1 = new THREE.Color(0x7c6dfa); // Accent
        const color2 = new THREE.Color(0x38bdf8); // Blue
        const color3 = new THREE.Color(0xe05cff); // Purple/Pink

        for (let i = 0; i < particleCount; i++) {
            // Spherical distribution
            const r = 2.5 + Math.random() * 0.5; // radius between 2.5 and 3.0
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            originalPositions[i * 3] = x;
            originalPositions[i * 3 + 1] = y;
            originalPositions[i * 3 + 2] = z;

            // Mix colors
            const mixRatio = Math.random();
            let finalColor = color1.clone();
            if (mixRatio > 0.66) {
                finalColor.lerp(color2, Math.random());
            } else if (mixRatio > 0.33) {
                finalColor.lerp(color3, Math.random());
            }

            colors[i * 3] = finalColor.r;
            colors[i * 3 + 1] = finalColor.g;
            colors[i * 3 + 2] = finalColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Create texture for circular particles
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const context = canvas.getContext('2d');
        context.beginPath();
        context.arc(8, 8, 8, 0, Math.PI * 2);
        context.fillStyle = 'white';
        context.fill();
        const texture = new THREE.CanvasTexture(canvas);

        const material = new THREE.PointsMaterial({
            size: 0.08,
            vertexColors: true,
            map: texture,
            transparent: true,
            opacity: 0.8,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        const particleSystem = new THREE.Points(geometry, material);
        scene.add(particleSystem);
        
        // Inner core (glowing solid)
        const coreGeometry = new THREE.IcosahedronGeometry(1.2, 2);
        const coreMaterial = new THREE.MeshBasicMaterial({
            color: 0x111118,
            wireframe: false,
            transparent: true,
            opacity: 0.9
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        scene.add(core);

        const coreWireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0x7c6dfa,
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });
        const coreWireframe = new THREE.Mesh(coreGeometry, coreWireframeMaterial);
        scene.add(coreWireframe);

        camera.position.z = 6;

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        let time = 0;

        const animate = function () {
            requestAnimationFrame(animate);
            time += 0.01;

            particleSystem.rotation.y += 0.001;
            particleSystem.rotation.x += 0.0005;
            
            core.rotation.y -= 0.002;
            coreWireframe.rotation.y -= 0.002;

            // Animate particles (wave effect)
            const positions = particleSystem.geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                const ix = i * 3;
                const iy = i * 3 + 1;
                const iz = i * 3 + 2;
                
                const ox = originalPositions[ix];
                const oy = originalPositions[iy];
                const oz = originalPositions[iz];

                // Noise/Wave displacement
                const offset = Math.sin(time * 2 + ox * 1.5 + oy * 1.5) * 0.15;
                
                positions[ix] = ox + offset * (ox / 2.5);
                positions[iy] = oy + offset * (oy / 2.5);
                positions[iz] = oz + offset * (oz / 2.5);
            }
            particleSystem.geometry.attributes.position.needsUpdate = true;

            // Subtle mouse follow
            particleSystem.position.x += (mouseX * 0.5 - particleSystem.position.x) * 0.05;
            particleSystem.position.y += (mouseY * 0.5 - particleSystem.position.y) * 0.05;
            
            core.position.x = particleSystem.position.x;
            core.position.y = particleSystem.position.y;
            coreWireframe.position.x = particleSystem.position.x;
            coreWireframe.position.y = particleSystem.position.y;

            renderer.render(scene, camera);
        };

        animate();

        window.addEventListener('resize', () => {
            if(canvasContainer) {
                camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
            }
        });
    }
}
