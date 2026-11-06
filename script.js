// Funciones de Navegación y Login
function login() {
    document.getElementById('view-login').classList.add('hidden-view');
    document.getElementById('view-app').classList.remove('hidden-view');
    switchView('view-clinica');
}

function logout() {
    document.getElementById('view-app').classList.add('hidden-view');
    document.getElementById('view-login').classList.remove('hidden-view');
}

// Función principal para cambiar de pantallas dentro de HSI
function switchView(viewId) {
    const views = ['view-clinica', 'view-ficha', 'view-dashboard'];
    
    // Ocultar todas las vistas
    views.forEach(v => {
        document.getElementById(v).classList.add('hidden-view');
    });
    
    // Mostrar solo la vista seleccionada
    document.getElementById(viewId).classList.remove('hidden-view');
    
    // Renderizar el gráfico solo si entra al dashboard
    if (viewId === 'view-dashboard') {
        initChart();
    }
}

// Lógica de la Consulta Clínica y Detección de ENO
function guardarEvolucion() {
    const select = document.getElementById('diagnostico');
    
    // Dispara el modal de alerta si es evento de notificación obligatoria
    if (select.value.startsWith('eno_')) {
        document.getElementById('modal-alerta').classList.remove('hidden-view');
    } else if (select.value === "") {
        alert("Por favor seleccione un diagnóstico.");
    } else {
        alert("Evolución clínica guardada exitosamente (No requiere ficha).");
    }
}

function cerrarModal() {
    document.getElementById('modal-alerta').classList.add('hidden-view');
    document.getElementById('diagnostico').value = ""; // Reiniciar selector
}

function abrirFicha() {
    document.getElementById('modal-alerta').classList.add('hidden-view');
    switchView('view-ficha');
}

function notificarFicha() {
    // Actualizar indicador en el Dashboard sumando la nueva ficha
    document.getElementById('kpi-fichas').innerText = "25";
    document.getElementById('kpi-badge').classList.remove('hidden-view');
    
    // Redirigir al módulo de vigilancia epidemiológica
    switchView('view-dashboard');
}

// Lógica para el gráfico de Corredores Endémicos (Chart.js)
let chartInstance = null;

function initChart() {
    // Evitar que el gráfico se duplique al recargar la vista
    if (chartInstance) {
        chartInstance.destroy();
    }
    
    const ctx = document.getElementById('corredorChart').getContext('2d');
    const labels = ['SE 40', 'SE 41', 'SE 42', 'SE 43', 'SE 44', 'SE 45'];
    
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Casos Reales 2026',
                    data: [5, 12, 25, 42, 65, 80], // Pico en la semana actual
                    borderColor: '#ef4444', 
                    backgroundColor: '#ef4444',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: false,
                    zIndex: 10
                },
                {
                    label: 'Zona de Alarma',
                    data: [30, 35, 40, 45, 50, 55],
                    borderColor: '#f97316',
                    backgroundColor: 'rgba(249, 115, 22, 0.2)',
                    fill: '-1',
                    tension: 0.3
                },
                {
                    label: 'Zona de Seguridad',
                    data: [15, 18, 22, 25, 28, 30],
                    borderColor: '#eab308',
                    backgroundColor: 'rgba(234, 179, 8, 0.2)',
                    fill: '-1',
                    tension: 0.3
                },
                {
                    label: 'Zona de Éxito',
                    data: [5, 6, 8, 10, 12, 15],
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.2)',
                    fill: 'start',
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            },
            scales: {
                y: { 
                    beginAtZero: true, 
                    title: { display: true, text: 'Nº de Casos' } 
                }
            }
        }
    });
}