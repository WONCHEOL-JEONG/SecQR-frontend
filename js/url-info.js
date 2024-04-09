// URL을 새 창에 열기 위한 함수
function openURLInNewTab(url) {
    window.open(url, '_blank');
}

// 검색 버튼 클릭 시 동작할 함수
document.getElementById('submitUrlButton').addEventListener('click', function () {
    var url = document.getElementById('urlInput').value;
    openURLInNewTab(url);
});

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

    const infoButton = document.getElementById('info-button');
    const infoText = document.getElementById('info-text');

    infoButton.addEventListener('click', function () {
        const urlBox = document.getElementById('urlInput');
        if (urlBox.value.trim() === '') {
            // 입력된 URL이 없는 경우 삼각형 버튼 클릭해도 아무것도 안 뜨게 함
            infoText.style.display = 'none';
        } else {
            // 입력된 URL이 있는 경우에만 연습 텍스트 1 표시
            if (infoText.style.display === 'block') {
                // 연습 텍스트가 이미 보이는 상태이면 다시 숨김
                infoText.style.display = 'none';
            } else {
                // 연습 텍스트가 숨겨진 상태이면 보이게 함
                infoText.style.display = 'block';
            }
        }
    });
});
