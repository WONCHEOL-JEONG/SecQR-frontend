document.addEventListener('DOMContentLoaded', function() {
    // Navigate to main.html when left-arrow is clicked
    document.querySelector('.Topnav-left-arrow').addEventListener('click', function() {
        window.location.href = 'main.html';
    });

    // Open the URL in a new window when open-url icon is clicked
    document.querySelector('.Topnav-open-url').addEventListener('click', function() {
        const url = document.querySelector('.generate-url-input').value;
        if (url) {
            window.open(url, '_blank');
        } else {
            alert('Please enter a valid URL.');
        }
    });

    // Generate QR code and download it when generate-download-button is clicked
    document.querySelector('.generate-Download-button').addEventListener('click', function() {
        const url = document.querySelector('.generate-url-input').value;
        if (url) {
            // Generate QR code
            const qrCodeContainer = document.createElement('div');
            const qrCode = new QRCode(qrCodeContainer, {
                text: url,
                width: 128,
                height: 128
            });

            // Wait for QR code to be generated
            setTimeout(() => {
                const qrImage = qrCodeContainer.querySelector('img').src;
                document.querySelector('.Image-placeholder').src = qrImage;

                // Create a link to download the image
                const downloadLink = document.createElement('a');
                downloadLink.href = qrImage;
                downloadLink.download = 'qr-code.png';
                downloadLink.click();
            }, 500);
        } else {
            alert('Please enter a valid URL.');
        }
    });
});
