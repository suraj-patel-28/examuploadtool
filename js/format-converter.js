// Format Converter Logic
let uploadedImage = null;
let originalFileName = '';
let convertedBlob = null;

// Upload zone setup
const uploadZone = document.getElementById('uploadZone');
const imageInput = document.getElementById('imageInput');
const convertBtn = document.getElementById('convertBtn');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');
const adModal = document.getElementById('adModal');
const closeAdBtn = document.getElementById('closeAdBtn');

uploadZone.addEventListener('click', () => imageInput.click());

uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('drag-over');
});

uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('drag-over');
});

uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        handleImageUpload(file);
    }
});

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleImageUpload(file);
    }
});

function handleImageUpload(file) {
    originalFileName = file.name.split('.')[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            uploadedImage = img;
            
            // Update upload zone to show uploaded status
            uploadZone.innerHTML = `
                <div class="upload-content">
                    <span class="upload-icon">✅</span>
                    <p><strong>Image Uploaded!</strong></p>
                    <small>${file.name} (${(file.size / 1024).toFixed(1)} KB)</small>
                    <button class="btn-secondary" style="margin-top: 10px; padding: 8px 16px;" onclick="document.getElementById('imageInput').click()">
                        🔄 Upload New Image
                    </button>
                </div>
            `;
            
            // Show original preview
            const originalCanvas = document.getElementById('originalCanvas');
            const ctx = originalCanvas.getContext('2d');
            
            const maxWidth = 200;
            const scale = Math.min(1, maxWidth / img.width);
            originalCanvas.width = img.width * scale;
            originalCanvas.height = img.height * scale;
            
            ctx.drawImage(img, 0, 0, originalCanvas.width, originalCanvas.height);
            
            // Show file info
            document.getElementById('originalInfo').textContent = 
                `${img.width}×${img.height}px | ${(file.size / 1024).toFixed(1)} KB`;
            
            // Show convert button
            convertBtn.style.display = 'block';
            document.getElementById('previewArea').style.display = 'none';
            document.getElementById('resultArea').style.display = 'block';
            document.getElementById('convertedCanvas').style.display = 'none';
            document.getElementById('statusBadge').style.display = 'none';
            downloadBtn.style.display = 'none';
            resetBtn.style.display = 'none';
        };
        img.src = e.target.result;
    };
    
    reader.readAsDataURL(file);
}

convertBtn.addEventListener('click', convertImage);

function convertImage() {
    if (!uploadedImage) return;
    
    // Show loading
    convertBtn.textContent = getTranslation('converting');
    convertBtn.disabled = true;
    
    const format = document.querySelector('input[name="format"]:checked').value;
    const hiddenCanvas = document.getElementById('hiddenCanvas');
    const ctx = hiddenCanvas.getContext('2d');
    
    hiddenCanvas.width = uploadedImage.width;
    hiddenCanvas.height = uploadedImage.height;
    
    // Handle PNG to JPG transparency
    if (format === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, hiddenCanvas.width, hiddenCanvas.height);
    }
    
    ctx.drawImage(uploadedImage, 0, 0);
    
    hiddenCanvas.toBlob((blob) => {
        convertedBlob = blob;
        
        // Show converted preview
        const convertedCanvas = document.getElementById('convertedCanvas');
        const previewCtx = convertedCanvas.getContext('2d');
        
        const maxWidth = 200;
        const scale = Math.min(1, maxWidth / uploadedImage.width);
        convertedCanvas.width = uploadedImage.width * scale;
        convertedCanvas.height = uploadedImage.height * scale;
        
        if (format === 'image/jpeg') {
            previewCtx.fillStyle = '#ffffff';
            previewCtx.fillRect(0, 0, convertedCanvas.width, convertedCanvas.height);
        }
        
        previewCtx.drawImage(uploadedImage, 0, 0, convertedCanvas.width, convertedCanvas.height);
        
        // Show file info
        const extension = format.split('/')[1];
        document.getElementById('convertedInfo').textContent = 
            `${uploadedImage.width}×${uploadedImage.height}px | ${(blob.size / 1024).toFixed(1)} KB`;
        
        // Show results immediately
        convertedCanvas.style.display = 'block';
        document.getElementById('statusBadge').style.display = 'block';
        downloadBtn.style.display = 'block';
        resetBtn.style.display = 'block';
        convertBtn.style.display = 'none';
        
    }, format, 0.95);
}

// Download button - starts download then shows ad
downloadBtn.addEventListener('click', () => {
    if (convertedBlob) {
        const format = document.querySelector('input[name="format"]:checked').value;
        const extension = format.split('/')[1];
        const url = URL.createObjectURL(convertedBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${originalFileName}_converted.${extension}`;
        a.click();
        URL.revokeObjectURL(url);
        
        downloadBtn.textContent = getTranslation('downloaded');
        setTimeout(() => {
            downloadBtn.textContent = getTranslation('downloadConverted');
        }, 2000);
        
        // Show ad modal AFTER download starts
        setTimeout(() => {
            adModal.style.display = 'flex';
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.log('AdSense not loaded');
            }
        }, 500);
    }
});

// Close ad modal
closeAdBtn.addEventListener('click', () => {
    adModal.style.display = 'none';
});

resetBtn.addEventListener('click', () => {
    uploadedImage = null;
    convertedBlob = null;
    imageInput.value = '';
    
    // Reset upload zone
    uploadZone.innerHTML = `
        <div class="upload-content">
            <span class="upload-icon">🖼️</span>
            <p data-i18n="clickOrDrag">Click or drag image here</p>
            <small data-i18n="jpgSupported">JPG, PNG, WEBP supported</small>
        </div>
    `;
    
    document.getElementById('previewArea').style.display = 'block';
    document.getElementById('resultArea').style.display = 'none';
    convertBtn.style.display = 'none';
    convertBtn.disabled = false;
    convertBtn.textContent = getTranslation('convertNow');
    
    // Re-attach click listener to upload zone
    uploadZone.addEventListener('click', () => imageInput.click());
});
