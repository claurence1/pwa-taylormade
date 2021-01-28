const urlB64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

// Clé public du server
const vapidPublicKey = 'BNANPi8bmsrs4-wBjl_Et7dDewZWSHjYKKZuoDvZai1fvnhS282gY_PdYl38DXs4pS-FORfya5jkOs1dMkjpTHY';

// Encodage de la clé
const options = {
    applicationServerKey: urlB64ToUint8Array(vapidPublicKey),
    userVisibleOnly: true,
};

window.addEventListener('load', (e) => {
    const message = document.getElementById('offline-message');
    if (navigator.onLine) {
        message.style.display = 'none';
    } else {
        message.style.display = 'block';
    }
});

window.addEventListener('online', (event) => {
    console.log('online');
    document.getElementById('offline-message').style.display = 'none';
});

window.addEventListener('offline', (event) => {
    console.log('offline');
    document.getElementById('offline-message').style.display = 'block';
});

window.addEventListener('load', (e) => {
    console.log(
        'match media result :',
        window.matchMedia('(display-mode: standalone)')
    );
    if (window.matchMedia('(display-mode: standalone)').matches) {
        document.getElementById('install_button').style.display = 'none';
    }

    navigator.serviceWorker.ready.then(async (serviceWorkerRegistration) => {
        const subscription = await serviceWorkerRegistration.pushManager.subscribe(
            options
        );

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/sub', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(subscription));
    });
});

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    let deferredPrompt = e;
    const installButton = document.getElementById('install_button');

    installButton.addEventListener('click', (e) => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('A2HS prompt accepted');
            } else {
                console.log('A2HS prompt declined');
            }
            deferredPrompt = null;
        });
        installButton.style.display = 'none';
    });
});