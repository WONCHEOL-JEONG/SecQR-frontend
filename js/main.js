// main.js

// 공통 이벤트 핸들러 함수
function addButtonClickHandler(buttonId, targetPage) {
    document.getElementById(buttonId).addEventListener('click', function () {
        window.location.href = targetPage;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // 각 버튼에 대한 이벤트 핸들러 추가
    addButtonClickHandler('scan', 'qr-scan.html');
    addButtonClickHandler('document', 'url-info.html');
    addButtonClickHandler('qrcode', 'qr-generate.html');
    addButtonClickHandler('history', 'history.html');
});

document.getElementById('checkbox').addEventListener('click', function () {
    var checkbox = document.getElementById('agree');
    checkbox.classList.toggle('checked');
});
