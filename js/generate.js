// generate.js

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
    const urlInput = document.getElementById('urlInput');
    const generateBtn = document.getElementById('generateBtn');
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const downloadContainer = document.getElementById('downloadContainer');

    generateBtn.addEventListener('click', function () {
        const url = urlInput.value.trim();
        if (url === '') {
            alert('URL을 입력하세요.');
            return;
        }
        // 둥근 네모 박스 생성
        const roundedBox = document.createElement('div');
        roundedBox.classList.add('rounded-box');

        // QR 코드 생성
        const qrCode = new QRCode(roundedBox, {
            text: url,
            width: 128,
            height: 128,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H,
        });

        // 기존 QR 코드 및 다운로드 버튼 제거
        qrCodeContainer.innerHTML = '';
        downloadContainer.innerHTML = '';

        // 둥근 네모 박스에 QR 코드 추가
        qrCodeContainer.appendChild(roundedBox);

        // 다운로드 버튼 생성
        const downloadBtn = document.createElement('a');
        downloadBtn.textContent = '다운로드';
        downloadBtn.href = qrCode._el.firstChild.toDataURL('image/png');
        downloadBtn.download = 'qr_code.png';
        downloadContainer.appendChild(downloadBtn);
    });
});
