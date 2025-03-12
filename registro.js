document.addEventListener('DOMContentLoaded', () => {
    // Validación de formularios
    const validateForm = (formData) => {
        const errors = [];
        
        for (let [key, value] of formData.entries()) {
            if (!value.trim()) {
                errors.push(`El campo ${key} es obligatorio`);
            }
        }

        // Validaciones específicas
        if (formData.has('phone')) {
            const phone = formData.get('phone');
            if (!/^[0-9]{10}$/.test(phone)) {
                errors.push('El número de celular debe tener 10 dígitos');
            }
        }

        return errors;
    };

    // Manejo del formulario de registro
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const errors = validateForm(formData);

        if (errors.length > 0) {
            // Mostrar errores
            const errorMessage = errors.join('\n');
            alert(errorMessage);
            return;
        }

        // Simulación de envío
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registrando...';
        submitButton.disabled = true;

        try {
            // Aquí iría la lógica real de registro
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Simular respuesta exitosa
            alert('¡Registro exitoso! Se ha enviado un código de acceso al docente responsable.');
            form.reset();
            hideModal();
        } catch (error) {
            alert('Error en el registro. Por favor intente nuevamente.');
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    };

    // Manejo del formulario de login
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const errors = validateForm(formData);

        if (errors.length > 0) {
            const errorMessage = errors.join('\n');
            alert(errorMessage);
            return;
        }

        // Simulación de login
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ingresando...';
        submitButton.disabled = true;

        try {
            // Aquí iría la lógica real de login
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Simular respuesta exitosa
            alert('¡Bienvenido al juego!');
            form.reset();
            hideModal();
            // Aquí iría la redirección al juego
        } catch (error) {
            alert('Error en el ingreso. Verifique sus credenciales.');
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    };

    // Evento para formularios dinámicos
    document.addEventListener('submit', (e) => {
        if (e.target.id === 'registerForm') {
            handleRegisterSubmit(e);
        } else if (e.target.id === 'loginForm') {
            handleLoginSubmit(e);
        }
    });

    // Función para esconder el modal (utilizada en los handlers)
    const hideModal = () => {
        const modalContainer = document.getElementById('modal-container');
        if (modalContainer) {
            const modal = modalContainer.querySelector('.modal');
            if (modal) {
                modal.style.opacity = '0';
                modal.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    modalContainer.style.display = 'none';
                }, 300);
            }
        }
    };

    // Mejoras en la experiencia de usuario
    document.addEventListener('input', (e) => {
        if (e.target.matches('input')) {
            e.target.classList.remove('error');
            const errorMessage = e.target.nextElementSibling;
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.remove();
            }
        }
    });

    // Validaciones en tiempo real
    const addLiveValidation = (input) => {
        input.addEventListener('blur', () => {
            const value = input.value.trim();
            const field = input.name;

            if (!value) {
                showError(input, `El campo ${field} es obligatorio`);
            } else if (field === 'phone' && !/^[0-9]{10}$/.test(value)) {
                showError(input, 'El número de celular debe tener 10 dígitos');
            }
        });
    };

    // Función para mostrar errores
    const showError = (input, message) => {
        input.classList.add('error');
        const existingError = input.nextElementSibling;
        if (existingError && existingError.classList.contains('error-message')) {
            existingError.textContent = message;
        } else {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        }
    };
});