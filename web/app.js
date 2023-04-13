const sharedWorker = new SharedWorker('sharedWorker.js');
sharedWorker.port.onmessage = (event) => {
    console.log('[app][onmessage]:', event.data);

    const unhandedMessages = ['connected', 'disconnected', 'reconnected'];

    if (unhandedMessages.includes(event.data)) handleEvents(event.data);
    else handleMessages(event.data);
};

function handleEvents(event) {
    if (event === 'connected') {
        console.log('[app][handleEvents]: connected');
        clearMessagesLocalStorage();
    } else if (event === 'disconnected') {
        console.log('[app][handleEvents]: disconnected');
    } else if (event === 'reconnected') {
        console.log('[app][handleEvents]: reconnected');
        showMessagesLocalStorage();
    }
}

function clearMessagesLocalStorage() {
    localStorage.setItem('messages', JSON.stringify([]));
}

function showMessagesLocalStorage() {
    const messages = JSON.parse(localStorage.getItem('messages'));
    messages.map((message) => addMessageToView(message));
}

function handleMessages(message) {
    console.log('[app][handleMessages]:', message);
    addMessageToView(message);
    addMessageToLocalStorage(message);
}

function addMessageToView(message) {
    const messages = document.getElementById('messages');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(message));
    messages.appendChild(li);
}

function addMessageToLocalStorage(message) {
    const messages = JSON.parse(localStorage.getItem('messages'));
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
}

// Button
const btnEnviar = document.getElementById('send');
btnEnviar.addEventListener('click', () => {
    if (sharedWorker) sharedWorker.port.postMessage('Ping!');
});