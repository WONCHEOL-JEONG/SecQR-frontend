document.getElementById('qrButton').addEventListener('click', function () {
    const button1 = document.getElementById('button1');
    button1.addEventListener('click', function () {
        const newPageURL = 'newpage.html';
        chrome.tabs.create({ url: chrome.runtime.getURL(newPageURL) });
    });
});

document.getElementById('button2').addEventListener('click', function () {
    // 버튼 2에 대한 동작
});

document.getElementById('button3').addEventListener('click', function () {
    // 버튼 3에 대한 동작
});

document.getElementById('button4').addEventListener('click', function () {
    // 버튼 4에 대한 동작
});
