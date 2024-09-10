let savedStyles = [];
let formatChance = 70;
let editingStyleIndex = -1;
let baseStyle = {
    textColor: '#000000',
    bgColor: 'transparent',
    fontSize: '18',
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false
};

document.addEventListener('DOMContentLoaded', () => {
    const styleForm = document.getElementById('style-form');
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const savedStylesContainer = document.getElementById('saved-styles');
    const applyRandomBtn = document.getElementById('apply-random');
    const generateRandomBtn = document.getElementById('generate-random');
    const resultViewer = document.getElementById('result-viewer');
    const transparentBg = document.getElementById('transparent-bg');
    const bgColorInput = document.getElementById('bg-color');
    const formatChanceInput = document.getElementById('format-chance');
    const modalTitle = document.getElementById('modal-title');
    const baseStyleForm = document.getElementById('base-style-form');
    const baseTextColor = document.getElementById('base-text-color');
    const baseBgColor = document.getElementById('base-bg-color');
    const baseTransparentBg = document.getElementById('base-transparent-bg');
    const baseFontSize = document.getElementById('base-font-size');
    const baseBold = document.getElementById('base-bold');
    const baseItalic = document.getElementById('base-italic');
    const baseUnderline = document.getElementById('base-underline');
    const baseStrikethrough = document.getElementById('base-strikethrough');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // Add these variables to your existing declarations
    const randomizeColor = document.getElementById('randomize-color');
    const randomizeBgColor = document.getElementById('randomize-bg-color');
    const randomizeFontSize = document.getElementById('randomize-font-size');
    const randomizeBold = document.getElementById('randomize-bold');
    const randomizeItalic = document.getElementById('randomize-italic');
    const randomizeUnderline = document.getElementById('randomize-underline');
    const randomizeStrikethrough = document.getElementById('randomize-strikethrough');

    const toggleInstructionsBtn = document.getElementById('toggle-instructions');
    const instructionsDiv = document.getElementById('instructions');

    const baseStylePreview = document.getElementById('base-style-preview');
    const editBaseStyleBtn = document.getElementById('edit-base-style');
    const baseStyleModal = document.getElementById('base-style-modal');
    const closeBaseStyleModalBtn = baseStyleModal.getElementsByClassName('close')[0];

    const copyBBCodeBtn = document.getElementById('copy-bbcode');

    toggleInstructionsBtn.addEventListener('click', () => {
        if (instructionsDiv.style.display === 'none') {
            instructionsDiv.style.display = 'block';
            toggleInstructionsBtn.setAttribute('title', 'Hide Instructions');
        } else {
            instructionsDiv.style.display = 'none';
            toggleInstructionsBtn.setAttribute('title', 'Show Instructions');
        }
    });

    styleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newStyle = {
            name: document.getElementById('style-name').value || `Style ${savedStyles.length + 1}`,
            textColor: document.getElementById('text-color').value,
            bgColor: document.getElementById('transparent-bg').checked ? 'transparent' : document.getElementById('bg-color').value,
            fontSize: document.getElementById('font-size').value,
            bold: document.getElementById('bold').checked,
            italic: document.getElementById('italic').checked,
            underline: document.getElementById('underline').checked,
            strikethrough: document.getElementById('strikethrough').checked,
            selected: true // Default to selected when created
        };
        
        if (editingStyleIndex === -1) {
            savedStyles.push(newStyle);
        } else {
            newStyle.selected = savedStyles[editingStyleIndex].selected; // Preserve the selected state when editing
            savedStyles[editingStyleIndex] = newStyle;
            editingStyleIndex = -1;
        }
        
        updateSavedStyles();
        closeModal('style-modal');
        resetForm();
    });

    function updateSavedStyles() {
        savedStylesContainer.innerHTML = '';
        savedStyles.forEach((style, index) => {
            const styleElement = document.createElement('div');
            styleElement.className = 'saved-style';
            
            const preview = document.createElement('span');
            preview.className = 'style-preview';
            preview.textContent = style.name;
            preview.style.color = style.textColor;
            preview.style.backgroundColor = style.bgColor;
            preview.style.fontSize = `${style.fontSize}px`;
            preview.style.fontWeight = style.bold ? 'bold' : 'normal';
            preview.style.fontStyle = style.italic ? 'italic' : 'normal';
            preview.style.textDecoration = style.underline ? 'underline' : 'none';
            preview.style.textDecoration = style.strikethrough ? 'line-through' : preview.style.textDecoration;
            
            const actions = document.createElement('div');
            actions.className = 'style-actions';
            
            const applyBtn = document.createElement('button');
            applyBtn.textContent = 'Apply';
            applyBtn.addEventListener('click', () => applyStyle(style));
            
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => editStyle(index));
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteStyle(index));
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'style-checkbox';
            checkbox.checked = style.selected;
            checkbox.addEventListener('change', () => {
                style.selected = checkbox.checked;
            });
            
            actions.appendChild(checkbox);
            actions.appendChild(applyBtn);
            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            
            styleElement.appendChild(preview);
            styleElement.appendChild(actions);
            savedStylesContainer.appendChild(styleElement);
        });
    }

    function editStyle(index) {
        const style = savedStyles[index];
        document.getElementById('style-name').value = style.name;
        document.getElementById('text-color').value = style.textColor;
        document.getElementById('bg-color').value = style.bgColor;
        document.getElementById('transparent-bg').checked = style.bgColor === 'transparent';
        document.getElementById('bg-color').disabled = style.bgColor === 'transparent';
        document.getElementById('font-size').value = style.fontSize;
        document.getElementById('bold').checked = style.bold;
        document.getElementById('italic').checked = style.italic;
        document.getElementById('underline').checked = style.underline;
        document.getElementById('strikethrough').checked = style.strikethrough;
        
        editingStyleIndex = index;
        modalTitle.textContent = 'Edit Style';
        openModal('style-modal');
    }

    function deleteStyle(index) {
        savedStyles.splice(index, 1);
        updateSavedStyles();
    }

    function resetForm() {
        styleForm.reset();
        document.getElementById('text-color').value = '#000000';
        document.getElementById('bg-color').value = '#ffffff';
        document.getElementById('bg-color').disabled = false;
        document.getElementById('font-size').value = '12';
        editingStyleIndex = -1;
        modalTitle.textContent = 'Add New Style';
    }

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            if (modalId === 'style-modal') {
                resetForm();
            }
        }
    }

    const openModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtns = document.querySelectorAll('.close');

    openModalBtn.addEventListener('click', () => openModal('style-modal'));

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    });

    function getSelectedStyles() {
        return savedStyles.filter(style => style.selected);
    }

    // Update the generateRandomStyle function
    function generateRandomStyle() {
        const newStyle = {
            name: `Random Style ${savedStyles.length + 1}`,
            textColor: randomizeColor.checked ? getRandomColor() : '#000000',
            bgColor: randomizeBgColor.checked ? (Math.random() > 0.3 ? getRandomColor() : 'transparent') : 'transparent',
            fontSize: randomizeFontSize.checked ? Math.floor(Math.random() * (20 - 8 + 1) + 8) : 12,
            bold: randomizeBold.checked ? Math.random() > 0.5 : false,
            italic: randomizeItalic.checked ? Math.random() > 0.5 : false,
            underline: randomizeUnderline.checked ? Math.random() > 0.5 : false,
            strikethrough: randomizeStrikethrough.checked ? Math.random() > 0.5 : false,
            selected: true
        };
        return newStyle;
    }

    // Update the applyRandomWordStyles function
    function applyRandomWordStyles() {
        const words = inputText.value.split(/\s+/);
        let bbcode = '';
        const selectedStyles = getSelectedStyles();

        if (selectedStyles.length === 0) {
            // If no styles are selected, just return the original text
            bbcode = words.join(' ');
        } else {
            words.forEach(word => {
                if (Math.random() < formatChance / 100) {
                    const randomStyle = selectedStyles[Math.floor(Math.random() * selectedStyles.length)];
                    bbcode += applyStyleToWord(word, randomStyle) + ' ';
                } else {
                    bbcode += word + ' '; // No style applied
                }
            });
        }

        bbcode = bbcode.trim();
        bbcode = applyBaseStyle(bbcode); // Wrap all text with base style
        outputText.value = bbcode;
        updateResultViewer(bbcode);
    }

    function applyStyleToWord(word, style) {
        let bbcode = '';
        if (style.textColor) bbcode += `[COLOR=${style.textColor}]`;
        if (style.bgColor !== 'transparent') bbcode += `[BGCOLOR=${style.bgColor}]`;
        if (style.bold) bbcode += '[B]';
        if (style.italic) bbcode += '[I]';
        if (style.underline) bbcode += '[U]';
        if (style.strikethrough) bbcode += '[S]';
        bbcode += `[SIZE=${style.fontSize}px]${word}[/SIZE]`;
        if (style.strikethrough) bbcode += '[/S]';
        if (style.underline) bbcode += '[/U]';
        if (style.italic) bbcode += '[/I]';
        if (style.bold) bbcode += '[/B]';
        if (style.bgColor !== 'transparent') bbcode += '[/BGCOLOR]';
        if (style.textColor) bbcode += '[/COLOR]';
        return bbcode;
    }

    function getRandomColor() {
        return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
    }

    function updateResultViewer(bbcode) {
        let html = bbcode
            .replace(/\[COLOR=(.*?)\]/g, '<span style="color: $1;">')
            .replace(/\[\/COLOR\]/g, '</span>')
            .replace(/\[BGCOLOR=(.*?)\]/g, '<span style="background-color: $1;">')
            .replace(/\[\/BGCOLOR\]/g, '</span>')
            .replace(/\[B\]/g, '<strong>')
            .replace(/\[\/B\]/g, '</strong>')
            .replace(/\[I\]/g, '<em>')
            .replace(/\[\/I\]/g, '</em>')
            .replace(/\[U\]/g, '<u>')
            .replace(/\[\/U\]/g, '</u>')
            .replace(/\[S\]/g, '<s>')
            .replace(/\[\/S\]/g, '</s>')
            .replace(/\[SIZE=(\d+)px\]/g, '<span style="font-size: $1px;">')
            .replace(/\[\/SIZE\]/g, '</span>');

        resultViewer.innerHTML = html;
    }

    function applyStyle(style) {
        const text = inputText.value;
        let bbcode = applyStyleToWord(text, style);
        outputText.value = bbcode;
        updateResultViewer(bbcode);
    }

    function applyBaseStyle(text) {
        let bbcode = '';
        if (baseStyle.textColor) bbcode += `[COLOR=${baseStyle.textColor}]`;
        if (baseStyle.bgColor !== 'transparent') bbcode += `[BGCOLOR=${baseStyle.bgColor}]`;
        if (baseStyle.bold) bbcode += '[B]';
        if (baseStyle.italic) bbcode += '[I]';
        if (baseStyle.underline) bbcode += '[U]';
        if (baseStyle.strikethrough) bbcode += '[S]';
        bbcode += `[SIZE=${baseStyle.fontSize}px]${text}[/SIZE]`;
        if (baseStyle.strikethrough) bbcode += '[/S]';
        if (baseStyle.underline) bbcode += '[/U]';
        if (baseStyle.italic) bbcode += '[/I]';
        if (baseStyle.bold) bbcode += '[/B]';
        if (baseStyle.bgColor !== 'transparent') bbcode += '[/BGCOLOR]';
        if (baseStyle.textColor) bbcode += '[/COLOR]';
        return bbcode;
    }

    // Toggle background color input based on transparent checkbox
    transparentBg.addEventListener('change', () => {
        bgColorInput.disabled = transparentBg.checked;
    });

    // Update result viewer when input text changes
    inputText.addEventListener('input', () => {
        if (savedStyles.length > 0) {
            applyStyle(savedStyles[savedStyles.length - 1]);
        }
    });

    // Apply random styles when the button is clicked
    applyRandomBtn.addEventListener('click', applyRandomWordStyles);
    
    // Update formatChance when the input changes
    formatChanceInput.addEventListener('change', () => {
        formatChance = Math.max(0, Math.min(100, parseInt(formatChanceInput.value)));
    });
    
    // Generate and apply a random style
    generateRandomBtn.addEventListener('click', () => {
        const newStyle = generateRandomStyle();
        savedStyles.push(newStyle);
        updateSavedStyles();
        applyStyle(newStyle);
    });

    // Initialize color inputs
    document.getElementById('text-color').value = '#000000';
    document.getElementById('bg-color').value = '#ffffff';

    baseStyleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        baseStyle = {
            textColor: baseTextColor.value,
            bgColor: baseTransparentBg.checked ? 'transparent' : baseBgColor.value,
            fontSize: baseFontSize.value,
            bold: baseBold.checked,
            italic: baseItalic.checked,
            underline: baseUnderline.checked,
            strikethrough: baseStrikethrough.checked
        };
        updateBaseStylePreview();
        applyBaseStyle(inputText.value);
        closeModal('base-style-modal');
    });

    // Toggle background color input based on transparent checkbox for base style
    baseTransparentBg.addEventListener('change', () => {
        baseBgColor.disabled = baseTransparentBg.checked;
    });

    // Update result viewer when input text changes
    inputText.addEventListener('input', () => {
        applyBaseStyle(inputText.value);
    });

    // Initialize base style inputs
    baseTextColor.value = baseStyle.textColor;
    baseBgColor.value = baseStyle.bgColor;
    baseTransparentBg.checked = baseStyle.bgColor === 'transparent';
    baseBgColor.disabled = baseTransparentBg.checked;
    baseFontSize.value = baseStyle.fontSize || 12;
    baseBold.checked = baseStyle.bold;
    baseItalic.checked = baseStyle.italic;
    baseUnderline.checked = baseStyle.underline;
    baseStrikethrough.checked = baseStyle.strikethrough;

    // Apply base style on page load
    applyBaseStyle(inputText.value);

    // Initialize inputs
    formatChanceInput.value = formatChance;

    // Dark mode toggle
    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', darkModeToggle.checked);
    });

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        darkModeToggle.checked = true;
        document.body.classList.add('dark-mode');
    }

    // Function to update the base style preview
    function updateBaseStylePreview() {
        const baseStyleContainer = document.getElementById('base-style-container');
        const baseStylePreview = document.getElementById('base-style-preview');
        
        baseStylePreview.textContent = 'Base Style';
        baseStylePreview.style.color = baseStyle.textColor;
        baseStylePreview.style.backgroundColor = baseStyle.bgColor;
        baseStylePreview.style.fontSize = `${baseStyle.fontSize}px`;
        baseStylePreview.style.fontWeight = baseStyle.bold ? 'bold' : 'normal';
        baseStylePreview.style.fontStyle = baseStyle.italic ? 'italic' : 'normal';
        baseStylePreview.style.textDecoration = baseStyle.underline ? 'underline' : 'none';
        baseStylePreview.style.textDecoration = baseStyle.strikethrough ? 'line-through' : baseStylePreview.style.textDecoration;

        const editBtn = document.getElementById('edit-base-style');
        editBtn.addEventListener('click', () => {
            openModal('base-style-modal');
        });
    }

    // Open base style modal
    editBaseStyleBtn.addEventListener('click', () => {
        openModal('base-style-modal');
    });

    // Close base style modal
    closeBaseStyleModalBtn.addEventListener('click', () => {
        closeModal('base-style-modal');
    });

    // Close base style modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === baseStyleModal) {
            closeModal('base-style-modal');
        }
    });

    // Call updateBaseStylePreview() when the page loads
    updateBaseStylePreview();

    // Add this function to copy BBCode to clipboard
    function copyBBCodeToClipboard() {
        outputText.select();
        document.execCommand('copy');
        alert('BBCode copied to clipboard!');
    }

    // Add event listener for the copy BBCode button
    copyBBCodeBtn.addEventListener('click', copyBBCodeToClipboard);
});