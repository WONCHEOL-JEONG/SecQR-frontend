document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('file-upload');
    const fileUploadButton = document.querySelector('.fileupload-button');
    
    fileUploadButton.addEventListener('click', function () {
        fileInput.click();
    });

    fileInput.addEventListenser('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                // 이미지를 불러와서 사용하거나 처리하는 코드를 작성합니다.
                const image = new Image();
                image.src = e.target.result;
                document.body.appendChild(image); // 예시로 이미지를 body에 추가하는 예시입니다.
            };
            reader.readAsDataURL(file);
        }
    });
});

// document.getElementById('scan-button').addEventListener('click', function () {
//     const button1 = document.getElementById('openurl-container');
//     button1.addEventListener('click', function () {
//         const newPageURL = 'qr-scan.html';
//         chrome.tabs.create({ url: chrome.runtime.getURL(newPageURL) });
//     });
// });