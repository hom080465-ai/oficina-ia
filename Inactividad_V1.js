// CONFIGURACIÓN DE TIEMPOS (Cambiá estos valores como quieras)
const TIEMPO_TOTAL = 1 * 60 * 1000;       
const TIEMPO_AVISO = 0.5 * 60 * 1000;       
const TIEMPO_BEEP = 10 * 1000; // Definí acá los segundos en que empieza el sonido

let temporizadorAviso;
let intervaloContador;
let audioCtx = null; // Guardará el contexto de audio una vez activado por el usuario

// Cálculo automático de la diferencia en segundos para el inicio del cartel
const segundosIniciales = (TIEMPO_TOTAL - TIEMPO_AVISO) / 1000;
const segundosParaBeep = TIEMPO_BEEP / 1000;

// 1. Crear el cartel flotante dinámicamente con la nueva estética azul empresarial
const cartel = document.createElement('div');
cartel.id = 'cartel-inactividad';
cartel.innerHTML = `
    <div style="background: #ffffff; padding: 30px; border-radius: 10px; text-align: center; box-shadow: 0 10px 25px rgba(11,30,54,0.25); max-width: 420px; font-family: 'Segoe UI', sans-serif; border-top: 6px solid #1d4ed8;">
        <h3 style="margin-top: 0; color: #0b1e36; font-size: 22px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">¡Tu sesión está por expirar!</h3>
        <p style="color: #4a5568; margin-top: 10px; font-size: 15px; line-height: 1.5;">Has estado inactivo. La página se desactivará en:</p>
        <div id="cuenta-regresiva" style="font-size: 45px; font-weight: 800; margin: 15px 0; color: #1d4ed8;">${segundosIniciales}s</div>
        <button id="btn-continuar" style="background: #0b1e36; color: white; border: none; padding: 14px 25px; font-size: 15px; border-radius: 6px; cursor: pointer; font-weight: 700; width: 100%; transition: background 0.2s; box-shadow: 0 4px 12px rgba(11,30,54,0.2);">Continuar trabajando</button>
    </div>
`;

Object.assign(cartel.style, {
    position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
    background: 'rgba(11, 30, 54, 0.7)', display: 'none', justifyContent: 'center',
    alignItems: 'center', zIndex: '99999'
});

document.body.appendChild(cartel);

// 2. Redirección al cumplirse el tiempo
function cerrarSesion() {
    window.location.href = "Inactividad.html";
}

// 3. Cuenta regresiva secuencial y unificada
function mostrarAviso() {
    cartel.style.display = 'flex'; 
    let tiempoRestante = Math.max(0, (TIEMPO_TOTAL - TIEMPO_AVISO) / 1000); 
    
    const contadorTexto = document.getElementById('cuenta-regresiva');
    contadorTexto.innerText = `${tiempoRestante}s`;

    if (tiempoRestante <= segundosParaBeep && tiempoRestante > 0) {
        playBeep();
    }

    clearInterval(intervaloContador);
    intervaloContador = setInterval(() => {
        tiempoRestante--;
        
        if (tiempoRestante <= 0) {
            contadorTexto.innerText = "0s";
            clearInterval(intervaloContador);
            cerrarSesion();
            return;
        }

        contadorTexto.innerText = `${tiempoRestante}s`;

        if (tiempoRestante <= segundosParaBeep) {
            playBeep();
        }
    }, 1000);
}

// FUNCIÓN AUXILIAR: Genera el pitido saltando bloqueos de seguridad del navegador
function playBeep() {
    try {
        // Inicializa el contexto de audio solo si no existe
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        // Si el navegador lo dejó en pausa por seguridad, intenta reanudarlo
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'sine'; 
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // Tono de la alerta
        gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime); // Volumen al 12%

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.15); // Pitido corto de 150ms
    } catch (e) {
        console.log("El navegador restringió el audio automático de este segundo.");
    }
}

// 4. Control del temporizador de aviso inicial y activación de audio
function reiniciarTemporizadores() {
    if (cartel.style.display === 'flex') return;

    clearTimeout(temporizadorAviso);
    clearInterval(intervaloContador);

    // Intenta activar el motor de audio de forma nativa ante cualquier interacción del usuario
    if (!audioCtx) {
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch(e) {}
    } else if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
    }

    temporizadorAviso = setTimeout(mostrarAviso, TIEMPO_AVISO);
}

// 5. Botón para reactivar la sesión
document.getElementById('btn-continuar').addEventListener('click', () => {
    cartel.style.display = 'none'; 
    reiniciarTemporizadores();     
});

// 6. Monitoreo de actividad
function iniciarMonitoreo() {
    const eventos = ['mousemove', 'keypress', 'click', 'scroll', 'touchstart'];
    eventos.forEach(evento => document.addEventListener(evento, reiniciarTemporizadores));
    reiniciarTemporizadores();
}

document.addEventListener("DOMContentLoaded", iniciarMonitoreo);