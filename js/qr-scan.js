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
        const pasteArea = document.getElementById('pasteArea');
        const isPasteAreaVisible = pasteArea.style.display === 'block';

        if (isPasteAreaVisible) {
            // pasteArea가 보이는 경우, 숨김
            pasteArea.style.display = 'none';
        } else {
            // pasteArea가 보이지 않는 경우, 표시
            pasteArea.style.display = 'block';
            // 기존에 qrCodeContainer에 표시된 사진이 있다면 삭제
            const existingImage = document.querySelector('#qrCodeContainer img');
            if (existingImage) {
                existingImage.parentNode.removeChild(existingImage);
            }
            // 기존의 URL 입력 초기화
            urlInput.value = '';
        }
    });

    // 파일 업로드 버튼 클릭 시 클립보드 버튼이 보이는 요소를 숨김
    document.getElementById('fileUploadButton').addEventListener('click', function () {
        // 클립보드 버튼이 보이는 요소를 숨김
        document.getElementById('pasteArea').style.display = 'none';
        // 기존에 qrCodeContainer에 표시된 사진이 있다면 삭제
        const existingImage = document.querySelector('#qrCodeContainer img');
        if (existingImage) {
            existingImage.parentNode.removeChild(existingImage);
        }
        // 파일 업로드를 초기화하여 동일한 파일을 선택할 수 있도록 함
        fileInput.value = '';
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
    document.getElementById('captureButton').addEventListener('click', function () {
        // pasteArea 요소를 숨김
        document.getElementById('pasteArea').style.display = 'none';
        // 기존에 qrCodeContainer에 표시된 사진이 있다면 삭제
        const existingImage = document.querySelector('#qrCodeContainer img');
        if (existingImage) {
            existingImage.parentNode.removeChild(existingImage);
        }

        // 현재 창의 스크린샷을 캡처
        chrome.tabs.captureVisibleTab(null, { format: 'png' }, function (dataUrl) {
            // 이미지 생성
            var img = new Image();
            img.src = dataUrl;
            img.onload = function () {
                // 이미지를 화면에 표시
                document.getElementById('qrCodeContainer').appendChild(img);

                // 캡처된 이미지에서 QR 코드 디코딩 및 URL 추출
                decodeQRCodeFromImage(img);
            };
        });
    });

    function decodeQRCodeFromImage(image) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
            // QR 코드 디코딩 성공 시 URL을 urlInput에 표시
            urlInput.value = code.data;
        } else {
            urlInput.value = '';
        }
    }

    document.getElementById('submitUrlButton').addEventListener('click', function () {
        var url = document.getElementById('urlInput').value;
        var isSafe = Math.random() < 0.5;
        var header = document.querySelector('.header');

        if (isSafe) {
            header.style.backgroundColor = 'green';
        } else {
            header.style.backgroundColor = 'red';
        }
    });
});
document.getElementById('checkbox').addEventListener('click', function () {
    var checkbox = document.getElementById('agree');
    checkbox.classList.toggle('checked');
});
