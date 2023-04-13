const sharedWorker = new SharedWorker('sharedWorker.js');
sharedWorker.port.onmessage = (event) => {
    console.log('[app][onmessage]:', event.data);
    
    const events = ['connected', 'disconnected', 'reconnected'];
    if (events.includes(event.data)) handleEvent(event.data);
    else handleMessage(event.data);
};

function handleEvent(event) {
    if (['connected', 'reconnected'].includes(event)) {
        sharedWorker?.port.postMessage('messages');
    }
}

function handleMessage(message) {
    const notShow = ['messages'];
    if (notShow.includes(message)) return;

    if (typeof message === 'string') showMessage(message);

    if (typeof message === 'object') message.map((m) => showMessage(m));
}

function showMessage(message) {
    const messages = document.getElementById('messages');
    messages.innerHTML += `<li>${message}</li>`;
}

// Button
const btnEnviar = document.getElementById('send');
btnEnviar.addEventListener('click', () => {
    if (sharedWorker) sharedWorker.port.postMessage('Ping!');
});