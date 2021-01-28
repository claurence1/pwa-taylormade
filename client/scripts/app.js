window.addEventListener("load", (e) => {
    const message = document.getElementById('offline-message');
    if(navigator.onLine) {
        message.style.display = "none";
    } else {
        message.style.display = "block";
    }
});

window.addEventListener('online', event => { 
    console.log("online");
    document.getElementById('offline-message').style.display = "none";
});

window.addEventListener('offline', event => { 
    console.log("offline");
    document.getElementById('offline-message').style.display = "block";
});

window.addEventListener('load', (e) => {
    console.log("match media result :", window.matchMedia('(display-mode: standalone)'));   
    if (window.matchMedia('(display-mode: standalone)').matches) {
        document.getElementById('install_button').style.display = 'none';
    }
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
