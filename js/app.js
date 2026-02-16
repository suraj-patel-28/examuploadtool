// Homepage logic
const examGrid = document.getElementById('examGrid');
const examSearch = document.getElementById('examSearch');

function renderExams(exams) {
    if (exams.length === 0) {
        // Show only custom option when no results
        const customExam = EXAMS.find(e => e.isCustom);
        const categoryText = getTranslation(customExam.category.toLowerCase());
        const setOwnText = currentLang === 'hi' ? '✏️ अपनी आवश्यकताएं सेट करें' : '✏️ Set your own requirements';
        examGrid.innerHTML = `
            <a href="tool.html?exam=${customExam.id}" class="exam-card" style="border: 2px dashed #3b82f6;">
                <div class="exam-category" style="background: #3b82f6">${categoryText}</div>
                <h3>${customExam.name}</h3>
                <div class="exam-info">
                    <span>${setOwnText}</span>
                </div>
            </a>
        `;
        return;
    }
    
    // Sort: Custom first, then alphabetically by name
    const sorted = [...exams].sort((a, b) => {
        if (a.isCustom) return -1;
        if (b.isCustom) return 1;
        return a.name.localeCompare(b.name);
    });
    
    examGrid.innerHTML = sorted.map(exam => {
        const style = exam.isCustom ? 'border: 2px dashed #3b82f6;' : '';
        const categoryText = getTranslation(exam.category.toLowerCase());
        const photoText = getTranslation('photo');
        const signatureText = getTranslation('signature');
        const documentsText = getTranslation('documents');
        const setOwnText = currentLang === 'hi' ? '✏️ अपनी आवश्यकताएं सेट करें' : '✏️ Set your own requirements';
        const icon = exam.isCustom ? setOwnText : `${photoText} • ${signatureText} • ${documentsText}`;
        return `
            <a href="tool.html?exam=${exam.id}" class="exam-card" style="${style}">
                <div class="exam-category" style="background: ${CATEGORY_COLORS[exam.category] || '#3b82f6'}">${categoryText}</div>
                <h3>${exam.name}</h3>
                <div class="exam-info">
                    <span style="font-size: 13px;">${icon}</span>
                </div>
            </a>
        `;
    }).join('');
}

examSearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = EXAMS.filter(exam => 
        exam.name.toLowerCase().includes(query) ||
        exam.category.toLowerCase().includes(query)
    );
    renderExams(filtered);
});

renderExams(EXAMS);
