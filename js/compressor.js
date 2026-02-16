// Image compression engine
class ImageCompressor {
    constructor(targetDimensions, targetSize) {
        this.targetWidth = targetDimensions.width;
        this.targetHeight = targetDimensions.height;
        this.minSize = targetSize.min;
        this.maxSize = targetSize.max;
    }

    async compress(file) {
        const img = await this.loadImage(file);
        const canvas = document.createElement('canvas');
        canvas.width = this.targetWidth;
        canvas.height = this.targetHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        console.log('=== COMPRESSION START ===');
        console.log('Dimensions:', canvas.width, 'x', canvas.height);
        console.log('Range:', this.minSize, '-', this.maxSize, 'KB');
        
        // Binary search for optimal quality
        let low = 0.1, high = 0.95;
        let bestBlob = null;
        const targetKB = this.maxSize * 0.9; // Target 90% of max
        
        for (let i = 0; i < 10; i++) {
            const mid = (low + high) / 2;
            const blob = await this.canvasToBlob(canvas, mid);
            const sizeKB = blob.size / 1024;
            
            console.log(`Iteration ${i + 1}: Q=${mid.toFixed(3)} → ${sizeKB.toFixed(2)} KB`);
            
            if (sizeKB > this.maxSize) {
                high = mid;
            } else if (sizeKB < this.minSize) {
                low = mid;
                bestBlob = blob;
            } else {
                // Within range - check if close to target
                if (!bestBlob || Math.abs(sizeKB - targetKB) < Math.abs(bestBlob.size / 1024 - targetKB)) {
                    bestBlob = blob;
                }
                
                if (sizeKB >= targetKB) {
                    console.log('✓ Target reached');
                    break;
                }
                low = mid;
            }
        }
        
        const finalBlob = bestBlob || await this.canvasToBlob(canvas, 0.9);
        const dataUrl = await this.blobToDataURL(finalBlob);
        
        console.log('=== END ===');
        console.log('Final:', (finalBlob.size / 1024).toFixed(2), 'KB');
        console.log('Meets:', this.checkRequirements(finalBlob.size));
        
        return {
            blob: finalBlob,
            dataUrl: dataUrl,
            size: finalBlob.size,
            dimensions: { width: canvas.width, height: canvas.height },
            meetsRequirements: this.checkRequirements(finalBlob.size)
        };
    }
    
    loadImage(file) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = URL.createObjectURL(file);
        });
    }
    
    canvasToBlob(canvas, quality) {
        return new Promise(resolve => {
            canvas.toBlob(resolve, 'image/jpeg', quality);
        });
    }
    
    blobToDataURL(blob) {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.readAsDataURL(blob);
        });
    }

    checkRequirements(sizeBytes) {
        const sizeKB = sizeBytes / 1024;
        return sizeKB >= this.minSize && sizeKB <= this.maxSize;
    }
}

function initTool(exam) {
    let currentDocType = 'photo';
    let currentExam = JSON.parse(JSON.stringify(exam)); // Deep copy
    let processedResult = null;
    let selectedDocumentType = 'aadhaar';
    let customSizes = { min: 50, max: 300 };
    let pendingFile = null;
    let selectedState = 'uppsc';
    let isCustomMode = exam.isCustom || false;
    
    const docButtons = document.querySelectorAll('.doc-btn');
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    const previewCard = document.getElementById('previewCard');
    const placeholderCard = document.getElementById('placeholderCard');
    const downloadBtn = document.getElementById('downloadBtn');
    const resetBtn = document.getElementById('resetBtn');
    const docTypeSelector = document.getElementById('docTypeSelector');
    const docTypeDropdown = document.getElementById('docTypeDropdown');
    const preCompress = document.getElementById('preCompress');
    const compressBtn = document.getElementById('compressBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const statePscSelector = document.getElementById('statePscSelector');
    const stateDropdown = document.getElementById('stateDropdown');
    const editBtn = document.getElementById('editBtn');
    const customEditor = document.getElementById('customEditor');
    const customWidth = document.getElementById('customWidth');
    const customHeight = document.getElementById('customHeight');
    const customMinKB = document.getElementById('customMinKB');
    const customMaxKB = document.getElementById('customMaxKB');
    const uploadCard = document.getElementById('uploadCard');
    const downloadModal = document.getElementById('downloadModal');
    const closeModal = document.getElementById('closeModal');
    
    // Show custom editor if custom exam
    if (isCustomMode) {
        customEditor.style.display = 'block';
        editBtn.setAttribute('data-i18n', 'doneEditing');
        editBtn.textContent = '✓ Done Editing';
        populateEditorFields();
    }
    
    function populateEditorFields() {
        const req = currentExam[currentDocType];
        if (currentDocType === 'documents') {
            customWidth.parentElement.parentElement.style.display = 'none';
            customMinKB.value = req.minSize || '';
            customMaxKB.value = req.maxSize || '';
        } else {
            customWidth.parentElement.parentElement.style.display = 'block';
            customWidth.value = req.dimensions.width || '';
            customHeight.value = req.dimensions.height || '';
            customMinKB.value = req.minSize || '';
            customMaxKB.value = req.maxSize || '';
        }
    }
    
    // Initialize State PSC dropdown if applicable
    if (exam.hasStateSelector) {
        statePscSelector.style.display = 'block';
        Object.keys(STATE_PSC_SPECS).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = STATE_PSC_SPECS[key].name;
            stateDropdown.appendChild(option);
        });
    }
    
    // Edit button handler
    editBtn.addEventListener('click', () => {
        const isEditorVisible = customEditor.style.display === 'block';
        
        if (isCustomMode && isEditorVisible) {
            // Custom mode: Apply and hide editor
            if (applyCustomSettings()) {
                customEditor.style.display = 'none';
                editBtn.setAttribute('data-i18n', 'editRequirements');
                editBtn.textContent = '✏️ Edit Requirements';
            }
        } else if (!isEditorVisible) {
            // Show editor
            populateEditorFields();
            customEditor.style.display = 'block';
            editBtn.setAttribute('data-i18n', 'doneEditing');
            editBtn.textContent = '✓ Done Editing';
        } else {
            // Non-custom mode: Apply and hide
            if (applyCustomSettings()) {
                customEditor.style.display = 'none';
                editBtn.setAttribute('data-i18n', 'editRequirements');
                editBtn.textContent = '✏️ Edit Requirements';
            }
        }
    });
    
    function applyCustomSettings() {
        const min = parseInt(customMinKB.value);
        const max = parseInt(customMaxKB.value);
        
        if (currentDocType === 'documents') {
            if (min && max && min >= 1 && max >= min) {
                currentExam.documents.minSize = min;
                currentExam.documents.maxSize = max;
                updateRequirements();
                return true;
            } else {
                alert('Please enter valid values for documents:\n- Min size: 1+ KB\n- Max must be greater than Min');
                return false;
            }
        } else {
            const w = parseInt(customWidth.value);
            const h = parseInt(customHeight.value);
            
            if (w && h && min && max && w >= 50 && h >= 50 && min >= 1 && max >= min) {
                currentExam[currentDocType].dimensions = { width: w, height: h };
                currentExam[currentDocType].minSize = min;
                currentExam[currentDocType].maxSize = max;
                updateRequirements();
                return true;
            } else {
                alert('Please enter valid values:\n- Dimensions: 50-2000px\n- Min size: 1+ KB\n- Max must be greater than Min');
                return false;
            }
        }
    }

    
    updateRequirements();
    
    // State PSC dropdown change
    if (stateDropdown) {
        stateDropdown.addEventListener('change', (e) => {
            selectedState = e.target.value;
            updateRequirements();
        });
    }
    
    // Document type dropdown change
    docTypeDropdown.addEventListener('change', (e) => {
        selectedDocumentType = e.target.value;
    });

    
    docButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            docButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentDocType = btn.dataset.type;
            
            // Show/hide document type selector
            if (currentDocType === 'documents') {
                docTypeSelector.style.display = 'block';
            } else {
                docTypeSelector.style.display = 'none';
            }
            
            // Update editor fields for custom mode when switching tabs
            if (customEditor.style.display === 'block') {
                populateEditorFields();
            }
            
            updateRequirements();
            resetTool();
        });
    });
    
    uploadZone.addEventListener('click', () => fileInput.click());
    
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
        if (file) {
            showFilePreview(file);
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            showFilePreview(file);
        }
    });
    
    compressBtn.addEventListener('click', () => {
        if (pendingFile) {
            processFile(pendingFile);
        }
    });
    
    cancelBtn.addEventListener('click', () => {
        pendingFile = null;
        fileInput.value = '';
        preCompress.style.display = 'none';
        uploadZone.querySelector('.upload-content').style.display = 'block';
    });
    
    downloadBtn.addEventListener('click', () => {
        if (processedResult) {
            const link = document.createElement('a');
            const extension = currentDocType === 'documents' ? 'pdf' : 'jpg';
            link.download = `${currentExam.id}-${currentDocType}.${extension}`;
            
            if (currentDocType === 'documents') {
                link.href = URL.createObjectURL(processedResult.blob);
            } else {
                link.href = processedResult.dataUrl;
            }
            link.click();
            
            if (currentDocType === 'documents') {
                URL.revokeObjectURL(link.href);
            }
            
            // Show download modal
            downloadModal.style.display = 'flex';
        }
    });
    
    closeModal.addEventListener('click', () => {
        downloadModal.style.display = 'none';
    });
    
    downloadModal.addEventListener('click', (e) => {
        if (e.target === downloadModal) {
            downloadModal.style.display = 'none';
        }
    });
    
    resetBtn.addEventListener('click', resetTool);
    
    function showFilePreview(file) {
        pendingFile = file;
        fileName.textContent = file.name;
        fileSize.textContent = (file.size / 1024).toFixed(1) + ' KB';
        
        uploadZone.innerHTML = `
            <div class="upload-content">
                <span class="upload-icon">📁</span>
                <p>Drag and upload new file</p>
                <small>${currentDocType === 'documents' ? 'PDF supported' : 'JPG, JPEG, PNG supported'}</small>
            </div>
        `;
        preCompress.style.display = 'block';
    }
    
    function updateRequirements() {
        const reqDetails = document.getElementById('reqDetails');
        
        // Get current requirements
        let req = currentExam[currentDocType];
        
        // Override with State PSC specs if applicable (only for photo/signature)
        if (currentExam.hasStateSelector && STATE_PSC_SPECS[selectedState] && currentDocType !== 'documents') {
            const stateSpec = STATE_PSC_SPECS[selectedState];
            const typeSpec = currentDocType === 'photo' ? stateSpec.photo : stateSpec.signature;
            req = {
                dimensions: { width: typeSpec.dim.w, height: typeSpec.dim.h },
                minSize: typeSpec.min,
                maxSize: typeSpec.max,
                format: 'JPG'
            };
            currentExam[currentDocType] = req;
        }
        
        if (currentDocType === 'documents') {
            // Always use currentExam.documents for edited values
            const minSize = currentExam.documents.minSize;
            const maxSize = currentExam.documents.maxSize;
            
            reqDetails.innerHTML = `
                <div class="req-item">
                    <span class="req-label">Document:</span>
                    <span class="req-value">PDF Document</span>
                </div>
                <div class="req-item">
                    <span class="req-label">File Type:</span>
                    <span class="req-value">PDF</span>
                </div>
                <div class="req-item">
                    <span class="req-label">File Size:</span>
                    <span class="req-value">${minSize}–${maxSize} KB</span>
                </div>
            `;
        } else {
            const isZero = req.dimensions.width === 0 || req.minSize === 0;
            const dimText = isZero ? '<span style="color: #ef4444;">Not set - Click Edit</span>' : `${req.dimensions.width} × ${req.dimensions.height} px`;
            const sizeText = isZero ? '<span style="color: #ef4444;">Not set - Click Edit</span>' : `${req.minSize}–${req.maxSize} KB`;
            
            reqDetails.innerHTML = `
                <div class="req-item">
                    <span class="req-label">Dimensions:</span>
                    <span class="req-value">${dimText}</span>
                </div>
                <div class="req-item">
                    <span class="req-label">File Size:</span>
                    <span class="req-value">${sizeText}</span>
                </div>
                <div class="req-item">
                    <span class="req-label">Format:</span>
                    <span class="req-value">${req.format}</span>
                </div>
            `;
        }
    }
    
    async function processFile(file) {
        const req = currentExam[currentDocType];
        
        // Validate custom mode has values set
        if (currentDocType !== 'documents' && (req.dimensions.width === 0 || req.minSize === 0)) {
            alert('Please set custom requirements first by clicking the Edit button.');
            resetTool();
            return;
        }
        
        preCompress.style.display = 'none';
        uploadZone.innerHTML = '<div class="loading">⚡ Compressing...</div>';
        
        try {
            // Check if it's a PDF
            if (file.type === 'application/pdf') {
                if (currentDocType !== 'documents') {
                    alert('Please select "Documents" tab for PDF files.');
                    resetTool();
                    return;
                }
                await processPDF(file, req);
            } else if (file.type.startsWith('image/')) {
                if (currentDocType === 'documents') {
                    alert('Please upload PDF files for documents, or switch to Photo/Signature tab.');
                    resetTool();
                    return;
                }
                const compressor = new ImageCompressor(
                    req.dimensions,
                    { min: req.minSize, max: req.maxSize }
                );
                const original = await loadOriginalImage(file);
                processedResult = await compressor.compress(file);
                displayResults(original, processedResult);
            } else {
                alert('Unsupported file type. Please upload JPG, PNG, or PDF.');
                resetTool();
            }
            
            // Hide upload card after compression
            uploadCard.style.display = 'none';
        } catch (error) {
            alert(error.message || 'Error processing file. Please try again.');
            resetTool();
        }
    }
    
    function loadOriginalImage(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    resolve({
                        dataUrl: e.target.result,
                        size: file.size,
                        dimensions: { width: img.width, height: img.height }
                    });
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }
    
    function displayResults(original, compressed) {
        const originalCanvas = document.getElementById('originalCanvas');
        const compressedCanvas = document.getElementById('compressedCanvas');
        const originalInfo = document.getElementById('originalInfo');
        const compressedInfo = document.getElementById('compressedInfo');
        const statusBadge = document.getElementById('statusBadge');
        
        drawImageOnCanvas(originalCanvas, original.dataUrl, original.dimensions);
        drawImageOnCanvas(compressedCanvas, compressed.dataUrl, compressed.dimensions);
        
        originalInfo.textContent = `${original.dimensions.width}×${original.dimensions.height} | ${(original.size/1024).toFixed(1)} KB`;
        compressedInfo.textContent = `${compressed.dimensions.width}×${compressed.dimensions.height} | ${(compressed.size/1024).toFixed(1)} KB`;
        
        if (compressed.meetsRequirements) {
            statusBadge.innerHTML = '✅ Meets Requirements';
            statusBadge.className = 'status-badge success';
        } else {
            statusBadge.innerHTML = '⚠️ Size may need adjustment';
            statusBadge.className = 'status-badge warning';
        }
        
        placeholderCard.style.display = 'none';
        previewCard.style.display = 'block';
    }
    
    function drawImageOnCanvas(canvas, dataUrl, dimensions) {
        const ctx = canvas.getContext('2d');
        const maxSize = 200;
        const scale = Math.min(maxSize / dimensions.width, maxSize / dimensions.height);
        
        canvas.width = dimensions.width * scale;
        canvas.height = dimensions.height * scale;
        
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = dataUrl;
    }
    
    async function processPDF(file, req) {
        // Use edited values from currentExam.documents
        const minSize = currentExam.documents.minSize;
        const maxSize = currentExam.documents.maxSize;
        
        const pdfCompressor = new PDFCompressor(
            { min: minSize, max: maxSize }
        );
        
        processedResult = await pdfCompressor.compress(file);
        
        const original = {
            size: file.size,
            name: file.name
        };
        
        displayPDFResults(original, processedResult, minSize, maxSize);
    }
    
    function displayPDFResults(original, compressed, minSize, maxSize) {
        const originalInfo = document.getElementById('originalInfo');
        const compressedInfo = document.getElementById('compressedInfo');
        const statusBadge = document.getElementById('statusBadge');
        const originalCanvas = document.getElementById('originalCanvas');
        const compressedCanvas = document.getElementById('compressedCanvas');
        
        // Hide canvases, show PDF icon
        originalCanvas.style.display = 'none';
        compressedCanvas.style.display = 'none';
        
        originalInfo.innerHTML = `<div style="padding: 40px; text-align: center; font-size: 48px;">📄</div><p>${(original.size/1024).toFixed(1)} KB</p>`;
        compressedInfo.innerHTML = `<div style="padding: 40px; text-align: center; font-size: 48px;">📄</div><p>${(compressed.size/1024).toFixed(1)} KB</p>`;
        
        if (compressed.meetsRequirements) {
            statusBadge.innerHTML = '✅ Meets Requirements';
            statusBadge.className = 'status-badge success';
        } else {
            const sizeKB = compressed.size / 1024;
            if (sizeKB > maxSize) {
                statusBadge.innerHTML = `⚠️ File too large (${sizeKB.toFixed(0)} KB). Max: ${maxSize} KB. Please scan at lower quality.`;
            } else {
                statusBadge.innerHTML = `⚠️ File too small (${sizeKB.toFixed(0)} KB). Min: ${minSize} KB.`;
            }
            statusBadge.className = 'status-badge warning';
        }
        
        placeholderCard.style.display = 'none';
        previewCard.style.display = 'block';
    }
    
    function resetTool() {
        uploadCard.style.display = 'block';
        uploadZone.style.display = 'block';
        uploadZone.innerHTML = `
            <div class="upload-content">
                <span class="upload-icon">📁</span>
                <p>Click or drag file here</p>
                <small>${currentDocType === 'documents' ? 'PDF supported' : 'JPG, JPEG, PNG supported'}</small>
            </div>
        `;
        preCompress.style.display = 'none';
        previewCard.style.display = 'none';
        placeholderCard.style.display = 'block';
        fileInput.value = '';
        processedResult = null;
        pendingFile = null;
    }
}
