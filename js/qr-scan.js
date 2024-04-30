function addButtonClickHandler(buttonId, targetPage) {
    document.getElementById(buttonId).addEventListener('click', function () {
        window.location.href = targetPage;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // 각 버튼에 대한 이벤트 핸들러 추가
    addButtonClickHandler('scan', 'qr-scan.html');
    addButtonClickHandler('document', 'url-info.html');
    addButtonClickHandler('qrcode', 'generate.html');
    addButtonClickHandler('history', 'history.html');

    // 클립보드 버튼 이벤트 핸들러
    document.querySelector('.clipboard-button').addEventListener('click', function () {
        // 클립보드 버튼 클릭 시 실행될 코드
        document.getElementById('pasteArea').style.display = 'block'; // pasteArea 요소를 표시
        document.getElementById('clipboardImage').style.display = 'block'; // clipboardImage 요소를 표시
        document.getElementById('canvas_for_ImageData').style.display = 'block'; // canvas_for_ImageData 요소를 표시
        document.getElementById('decodeResult').style.display = 'block'; // decodeResult 요소를 표시
        document.getElementById('button_OpenUrl').style.display = 'block'; // button_OpenUrl 요소를 표시
    });

    const fileInput = document.getElementById('file-upload');
    const fileUploadButton = document.querySelector('.fileupload-button');
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const urlInput = document.getElementById('urlInput');

    fileUploadButton.addEventListener('click', function () {
        fileInput.click();
    });

    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const image = new Image();
                image.onload = function () {
                    qrCodeContainer.innerHTML = ''; // 이전 내용 지우기
                    qrCodeContainer.appendChild(image);
                    if (isQRCode(image)) {
                        decodeQRCode(image); // 이미지 표시 후 QR 코드 해독
                    } else {
                        urlInput.value = ''; // QR 코드가 아닌 경우 URL 입력 초기화
                    }
                };
                image.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    let elem = document.getElementById('pasteArea');
    if (elem) {
        elem.addEventListener('click', (e) => {
            elem.style.backgroundColor = '#D5FFD1';
        });
    }

    elem.addEventListener('paste', function (e) {
        if (!e.clipboardData || !e.clipboardData.items) return;

        // 클립보드에서 이미지를 가져옵니다.
        for (let i = 0; i < e.clipboardData.items.length; i++) {
            if (e.clipboardData.items[i].type.indexOf('image') !== -1) {
                let imageFile = e.clipboardData.items[i].getAsFile();
                const reader = new FileReader();
                reader.onload = function (event) {
                    const image = new Image();
                    image.onload = function () {
                        qrCodeContainer.innerHTML = ''; // 이전 내용 지우기
                        qrCodeContainer.appendChild(image);
                        if (isQRCode(image)) {
                            decodeQRCode(image); // 이미지 표시 후 QR 코드 해독
                        } else {
                            urlInput.value = ''; // QR 코드가 아닌 경우 URL 입력 초기화
                        }
                    };
                    image.src = event.target.result;
                };
                reader.readAsDataURL(imageFile);
            }
        }
    });

    let button_newTab = document.querySelector('#button_OpenUrl');
    button_newTab.addEventListener('click', (e) => {
        let url = urlInput.value;
        if (url === '') {
            return;
        }
        window.open(url, '_blank');
    });

    // QR 코드 이미지를 디코딩하여 URL을 추출하는 함수
    function decodeQRCode(image) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
            urlInput.value = code.data;
        } else {
            console.error('QR 코드를 디코딩할 수 없습니다.');
        }
    }

    // 스캔 버튼 클릭 시 QR 코드 디코딩 수행
    document.getElementById('scan').addEventListener('click', function () {
        const qrCodeImage = qrCodeContainer.querySelector('img');
        if (qrCodeImage) {
            decodeQRCode(qrCodeImage);
        } else {
            console.error('No QR code image found.');
        }
    });

    // 이미지가 QR 코드인지 확인하는 함수
    function isQRCode(image) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        return jsQR(imageData.data, imageData.width, imageData.height) !== null;
    }
});
