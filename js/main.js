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

document.querySelector('.clipboard-button').addEventListener('click', function() {
    // 클립보드 버튼을 클릭할 때 실행될 코드
    document.getElementById('pasteArea').style.display = 'block'; // pasteArea 요소를 표시
    document.getElementById('clipboardImage').style.display = 'block'; // clipboardImage 요소를 표시
    document.getElementById('canvas_for_ImageData').style.display = 'block'; // canvas_for_ImageData 요소를 표시
    document.getElementById('decodeResult').style.display = 'block'; // decodeResult 요소를 표시
    document.getElementById('button_OpenUrl').style.display = 'block'; // button_OpenUrl 요소를 표시
});