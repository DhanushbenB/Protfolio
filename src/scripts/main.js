const initializePage = () => {
    const yearElement = document.getElementById('year');

    const modal = document.getElementById('project-modal');
    const modalIframe = document.getElementById('project-iframe');

    if (modal && modalIframe) {
        modal.hidden = true;
        modal.style.display = 'none';
        modalIframe.src = '';
    }

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const modalClose = modal?.querySelector('.modal-close');
    const demoButtons = document.querySelectorAll('.project-demo-btn');
    const viewMoreButtons = document.querySelectorAll('.view-more-btn');

    const openModal = (demoUrl) => {
        if (modal && modalIframe && demoUrl) {
            modalIframe.src = demoUrl;
            modal.hidden = false;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = () => {
        if (modal && modalIframe) {
            modal.hidden = true;
            modal.style.display = 'none';
            modalIframe.src = '';
            document.body.style.overflow = '';
        }
    };

    demoButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const demoUrl = button.getAttribute('data-demo-url');
            openModal(demoUrl);
        });
    });

    modalClose?.addEventListener('click', (event) => {
        event.stopPropagation();
        closeModal();
    });

    modal?.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    viewMoreButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const targetSelector = button.getAttribute('data-target');
            const targetEntries = document.querySelectorAll(targetSelector || '.extra-entry');

            targetEntries.forEach((entry) => {
                entry.hidden = !entry.hidden;
            });

            button.textContent = button.textContent === 'View More' ? 'View Less' : 'View More';
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal && !modal.hidden) {
            closeModal();
        }
    });

    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    const submitButton = form?.querySelector('.submit-btn');

    if (!form || !status || !submitButton) {
        return;
    }

    const setStatus = (message, type = '') => {
        status.textContent = message;
        status.className = `form-status ${type}`.trim();
    };

    const setSubmitting = (isSubmitting) => {
        submitButton.disabled = isSubmitting;
        submitButton.textContent = isSubmitting ? 'Sending...' : 'Send Message';
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        setSubmitting(true);
        setStatus('Sending your message...');

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            });

            if (response.ok) {
                form.reset();
                setStatus('Thanks! Your message was sent successfully.', 'success');
            } else {
                throw new Error('Unable to send your message right now.');
            }
        } catch (error) {
            setStatus('Something went wrong. Please email me directly at dhanushben.b@gmail.com.', 'error');
        } finally {
            setSubmitting(false);
        }
    });
};

document.addEventListener('DOMContentLoaded', initializePage);
