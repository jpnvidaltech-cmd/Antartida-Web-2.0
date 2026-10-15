/**
 * AntartidaLabs - Core Application Script
 * Complies with Manual Funcional v1.1 (Chapters 3, 4, 6)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initJourneyTracker();
  initServiceCards();
  initContactForm();
});

/* ==========================================================================
   1. NAVIGATION & READING PROGRESS
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const progressBar = document.getElementById('reading-progress-bar');
  const navLinks = document.querySelectorAll('.site-nav .nav-link');
  const sections = ['inicio', 'propuesta', 'servicios', 'nosotros', 'contacto'];
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileToggle.setAttribute('aria-label', isOpen ? 'Cerrar navegación' : 'Abrir navegación');
      const icon = mobileToggle.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = isOpen ? 'close' : 'menu';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 'Abrir navegación');
        const icon = mobileToggle.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
      });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.focus();
      }
    });
  }

  // Reading progress and active link on scroll
  const onScroll = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;

    if (progressBar) {
      progressBar.style.width = scrollPercent + '%';
    }

    if (header) {
      if (scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Active link highlighting
    const headerOffset = 90;
    let currentSection = '';
    
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop - headerOffset;
        const height = el.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          currentSection = id;
        }
      }
    });

    // Bottom check: if scrolled to the very bottom, active is contacto
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
      currentSection = 'contacto';
    }

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#' + currentSection) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'location');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   2. JOURNEY TRACKER
   ========================================================================== */
function initJourneyTracker() {
  const journeyLine = document.getElementById('journey-line-progress');
  const percentageText = document.getElementById('journey-percentage-text');
  const steps = document.querySelectorAll('.journey-step');
  const sections = ['inicio', 'propuesta', 'servicios', 'nosotros', 'contacto'];

  const updateJourney = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.round(Math.min(100, Math.max(0, (scrollY / docHeight) * 100))) : 0;

    if (journeyLine) journeyLine.style.height = pct + '%';
    if (percentageText) percentageText.textContent = pct + '%';

    const headerOffset = 140;
    let activeIdx = 0;

    sections.forEach((id, index) => {
      const el = document.getElementById(id);
      if (el && scrollY >= el.offsetTop - headerOffset) {
        activeIdx = index;
      }
    });

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
      activeIdx = sections.length - 1;
    }

    steps.forEach((step, index) => {
      const dot = step.querySelector('.journey-dot');
      if (!dot) return;
      dot.classList.remove('active', 'passed');
      if (index === activeIdx) {
        dot.classList.add('active');
      } else if (index < activeIdx) {
        dot.classList.add('passed');
      }
    });
  };

  window.addEventListener('scroll', updateJourney, { passive: true });
  updateJourney();
}

/* ==========================================================================
   3. SERVICE CARDS & ACCORDION
   ========================================================================== */
function initServiceCards() {
  // Toggle detail accordion for all 19 cards
  const toggleButtons = document.querySelectorAll('.btn-toggle-detail');

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const targetId = btn.getAttribute('aria-controls');
      const panel = document.getElementById(targetId);
      const textSpan = btn.querySelector('.btn-toggle-text');

      if (panel) {
        if (isExpanded) {
          panel.classList.add('hidden');
          btn.setAttribute('aria-expanded', 'false');
          if (textSpan) textSpan.textContent = 'Ver detalle';
        } else {
          panel.classList.remove('hidden');
          btn.setAttribute('aria-expanded', 'true');
          if (textSpan) textSpan.textContent = 'Ocultar detalle';
        }
      }
    });
  });

  // Handle deep linking fragments on page load (#servicio-01 .. #servicio-19)
  if (window.location.hash) {
    const hash = window.location.hash;
    if (hash.startsWith('#servicio-')) {
      const targetCard = document.querySelector(hash);
      if (targetCard) {
        const toggleBtn = targetCard.querySelector('.btn-toggle-detail');
        if (toggleBtn && toggleBtn.getAttribute('aria-expanded') !== 'true') {
          toggleBtn.click();
        }
        setTimeout(() => {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
      }
    }
  }

  // Family filter buttons
  const filterButtons = document.querySelectorAll('.family-filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* ==========================================================================
   4. CONTACT FORM ENGINE (Chapter 6 Implementation)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const submitBtnText = document.getElementById('submit-btn-text');
  const submitSpinner = document.getElementById('submit-spinner');
  
  const nameInput = document.getElementById('contact-name');
  const orgInput = document.getElementById('contact-org');
  const emailInput = document.getElementById('contact-email');
  const serviceSelect = document.getElementById('contact-service');
  const messageInput = document.getElementById('contact-message');
  const honeypotInput = document.getElementById('contact-website');
  
  const submissionIdInput = document.getElementById('submission_id');
  const formTokenInput = document.getElementById('form_token');
  
  const errorSummary = document.getElementById('form-error-summary');
  const errorList = document.getElementById('form-error-list');
  const statusAlert = document.getElementById('form-status-alert');
  const successBox = document.getElementById('form-success-box');
  const formFieldsContainer = document.getElementById('form-fields-container');
  const resetFormBtn = document.getElementById('reset-form-btn');

  // Form State
  let contextData = {
    submission_id: '',
    form_token: '',
    expires_at: null,
    isReady: false
  };

  let rateLimitTimer = null;

  // 1. Fetch form context from GET /contacto/contexto
  async function fetchContext(retryCount = 0) {
    contextData.isReady = false;
    if (submitBtn) {
      submitBtn.disabled = true;
      if (submitBtnText) submitBtnText.textContent = 'Preparando formulario…';
    }

    try {
      const response = await fetch('/contacto/contexto', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      if (data.code === 'context_ready' && data.submission_id && data.form_token) {
        contextData.submission_id = data.submission_id;
        contextData.form_token = data.form_token;
        contextData.expires_at = new Date(data.expires_at);
        contextData.isReady = true;

        if (submissionIdInput) submissionIdInput.value = data.submission_id;
        if (formTokenInput) formTokenInput.value = data.form_token;

        if (submitBtn) {
          submitBtn.disabled = false;
          if (submitBtnText) submitBtnText.textContent = 'Enviar consulta';
        }
        hideAlert();
      } else {
        throw new Error('Respuesta de contexto inválida');
      }
    } catch (err) {
      console.warn('Error al preparar contexto:', err);
      if (submitBtn) {
        submitBtn.disabled = true;
        if (submitBtnText) submitBtnText.textContent = 'Formulario no disponible';
      }
      showAlert('El formulario no está disponible en este momento. Reintentando preparación...', 'warning');
      if (retryCount < 3) {
        setTimeout(() => fetchContext(retryCount + 1), 3000);
      }
    }
  }

  // Pre-fetch context on load
  fetchContext();

  // 2. Preselection handlers from CTAs across the page
  // "Solicitar información" in Service Cards
  document.querySelectorAll('[data-select-service]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceId = btn.getAttribute('data-select-service');
      if (serviceSelect && serviceId) {
        serviceSelect.value = serviceId;
        // Announce change to screen readers
        const opt = serviceSelect.options[serviceSelect.selectedIndex];
        if (opt) announceStatus(`Interés seleccionado: ${opt.text}`);
      }
      // Focus the select box
      setTimeout(() => {
        if (serviceSelect) serviceSelect.focus();
      }, 300);
    });
  });

  // "Consultar por AI Research LAB" in Propuesta
  document.querySelectorAll('[data-select-lab]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (serviceSelect) {
        serviceSelect.value = 'lab';
        announceStatus('Interés seleccionado: AI Research LAB — solución integrada');
        setTimeout(() => serviceSelect.focus(), 300);
      }
    });
  });

  // "Conversar sobre el proyecto" in Hero / Header / Nosotros
  document.querySelectorAll('[data-select-general]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (serviceSelect) {
        // If empty, set general. If already has a value, preserve it!
        if (!serviceSelect.value) {
          serviceSelect.value = 'general';
          announceStatus('Interés seleccionado: Consulta general');
        }
        setTimeout(() => serviceSelect.focus(), 300);
      }
    });
  });

  // 3. Client-side normalization & validation
  function normalizeText(text) {
    if (!text) return '';
    return text
      .normalize('NFC')
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .trim();
  }

  function countCodePoints(str) {
    return Array.from(str).length;
  }

  function validateEmail(email) {
    if (!email) return false;
    // Policy check: ASCII, local 1-64, domain labels 1-63, proper chars
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(email)) return false;
    if (email.length > 254) return false;
    return true;
  }

  function validateForm() {
    clearErrors();
    const errors = [];

    const nombreVal = normalizeText(nameInput.value);
    const nombreLen = countCodePoints(nombreVal);
    if (!nombreVal || nombreLen < 2) {
      errors.push({ field: 'contact-name', message: 'Ingresá tu nombre y apellido, entre 2 y 120 caracteres.' });
    } else if (nombreLen > 120) {
      errors.push({ field: 'contact-name', message: 'Usá hasta 120 caracteres para el nombre y apellido.' });
    }

    const orgVal = normalizeText(orgInput.value);
    const orgLen = countCodePoints(orgVal);
    if (orgLen > 160) {
      errors.push({ field: 'contact-org', message: 'Usá hasta 160 caracteres para la empresa o institución.' });
    }

    const emailVal = emailInput.value.trim();
    if (!emailVal) {
      errors.push({ field: 'contact-email', message: 'Ingresá tu correo electrónico.' });
    } else if (!validateEmail(emailVal)) {
      errors.push({ field: 'contact-email', message: 'Ingresá un correo válido de hasta 254 caracteres, por ejemplo nombre@institucion.org.' });
    }

    const interesVal = serviceSelect.value;
    const validIntereses = ['general', 'lab', '01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19'];
    if (!interesVal || !validIntereses.includes(interesVal)) {
      errors.push({ field: 'contact-service', message: 'Elegí un producto, servicio o motivo de consulta de la lista.' });
    }

    const msgVal = normalizeText(messageInput.value);
    const msgLen = countCodePoints(msgVal);
    if (!msgVal || msgLen < 10 || msgLen > 3000) {
      errors.push({ field: 'contact-message', message: 'Escribí un mensaje de entre 10 y 3000 caracteres.' });
    }

    return { isValid: errors.length === 0, errors };
  }

  function clearErrors() {
    if (errorSummary) errorSummary.classList.add('hidden');
    if (errorList) errorList.innerHTML = '';
    
    document.querySelectorAll('.field-error-msg').forEach(el => {
      el.textContent = '';
      el.classList.add('hidden');
    });

    [nameInput, orgInput, emailInput, serviceSelect, messageInput].forEach(inp => {
      if (inp) {
        inp.removeAttribute('aria-invalid');
      }
    });
  }

  function displayErrors(errors) {
    if (!errorSummary || !errorList) return;
    errorList.innerHTML = '';

    errors.forEach(err => {
      const field = document.getElementById(err.field);
      if (field) {
        field.setAttribute('aria-invalid', 'true');
        const errSpan = document.getElementById(`${err.field}-error`);
        if (errSpan) {
          errSpan.textContent = err.message;
          errSpan.classList.remove('hidden');
        }
      }

      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${err.field}`;
      a.textContent = err.message;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById(err.field);
        if (target) target.focus();
      });
      li.appendChild(a);
      errorList.appendChild(li);
    });

    errorSummary.classList.remove('hidden');
    errorSummary.focus();
  }

  // 4. Form Submission
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Check honeypot
      if (honeypotInput && honeypotInput.value) {
        console.warn('Bot detected via honeypot');
        showSuccess();
        return;
      }

      // Check client-side validation
      const validation = validateForm();
      if (!validation.isValid) {
        displayErrors(validation.errors);
        return;
      }

      // Check context availability
      if (!contextData.isReady || !contextData.submission_id || !contextData.form_token) {
        showAlert('El formulario se está preparando. Por favor aguardá unos segundos y volvé a intentar.', 'info');
        await fetchContext();
        return;
      }

      // Check context expiration
      if (contextData.expires_at && new Date() > contextData.expires_at) {
        showAlert('La sesión del formulario venció. Tus datos siguen disponibles. Volvé a enviar la consulta.', 'warning');
        await fetchContext();
        return;
      }

      // Prepare payload
      const payload = {
        nombre: normalizeText(nameInput.value),
        empresa: normalizeText(orgInput.value) || '',
        email: emailInput.value.trim().toLowerCase(),
        interes: serviceSelect.value,
        mensaje: normalizeText(messageInput.value),
        submission_id: contextData.submission_id,
        form_token: contextData.form_token,
        website: ''
      };

      // Set UI to "Enviando..."
      setSubmittingState(true);

      try {
        const response = await fetch('/contacto/consulta', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Contact-Intent': 'send'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.status === 200 && result.code === 'accepted') {
          showSuccess();
        } else if (response.status === 422 && result.errors) {
          // Validation error from server
          const serverErrors = Object.entries(result.errors).map(([fieldKey, msg]) => {
            let fieldId = 'contact-name';
            if (fieldKey === 'empresa') fieldId = 'contact-org';
            if (fieldKey === 'email') fieldId = 'contact-email';
            if (fieldKey === 'interes') fieldId = 'contact-service';
            if (fieldKey === 'mensaje') fieldId = 'contact-message';
            return { field: fieldId, message: msg };
          });
          displayErrors(serverErrors);
          setSubmittingState(false);
        } else if (response.status === 429) {
          // Rate limit
          const retryAfter = result.retry_after || 60;
          handleRateLimit(retryAfter);
          setSubmittingState(false);
        } else if (response.status === 403 && result.code === 'token_expired') {
          showAlert('La sesión del formulario venció. Tus datos siguen disponibles. Volvé a enviar la consulta.', 'warning');
          await fetchContext();
          setSubmittingState(false);
        } else if (response.status === 504 || result.code === 'uncertain') {
          showAlert('No pudimos confirmar el envío. Es posible que la consulta se haya enviado. Tus datos siguen disponibles.', 'warning');
          setSubmittingState(false);
        } else {
          const msg = result.message || 'No pudimos enviar tu consulta. Tus datos siguen en el formulario. Intentá nuevamente.';
          showAlert(msg, 'error');
          setSubmittingState(false);
        }
      } catch (err) {
        console.error('Error al enviar consulta:', err);
        showAlert('No pudimos confirmar el envío. Por favor verificá tu conexión e intentá nuevamente.', 'error');
        setSubmittingState(false);
      }
    });
  }

  function setSubmittingState(isSubmitting) {
    if (!submitBtn) return;
    submitBtn.disabled = isSubmitting;
    submitBtn.setAttribute('aria-busy', isSubmitting ? 'true' : 'false');
    if (submitSpinner) {
      if (isSubmitting) submitSpinner.classList.remove('hidden');
      else submitSpinner.classList.add('hidden');
    }
    if (submitBtnText) {
      submitBtnText.textContent = isSubmitting ? 'Enviando…' : 'Enviar consulta';
    }
    
    // Disable inputs while submitting
    [nameInput, orgInput, emailInput, serviceSelect, messageInput].forEach(inp => {
      if (inp) inp.readOnly = isSubmitting;
    });
  }

  function showSuccess() {
    clearErrors();
    hideAlert();
    if (formFieldsContainer) formFieldsContainer.classList.add('hidden');
    if (successBox) {
      successBox.classList.remove('hidden');
      successBox.focus();
    }
    announceStatus('Tu consulta fue enviada exitosamente.');
  }

  // Reset form handler
  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', () => {
      if (form) form.reset();
      clearErrors();
      hideAlert();
      if (successBox) successBox.classList.add('hidden');
      if (formFieldsContainer) formFieldsContainer.classList.remove('hidden');
      fetchContext();
      if (nameInput) nameInput.focus();
    });
  }

  function handleRateLimit(seconds) {
    let remaining = seconds;
    submitBtn.disabled = true;

    if (rateLimitTimer) clearInterval(rateLimitTimer);

    const updateTimer = () => {
      if (remaining <= 0) {
        clearInterval(rateLimitTimer);
        hideAlert();
        submitBtn.disabled = false;
        if (submitBtnText) submitBtnText.textContent = 'Enviar consulta';
        return;
      }

      const mins = Math.ceil(remaining / 60);
      const text = remaining >= 60 ? `${mins} minuto${mins > 1 ? 's' : ''}` : `${remaining} segundo${remaining > 1 ? 's' : ''}`;
      showAlert(`Alcanzaste el límite temporal de envíos. Esperá ${text} antes de reintentar.`, 'warning');
      remaining--;
    };

    updateTimer();
    rateLimitTimer = setInterval(updateTimer, 1000);
  }

  function showAlert(message, type = 'info') {
    if (!statusAlert) return;
    statusAlert.className = `form-alert form-alert-${type}`;
    statusAlert.innerHTML = `
      <span class="material-symbols-outlined text-[20px]">${type === 'warning' ? 'warning' : type === 'error' ? 'error' : 'info'}</span>
      <span>${message}</span>
    `;
    statusAlert.classList.remove('hidden');
  }

  function hideAlert() {
    if (statusAlert) statusAlert.classList.add('hidden');
  }

  function announceStatus(message) {
    const announcer = document.getElementById('screen-reader-announcer');
    if (announcer) {
      announcer.textContent = message;
    }
  }
}
