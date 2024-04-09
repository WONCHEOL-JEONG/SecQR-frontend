document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('scan').addEventListener('click', function () {
        window.location.href = 'qr-scan.html';
    });

    document.getElementById('document').addEventListener('click', function () {
        window.location.href = 'url-info.html';
    });

    document.getElementById('qrcode').addEventListener('click', function () {
        window.location.href = 'generate.html';
    });

    document.getElementById('history').addEventListener('click', function () {
        // 버튼 4에 대한 동작
    });
});
