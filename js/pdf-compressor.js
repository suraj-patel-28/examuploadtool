// Client-Side PDF Compression using PDF.js + pdf-lib
class PDFCompressor {
    constructor(targetSize) {
        this.minSize = targetSize.min;
        this.maxSize = targetSize.max;
        this.pdfjsLib = null;
        this.PDFLib = null;
    }

    async loadLibraries() {
        if (this.pdfjsLib && this.PDFLib) return;
        
        // Load PDF.js
        if (!window.pdfjsLib) {
            await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js');
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }
        this.pdfjsLib = window.pdfjsLib;
        
        // Load pdf-lib
        if (!window.PDFLib) {
            await this.loadScript('https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js');
        }
        this.PDFLib = window.PDFLib;
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async compress(file) {
        console.log('=== PDF COMPRESSION START ===');
        console.log('File:', file.name, 'Size:', (file.size / 1024).toFixed(2), 'KB');
        console.log('Target range:', this.minSize, '-', this.maxSize, 'KB');
        
        try {
            const currentSizeKB = file.size / 1024;
            
            // Check if already within size limits
            if (currentSizeKB >= this.minSize && currentSizeKB <= this.maxSize) {
                console.log('✓ File already within range');
                return {
                    blob: file,
                    size: file.size,
                    meetsRequirements: true,
                    compressionRatio: 1
                };
            }

            // If too small, return as is
            if (currentSizeKB < this.minSize) {
                console.log('⚠ File too small');
                return {
                    blob: file,
                    size: file.size,
                    meetsRequirements: false,
                    compressionRatio: 1
                };
            }

            // Load libraries
            console.log('→ Loading PDF libraries...');
            await this.loadLibraries();
            
            // Calculate quality based on target
            const compressionRatio = this.maxSize / currentSizeKB;
            let quality = Math.max(0.3, Math.min(0.8, compressionRatio * 0.7));
            
            console.log('→ Compressing with quality:', quality.toFixed(2));
            const compressedBlob = await this.compressPdfFile(file, quality);
            
            const finalSizeKB = compressedBlob.size / 1024;
            console.log('✓ Compressed to:', finalSizeKB.toFixed(2), 'KB');
            console.log('=== PDF COMPRESSION END ===');

            return {
                blob: compressedBlob,
                size: compressedBlob.size,
                meetsRequirements: finalSizeKB >= this.minSize && finalSizeKB <= this.maxSize,
                compressionRatio: file.size / compressedBlob.size
            };

        } catch (error) {
            console.error('=== PDF COMPRESSION ERROR ===');
            console.error('Error:', error);
            throw new Error(error.message || 'Failed to compress PDF. Please try again.');
        }
    }

    async compressPdfFile(file, quality) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await this.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const newPdf = await this.PDFLib.PDFDocument.create();
        
        const numPages = pdf.numPages;
        console.log('→ Processing', numPages, 'pages...');
        
        // Limit pages for performance
        if (numPages > 50) {
            throw new Error('PDF has too many pages (max 50). Please split the document.');
        }
        
        for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            
            // Use lower scale for mobile/large files
            const scale = file.size > 2 * 1024 * 1024 ? 0.8 : 1.0;
            const viewport = page.getViewport({ scale });
            
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            
            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;
            
            // Convert to JPEG with quality
            const imageDataUrl = canvas.toDataURL('image/jpeg', quality);
            const jpgImage = await newPdf.embedJpg(imageDataUrl);
            
            const pdfPage = newPdf.addPage([viewport.width, viewport.height]);
            pdfPage.drawImage(jpgImage, {
                x: 0,
                y: 0,
                width: viewport.width,
                height: viewport.height
            });
            
            if (i % 5 === 0) {
                console.log(`  Processed ${i}/${numPages} pages`);
            }
        }
        
        const compressedBytes = await newPdf.save();
        return new Blob([compressedBytes], { type: 'application/pdf' });
    }

    checkRequirements(sizeBytes) {
        const sizeKB = sizeBytes / 1024;
        return sizeKB >= this.minSize && sizeKB <= this.maxSize;
    }
}

// Document type presets
const DOCUMENT_TYPES = {
    'aadhaar': { name: 'Aadhaar Card', format: 'PDF', minSize: 50, maxSize: 300 },
    'pan': { name: 'PAN Card', format: 'PDF', minSize: 50, maxSize: 300 },
    'passport': { name: 'Passport', format: 'PDF', minSize: 50, maxSize: 300 },
    'category': { name: 'Category Certificate', format: 'PDF', minSize: 50, maxSize: 300 },
    'pwd': { name: 'PwD Certificate', format: 'PDF', minSize: 50, maxSize: 300 },
    'income': { name: 'Income Certificate', format: 'PDF', minSize: 50, maxSize: 300 },
    'class10': { name: 'Class 10 Certificate', format: 'PDF', minSize: 50, maxSize: 300 },
    'class12': { name: 'Class 12 Certificate', format: 'PDF', minSize: 50, maxSize: 300 },
    'degree': { name: 'Degree Certificate', format: 'PDF', minSize: 50, maxSize: 300 },
    'custom': { name: 'Custom Size', format: 'PDF', minSize: 10, maxSize: 500 }
};
