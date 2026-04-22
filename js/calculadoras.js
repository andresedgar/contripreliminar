/* ============================================
   El Contribuyente — Calculadoras JavaScript
   ============================================ */

(function() {
  'use strict';

  // ─────────────────────────────────────────
  // IVA CALCULATOR
  // ─────────────────────────────────────────

  // Elements
  const tipoTabs = document.querySelectorAll('.calculator__tab');
  const tipoHint = document.getElementById('tipo-hint');
  const tasaRadios = document.querySelectorAll('input[name="tasa"]');
  const montoInput = document.getElementById('monto');
  const montoError = document.getElementById('monto-error');
  const calcularBtn = document.getElementById('calcular-btn');
  const resultsPanel = document.getElementById('results');
  const limpiarBtn = document.getElementById('limpiar-btn');

  // Result elements
  const resultSinIva = document.getElementById('result-sin-iva');
  const resultIva = document.getElementById('result-iva');
  const resultTasa = document.getElementById('result-tasa');
  const resultTotal = document.getElementById('result-total');

  // State
  let tipoOperacion = 'agregar';

  // Currency formatter
  const formatCurrency = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  // Hint texts
  const hints = {
    agregar: 'Calcular precio final con IVA incluido',
    desglosar: 'Extraer el IVA de un precio que ya lo incluye'
  };

  // ─────────────────────────────────────────
  // CALCULATION LOGIC
  // ─────────────────────────────────────────

  function calcularIVA(monto, tasa, tipo) {
    const tasaDecimal = tasa / 100;

    if (tipo === 'agregar') {
      const iva = monto * tasaDecimal;
      const total = monto + iva;
      return { sinIva: monto, iva: iva, total: total };
    }

    if (tipo === 'desglosar') {
      const sinIva = monto / (1 + tasaDecimal);
      const iva = monto - sinIva;
      return { sinIva: sinIva, iva: iva, total: monto };
    }

    return null;
  }

  // ─────────────────────────────────────────
  // INPUT VALIDATION
  // ─────────────────────────────────────────

  function parseMontoInput(value) {
    // Remove currency symbols, spaces, and convert comma to dot
    const cleaned = value
      .replace(/[$,\s]/g, '')
      .replace(',', '.');

    const number = parseFloat(cleaned);

    if (isNaN(number) || number <= 0) {
      return null;
    }

    return number;
  }

  function validateMonto() {
    const value = montoInput.value.trim();

    if (!value) {
      showError('Ingresa un monto');
      return false;
    }

    const monto = parseMontoInput(value);

    if (monto === null) {
      showError('Ingresa un monto valido mayor a 0');
      return false;
    }

    hideError();
    return true;
  }

  function showError(message) {
    montoError.textContent = message;
    montoError.hidden = false;
    montoInput.classList.add('calculator__input--error');
  }

  function hideError() {
    montoError.hidden = true;
    montoInput.classList.remove('calculator__input--error');
  }

  // ─────────────────────────────────────────
  // UI UPDATES
  // ─────────────────────────────────────────

  function updateTabs(selectedTipo) {
    tipoTabs.forEach(tab => {
      const isActive = tab.dataset.tipo === selectedTipo;
      tab.classList.toggle('calculator__tab--active', isActive);
      tab.setAttribute('aria-selected', isActive);
    });

    tipoOperacion = selectedTipo;

    if (tipoHint) {
      tipoHint.textContent = hints[selectedTipo];
    }
  }

  function showResults(resultado, tasa) {
    resultSinIva.textContent = formatCurrency.format(resultado.sinIva);
    resultIva.textContent = formatCurrency.format(resultado.iva);
    resultTasa.textContent = tasa;
    resultTotal.textContent = formatCurrency.format(resultado.total);

    resultsPanel.hidden = false;

    // Scroll to results on mobile
    if (window.innerWidth < 768) {
      resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function hideResults() {
    resultsPanel.hidden = true;
  }

  function limpiarFormulario() {
    montoInput.value = '';
    hideError();
    hideResults();
    montoInput.focus();
  }

  // ─────────────────────────────────────────
  // EVENT HANDLERS
  // ─────────────────────────────────────────

  function handleTabClick(event) {
    const tab = event.currentTarget;
    const tipo = tab.dataset.tipo;

    if (tipo && tipo !== tipoOperacion) {
      updateTabs(tipo);
      hideResults();
    }
  }

  function handleCalcular() {
    if (!validateMonto()) {
      return;
    }

    const monto = parseMontoInput(montoInput.value);
    const tasaRadio = document.querySelector('input[name="tasa"]:checked');
    const tasa = tasaRadio ? parseInt(tasaRadio.value, 10) : 16;

    const resultado = calcularIVA(monto, tasa, tipoOperacion);

    if (resultado) {
      showResults(resultado, tasa);
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleCalcular();
    }
  }

  function handleMontoInput(event) {
    // Allow only numbers, dots, and commas
    let value = event.target.value;

    // Remove any character that's not a digit, dot, or comma
    value = value.replace(/[^\d.,]/g, '');

    // Ensure only one decimal separator
    const parts = value.split(/[.,]/);
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }

    event.target.value = value;

    // Hide error when user starts typing
    if (montoInput.classList.contains('calculator__input--error')) {
      hideError();
    }
  }

  // ─────────────────────────────────────────
  // INITIALIZATION
  // ─────────────────────────────────────────

  function init() {
    // Check if we're on the calculator page
    if (!calcularBtn) {
      return;
    }

    // Tab clicks
    tipoTabs.forEach(tab => {
      tab.addEventListener('click', handleTabClick);
    });

    // Calculate button
    calcularBtn.addEventListener('click', handleCalcular);

    // Clear button
    if (limpiarBtn) {
      limpiarBtn.addEventListener('click', limpiarFormulario);
    }

    // Input events
    if (montoInput) {
      montoInput.addEventListener('keypress', handleKeyPress);
      montoInput.addEventListener('input', handleMontoInput);
    }

    // Radio change - hide results when tasa changes
    tasaRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        if (!resultsPanel.hidden) {
          // Recalculate with new tasa
          handleCalcular();
        }
      });
    });

    // Initial state
    updateTabs('agregar');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
