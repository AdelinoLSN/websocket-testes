const sharedWorker = new SharedWorker('sharedWorker.js');
sharedWorker.port.onmessage = (event) => {
    console.log('index: onmessage', event.data);
};

// Button
const btnEnviar = document.getElementById('send');
btnEnviar.addEventListener('click', () => {
    if (sharedWorker) sharedWorker.port.postMessage('Ping!');
});