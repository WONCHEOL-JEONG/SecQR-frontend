document.getElementById('scan-button').addEventListener('click', function () {
    const button1 = document.getElementById('openurl-container');
    button1.addEventListener('click', function () {
        const newPageURL = 'qr-scan.html';
        chrome.tabs.create({ url: chrome.runtime.getURL(newPageURL) });
    });
});
