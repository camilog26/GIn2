document.addEventListener('DOMContentLoaded', () => {
    // Asegurar que la página comience desde arriba
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    // Inicializar AOS con configuración optimizada
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        delay: 100,
        easing: 'ease-out'
    });

    // Configuración de particles.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#8b4513'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.3,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#8b4513',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 3
                }
            }
        },
        retina_detect: true
    });

    // Manejo del loader con mensaje "Iniciando el Conocimiento"
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    let progress = 0;

    const loadingInterval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress > 100) progress = 100;
        
        if (loadingProgress) {
            loadingProgress.style.width = `${progress}%`;
        }

        if (progress === 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                if (loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        document.body.style.overflow = 'visible';
                        AOS.refresh();
                    }, 500);
                }
            }, 800);
        }
    }, 200);

    // Sistema de rankings con animaciones
    const updateRankings = () => {
        const rankingsList = document.getElementById('rankings-list');
        if (!rankingsList) return;

        const dummyRankings = [
            { position: 1, team: 'Los Historiadores', points: 1500 },
            { position: 2, team: 'Guardianes del Patrimonio', points: 1350 },
            { position: 3, team: 'Cronistas de Buga', points: 1200 },
            { position: 4, team: 'Defensores Culturales', points: 1050 },
            { position: 5, team: 'Herederos de la Historia', points: 900 }
        ];

        rankingsList.innerHTML = '';
        dummyRankings.forEach((ranking, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><span class="position">#${ranking.position}</span></td>
                <td>${ranking.team}</td>
                <td><span class="points">${ranking.points} pts</span></td>
            `;
            tr.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
            rankingsList.appendChild(tr);
        });
    };

    // Inicializar rankings
    updateRankings();

    // Botón de actualizar rankings con animación
    const refreshRankingsBtn = document.getElementById('refresh-rankings');
    if (refreshRankingsBtn) {
        refreshRankingsBtn.addEventListener('click', () => {
            refreshRankingsBtn.classList.add('rotating');
            setTimeout(() => {
                updateRankings();
                refreshRankingsBtn.classList.remove('rotating');
            }, 1000);
        });
    }

    // Efecto de máquina de escribir mejorado
    const typewriterText = document.querySelector('.typewriter');
    if (typewriterText) {
        const text = typewriterText.textContent;
        typewriterText.textContent = '';
        let i = 0;

        setTimeout(() => {
            const typeWriter = () => {
                if (i < text.length) {
                    typewriterText.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            typeWriter();
        }, 1500);
    }

    // Sistema de modales mejorado
    const modalContainer = document.getElementById('modal-container');
    const registerBtn = document.getElementById('registerBtn');
    const loginBtn = document.getElementById('loginBtn');
    const closeModalBtn = document.querySelector('.close-modal');

    const showModal = (content, title) => {
        if (modalContainer) {
            modalContainer.style.display = 'flex';
            const modal = modalContainer.querySelector('.modal');
            const modalTitle = modal.querySelector('.modal-header h3');
            const modalContent = modal.querySelector('.modal-content');
            
            if (modalTitle) modalTitle.textContent = title;
            if (modalContent) modalContent.innerHTML = content;

            setTimeout(() => {
                modal.style.opacity = '1';
                modal.style.transform = 'scale(1)';
            }, 10);
        }
    };

    const hideModal = () => {
        const modal = modalContainer.querySelector('.modal');
        if (modal) {
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.95)';
            setTimeout(() => {
                modalContainer.style.display = 'none';
            }, 300);
        }
    };

    // Formulario de registro mejorado
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            showModal(`
                <form id="registerForm" class="registration-form">
                    <div class="form-group">
                        <label for="teamName">Nombre del Equipo</label>
                        <input type="text" id="teamName" name="teamName" required>
                    </div>
                    <div class="form-group">
                        <label for="school">Institución Educativa</label>
                        <input type="text" id="school" name="school" required>
                    </div>
                    <div class="form-group">
                        <label for="teacher">Docente Responsable</label>
                        <input type="text" id="teacher" name="teacher" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Celular de Contacto</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>
                    <button type="submit" class="vintage-button primary">
                        <i class="fas fa-check"></i>
                        <span>Registrar Equipo</span>
                    </button>
                </form>
            `, 'Registro de Equipo');
        });
    }

    // Formulario de login mejorado
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            showModal(`
                <form id="loginForm" class="login-form">
                    <div class="form-group">
                        <label for="team">Nombre del Equipo</label>
                        <input type="text" id="team" name="team" required>
                    </div>
                    <div class="form-group">
                        <label for="code">Código de Acceso</label>
                        <input type="password" id="code" name="code" required>
                    </div>
                    <button type="submit" class="vintage-button primary">
                        <i class="fas fa-sign-in-alt"></i>
                        <span>Ingresar</span>
                    </button>
                </form>
            `, 'Ingreso al Juego');
        });
    }

    // Eventos del modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', hideModal);
    }

    // Cerrar modal con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') hideModal();
    });

    // Cerrar modal al hacer clic fuera
    if (modalContainer) {
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) hideModal();
        });
    }

    // Animaciones de los pasos
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.addEventListener('mouseenter', () => {
            const icon = step.querySelector('.step-icon');
            if (icon) {
                icon.style.transform = 'rotate(360deg)';
            }
        });

        step.addEventListener('mouseleave', () => {
            const icon = step.querySelector('.step-icon');
            if (icon) {
                icon.style.transform = 'rotate(0)';
            }
        });
    });

    // Manejo de formularios
    document.addEventListener('submit', (e) => {
        if (e.target.id === 'registerForm' || e.target.id === 'loginForm') {
            e.preventDefault();
            // Aquí iría la lógica de envío del formulario
            setTimeout(() => {
                hideModal();
            }, 1000);
        }
    });
});