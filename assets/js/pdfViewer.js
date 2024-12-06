 let pdfInstance; // Store the PDF document instance for reuse
const pdfPath = './assets/pdf/Isaac_Pittel_Resume.pdf';
const pdfContainer = document.getElementById('pdf-container');

function renderPDF(pdf, scaleContainer) {
    pdfContainer.innerHTML = ''; // Clear previous canvases
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        pdf.getPage(pageNumber).then(function (page) {
            const viewport = page.getViewport({ scale: 1.0 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            // Adjust scale based on container width
            const scale = scaleContainer.offsetWidth / viewport.width;
            canvas.width = Math.floor(viewport.width * scale);
            canvas.height = Math.floor(viewport.height * scale);
            canvas.style.width = `${canvas.width}px`;
            canvas.style.height = `${canvas.height}px`;

            pdfContainer.appendChild(canvas);

            const renderContext = {
                canvasContext: context,
                transform: [scale, 0, 0, scale, 0, 0],
                viewport: viewport
            };
            page.render(renderContext);
        });
    }
}

// Initial load
pdfjsLib.getDocument(pdfPath).promise.then(function (pdf) {
    pdfInstance = pdf; // Save PDF instance
    renderPDF(pdf, pdfContainer);
});

// Handle resize
window.addEventListener('resize', () => {
    if (pdfInstance) {
        renderPDF(pdfInstance, pdfContainer);
    }
});