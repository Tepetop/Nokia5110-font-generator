// Nokia 5110 LCD specifications
const FULL_WIDTH = 84;
const FULL_HEIGHT = 48;
const PIXEL_SIZE = 20; // Size of each pixel square in the canvas
const PADDING_COLOR = '#ffd6e7';


// 6x8 font data from Nokia 5110 / PCD8544
// Column-major format: Each group of 6 bytes is one character (0x20-0x7F).
// Each byte is a vertical column (LSB = Top pixel).
const FONT_PCD8544 = [
    // 0x20 space
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    // 0x21 !
    0x00, 0x00, 0x4f, 0x00, 0x00, 0x00,
    // 0x22 "
    0x00, 0x07, 0x00, 0x07, 0x00, 0x00,
    // 0x23 #
    0x14, 0x7f, 0x14, 0x7f, 0x14, 0x00,
    // 0x24 $
    0x24, 0x2a, 0x7f, 0x2a, 0x12, 0x00,
    // 0x25 %
    0x23, 0x13, 0x08, 0x64, 0x62, 0x00,
    // 0x26 &
    0x36, 0x49, 0x55, 0x22, 0x50, 0x00,
    // 0x27 '
    0x00, 0x05, 0x03, 0x00, 0x00, 0x00,
    // 0x28 (
    0x00, 0x1c, 0x22, 0x41, 0x00, 0x00,
    // 0x29 )
    0x00, 0x41, 0x22, 0x1c, 0x00, 0x00,
    // 0x2a *
    0x14, 0x08, 0x3e, 0x08, 0x14, 0x00,
    // 0x2b +
    0x08, 0x08, 0x3e, 0x08, 0x08, 0x00,
    // 0x2c ,
    0x00, 0x50, 0x30, 0x00, 0x00, 0x00,
    // 0x2d -
    0x08, 0x08, 0x08, 0x08, 0x08, 0x00,
    // 0x2e .
    0x00, 0x60, 0x60, 0x00, 0x00, 0x00,
    // 0x2f /
    0x20, 0x10, 0x08, 0x04, 0x02, 0x00,
    // 0x30 0
    0x3e, 0x51, 0x49, 0x45, 0x3e, 0x00,
    // 0x31 1
    0x00, 0x42, 0x7f, 0x40, 0x00, 0x00,
    // 0x32 2
    0x42, 0x61, 0x51, 0x49, 0x46, 0x00,
    // 0x33 3
    0x21, 0x41, 0x45, 0x4b, 0x31, 0x00,
    // 0x34 4
    0x18, 0x14, 0x12, 0x7f, 0x10, 0x00,
    // 0x35 5
    0x27, 0x45, 0x45, 0x45, 0x39, 0x00,
    // 0x36 6
    0x3c, 0x4a, 0x49, 0x49, 0x30, 0x00,
    // 0x37 7
    0x01, 0x71, 0x09, 0x05, 0x03, 0x00,
    // 0x38 8
    0x36, 0x49, 0x49, 0x49, 0x36, 0x00,
    // 0x39 9
    0x06, 0x49, 0x49, 0x29, 0x1e, 0x00,
    // 0x3a :
    0x00, 0x36, 0x36, 0x00, 0x00, 0x00,
    // 0x3b ;
    0x00, 0x56, 0x36, 0x00, 0x00, 0x00,
    // 0x3c <
    0x08, 0x14, 0x22, 0x41, 0x00, 0x00,
    // 0x3d =
    0x14, 0x14, 0x14, 0x14, 0x14, 0x00,
    // 0x3e >
    0x00, 0x41, 0x22, 0x14, 0x08, 0x00,
    // 0x3f ?
    0x02, 0x01, 0x51, 0x09, 0x06, 0x00,
    // 0x40 @
    0x32, 0x49, 0x79, 0x41, 0x3e, 0x00,
    // 0x41 A
    0x7e, 0x11, 0x11, 0x11, 0x7e, 0x00,
    // 0x42 B
    0x7f, 0x49, 0x49, 0x49, 0x36, 0x00,
    // 0x43 C
    0x3e, 0x41, 0x41, 0x41, 0x22, 0x00,
    // 0x44 D
    0x7f, 0x41, 0x41, 0x22, 0x1c, 0x00,
    // 0x45 E
    0x7f, 0x49, 0x49, 0x49, 0x41, 0x00,
    // 0x46 F
    0x7f, 0x09, 0x09, 0x09, 0x01, 0x00,
    // 0x47 G
    0x3e, 0x41, 0x49, 0x49, 0x7a, 0x00,
    // 0x48 H
    0x7f, 0x08, 0x08, 0x08, 0x7f, 0x00,
    // 0x49 I
    0x00, 0x41, 0x7f, 0x41, 0x00, 0x00,
    // 0x4a J
    0x20, 0x40, 0x41, 0x3f, 0x01, 0x00,
    // 0x4b K
    0x7f, 0x08, 0x14, 0x22, 0x41, 0x00,
    // 0x4c L
    0x7f, 0x40, 0x40, 0x40, 0x40, 0x00,
    // 0x4d M
    0x7f, 0x02, 0x0c, 0x02, 0x7f, 0x00,
    // 0x4e N
    0x7f, 0x04, 0x08, 0x10, 0x7f, 0x00,
    // 0x4f O
    0x3e, 0x41, 0x41, 0x41, 0x3e, 0x00,
    // 0x50 P
    0x7f, 0x09, 0x09, 0x09, 0x06, 0x00,
    // 0x51 Q
    0x3e, 0x41, 0x51, 0x21, 0x5e, 0x00,
    // 0x52 R
    0x7f, 0x09, 0x19, 0x29, 0x46, 0x00,
    // 0x53 S
    0x46, 0x49, 0x49, 0x49, 0x31, 0x00,
    // 0x54 T
    0x01, 0x01, 0x7f, 0x01, 0x01, 0x00,
    // 0x55 U
    0x3f, 0x40, 0x40, 0x40, 0x3f, 0x00,
    // 0x56 V
    0x1f, 0x20, 0x40, 0x20, 0x1f, 0x00,
    // 0x57 W
    0x3f, 0x40, 0x38, 0x40, 0x3f, 0x00,
    // 0x58 X
    0x63, 0x14, 0x08, 0x14, 0x63, 0x00,
    // 0x59 Y
    0x07, 0x08, 0x70, 0x08, 0x07, 0x00,
    // 0x5a Z
    0x61, 0x51, 0x49, 0x45, 0x43, 0x00,
    // 0x5b [
    0x00, 0x7f, 0x41, 0x41, 0x00, 0x00,
    // 0x5c \
    0x02, 0x04, 0x08, 0x10, 0x20, 0x00,
    // 0x5d ]
    0x00, 0x41, 0x41, 0x7f, 0x00, 0x00,
    // 0x5e ^
    0x04, 0x02, 0x01, 0x02, 0x04, 0x00,
    // 0x5f _
    0x40, 0x40, 0x40, 0x40, 0x40, 0x00,
    // 0x60 `
    0x00, 0x01, 0x02, 0x04, 0x00, 0x00,
    // 0x61 a
    0x20, 0x54, 0x54, 0x54, 0x78, 0x00,
    // 0x62 b
    0x7f, 0x48, 0x44, 0x44, 0x38, 0x00,
    // 0x63 c
    0x38, 0x44, 0x44, 0x44, 0x20, 0x00,
    // 0x64 d
    0x38, 0x44, 0x44, 0x48, 0x7f, 0x00,
    // 0x65 e
    0x38, 0x54, 0x54, 0x54, 0x18, 0x00,
    // 0x66 f
    0x08, 0x7e, 0x09, 0x01, 0x02, 0x00,
    // 0x67 g
    0x0c, 0x52, 0x52, 0x52, 0x3e, 0x00,
    // 0x68 h
    0x7f, 0x08, 0x04, 0x04, 0x78, 0x00,
    // 0x69 i
    0x00, 0x44, 0x7d, 0x40, 0x00, 0x00,
    // 0x6a j
    0x20, 0x40, 0x44, 0x3d, 0x00, 0x00,
    // 0x6b k
    0x7f, 0x10, 0x28, 0x44, 0x00, 0x00,
    // 0x6c l
    0x00, 0x41, 0x7f, 0x40, 0x00, 0x00,
    // 0x6d m
    0x7c, 0x04, 0x18, 0x04, 0x78, 0x00,
    // 0x6e n
    0x7c, 0x08, 0x04, 0x04, 0x78, 0x00,
    // 0x6f o
    0x38, 0x44, 0x44, 0x44, 0x38, 0x00,
    // 0x70 p
    0x7c, 0x14, 0x14, 0x14, 0x08, 0x00,
    // 0x71 q
    0x08, 0x14, 0x14, 0x14, 0x7c, 0x00,
    // 0x72 r
    0x7c, 0x08, 0x04, 0x04, 0x08, 0x00,
    // 0x73 s
    0x48, 0x54, 0x54, 0x54, 0x20, 0x00,
    // 0x74 t
    0x04, 0x3f, 0x44, 0x40, 0x20, 0x00,
    // 0x75 u
    0x3c, 0x40, 0x40, 0x20, 0x7c, 0x00,
    // 0x76 v
    0x1c, 0x20, 0x40, 0x20, 0x1c, 0x00,
    // 0x77 w
    0x3c, 0x40, 0x30, 0x40, 0x3c, 0x00,
    // 0x78 x
    0x44, 0x28, 0x10, 0x28, 0x44, 0x00,
    // 0x79 y
    0x0c, 0x50, 0x50, 0x50, 0x3c, 0x00,
    // 0x7a z
    0x44, 0x64, 0x54, 0x4c, 0x44, 0x00,
    // 0x7b {
    0x00, 0x08, 0x36, 0x41, 0x00, 0x00,
    // 0x7c |
    0x00, 0x00, 0x7f, 0x00, 0x00, 0x00,
    // 0x7d }
    0x00, 0x41, 0x36, 0x08, 0x00, 0x00,
    // 0x7e ~
    0x10, 0x08, 0x08, 0x10, 0x08, 0x00,
    // 0x7f (DEL usually, but mapped here)
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00
];


// Global state
let currentWidth = 6;
let currentHeight = 8;
let pixelData = [];
let canvas, ctx;
let isDragging = false;
let lastToggleState = null;
let separationConfig = {
    top: { enabled: false, size: 1 },
    bottom: { enabled: true, size: 1 },
    left: { enabled: false, size: 1 },
    right: { enabled: true, size: 1 }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('pixelCanvas');
    ctx = canvas.getContext('2d');
    
    syncSeparationControls();
    initializePixelData();
    setupCanvas();
    drawGrid();
    updateDimensionsInfo();
    setupEventListeners();
});

// Initialize pixel data array
function initializePixelData() {
    pixelData = Array(currentHeight).fill(null).map(() => 
        Array(currentWidth).fill(false)
    );
}

// Setup canvas dimensions
function setupCanvas() {
    canvas.width = currentWidth * PIXEL_SIZE;
    canvas.height = currentHeight * PIXEL_SIZE;
}

function getSeparationOffsets() {
    return {
        top: separationConfig.top.enabled ? separationConfig.top.size : 0,
        bottom: separationConfig.bottom.enabled ? separationConfig.bottom.size : 0,
        left: separationConfig.left.enabled ? separationConfig.left.size : 0,
        right: separationConfig.right.enabled ? separationConfig.right.size : 0
    };
}

function getDrawableBounds() {
    const sep = getSeparationOffsets();
    return {
        left: sep.left,
        top: sep.top,
        width: currentWidth - sep.left - sep.right,
        height: currentHeight - sep.top - sep.bottom
    };
}

function getDrawableWidth() {
    return Math.max(0, getDrawableBounds().width);
}

function getDrawableHeight() {
    return Math.max(0, getDrawableBounds().height);
}

function isPaddingCell(x, y) {
    const drawable = getDrawableBounds();
    return x < drawable.left || x >= (drawable.left + drawable.width) || y < drawable.top || y >= (drawable.top + drawable.height);
}

function enforcePaddingBorder() {
    if (currentWidth < 1 || currentHeight < 1) {
        return;
    }

    for (let y = 0; y < currentHeight; y++) {
        for (let x = 0; x < currentWidth; x++) {
            if (isPaddingCell(x, y)) {
                pixelData[y][x] = false;
            }
        }
    }
}

function hasValidDrawableArea(width, height) {
    const sep = getSeparationOffsets();
    return (width - sep.left - sep.right) >= 1 && (height - sep.top - sep.bottom) >= 1;
}

function getMinDimensionsForSeparation() {
    const sep = getSeparationOffsets();
    return {
        width: sep.left + sep.right + 1,
        height: sep.top + sep.bottom + 1
    };
}

function applySeparationFromControls() {
    const proposed = {
        top: {
            enabled: document.querySelector('.sep-toggle[data-side="top"]').classList.contains('active'),
            size: Math.max(1, parseInt(document.getElementById('sepTop').value, 10) || 1)
        },
        bottom: {
            enabled: document.querySelector('.sep-toggle[data-side="bottom"]').classList.contains('active'),
            size: Math.max(1, parseInt(document.getElementById('sepBottom').value, 10) || 1)
        },
        left: {
            enabled: document.querySelector('.sep-toggle[data-side="left"]').classList.contains('active'),
            size: Math.max(1, parseInt(document.getElementById('sepLeft').value, 10) || 1)
        },
        right: {
            enabled: document.querySelector('.sep-toggle[data-side="right"]').classList.contains('active'),
            size: Math.max(1, parseInt(document.getElementById('sepRight').value, 10) || 1)
        }
    };

    const tempCurrent = separationConfig;
    separationConfig = proposed;

    const minDims = getMinDimensionsForSeparation();
    if (minDims.width > FULL_WIDTH || minDims.height > FULL_HEIGHT) {
        separationConfig = tempCurrent;
        alert('Selected separation is too large for Nokia 5110 display limits.');
        syncSeparationControls();
        return;
    }

    if (!hasValidDrawableArea(currentWidth, currentHeight)) {
        const newWidth = Math.max(currentWidth, minDims.width);
        const newHeight = Math.max(currentHeight, minDims.height);
        setCustomSize(newWidth, newHeight);
    } else {
        drawGrid();
        updateDimensionsInfo();
    }
}

function syncSeparationControls() {
    ['top', 'bottom', 'left', 'right'].forEach((side) => {
        const toggle = document.querySelector(`.sep-toggle[data-side="${side}"]`);
        const input = document.getElementById(`sep${side.charAt(0).toUpperCase() + side.slice(1)}`);
        const enabled = separationConfig[side].enabled;

        toggle.classList.toggle('active', enabled);
        input.disabled = !enabled;
        input.value = separationConfig[side].size;
    });
}

// Draw the pixel grid
function drawGrid() {
    enforcePaddingBorder();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let y = 0; y < currentHeight; y++) {
        for (let x = 0; x < currentWidth; x++) {
            const pixelX = x * PIXEL_SIZE;
            const pixelY = y * PIXEL_SIZE;
            const paddingCell = isPaddingCell(x, y);
            
            // Fill pixel
            ctx.fillStyle = paddingCell ? PADDING_COLOR : (pixelData[y][x] ? '#000000' : '#ffffff');
            ctx.fillRect(pixelX, pixelY, PIXEL_SIZE, PIXEL_SIZE);
            
            // Draw grid lines
            ctx.strokeStyle = '#cccccc';
            ctx.lineWidth = 1;
            ctx.strokeRect(pixelX, pixelY, PIXEL_SIZE, PIXEL_SIZE);
        }
    }
}

// Toggle pixel at given position
function togglePixel(x, y, forceState = null) {
    if (x >= 0 && x < currentWidth && y >= 0 && y < currentHeight && !isPaddingCell(x, y)) {
        if (forceState !== null) {
            pixelData[y][x] = forceState;
        } else {
            pixelData[y][x] = !pixelData[y][x];
        }
        drawGrid();
    }
}

// Get pixel coordinates from mouse event
function getPixelCoords(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    const x = Math.floor(mouseX / PIXEL_SIZE);
    const y = Math.floor(mouseY / PIXEL_SIZE);
    
    return { x, y };
}

// Setup event listeners
function setupEventListeners() {
    // Mode selection
    document.querySelectorAll('input[name="mode"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const customSizeInputs = document.getElementById('customSizeInputs');
            if (e.target.value === 'custom') {
                customSizeInputs.style.display = 'block';
            } else {
                customSizeInputs.style.display = 'none';
                setFullScreenMode();
            }
        });
    });
    
    // Apply custom size
    document.getElementById('applyCustomSize').addEventListener('click', () => {
        const width = parseInt(document.getElementById('customWidth').value);
        const height = parseInt(document.getElementById('customHeight').value);
        setCustomSize(width, height);
    });
    
    // Canvas mouse events
    canvas.addEventListener('mousedown', (e) => {
        const { x, y } = getPixelCoords(e);
        if (x < 0 || x >= currentWidth || y < 0 || y >= currentHeight || isPaddingCell(x, y)) {
            isDragging = false;
            lastToggleState = null;
            return;
        }

        isDragging = true;
        lastToggleState = !pixelData[y][x];
        togglePixel(x, y, lastToggleState);
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const { x, y } = getPixelCoords(e);
            togglePixel(x, y, lastToggleState);
        }
    });
    
    canvas.addEventListener('mouseup', () => {
        isDragging = false;
        lastToggleState = null;
    });
    
    canvas.addEventListener('mouseleave', () => {
        isDragging = false;
        lastToggleState = null;
    });
    
    // Clear button
    document.getElementById('clearBtn').addEventListener('click', clearAll);
    
    // Export button
    document.getElementById('exportBtn').addEventListener('click', exportFontData);
    
    // Copy button
    document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
    
    // Render character button
    document.getElementById('renderCharBtn').addEventListener('click', renderCharacter);

    // Render HEX button
    document.getElementById('renderHexBtn').addEventListener('click', renderFromHex);

    // Separation controls
    document.querySelectorAll('.sep-toggle').forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const side = toggle.dataset.side;
            const input = document.getElementById(`sep${side.charAt(0).toUpperCase() + side.slice(1)}`);
            toggle.classList.toggle('active');
            input.disabled = !toggle.classList.contains('active');
            applySeparationFromControls();
        });
    });

    ['Top', 'Bottom', 'Left', 'Right'].forEach((side) => {
        const input = document.getElementById(`sep${side}`);
        input.addEventListener('change', () => {
            if (parseInt(input.value, 10) < 1 || Number.isNaN(parseInt(input.value, 10))) {
                input.value = 1;
            }
            applySeparationFromControls();
        });
    });
}

// Set full screen mode
function setFullScreenMode() {
    currentWidth = FULL_WIDTH;
    currentHeight = FULL_HEIGHT;
    initializePixelData();
    setupCanvas();
    drawGrid();
    updateDimensionsInfo();
}

// Set custom size
function setCustomSize(width, height) {
    if (width < 1 || width > FULL_WIDTH || height < 1 || height > FULL_HEIGHT) {
        alert(`Width must be between 1 and ${FULL_WIDTH}, height must be between 1 and ${FULL_HEIGHT}`);
        return;
    }

    if (!hasValidDrawableArea(width, height)) {
        const minDims = getMinDimensionsForSeparation();
        alert(`Size too small for current separation. Minimum is ${minDims.width}x${minDims.height}.`);
        return;
    }
    
    currentWidth = width;
    currentHeight = height;
    initializePixelData();
    setupCanvas();
    drawGrid();
    updateDimensionsInfo();
}

// Force UI into custom mode and set size inputs to current dimensions
function ensureCustomModeSelected() {
    const customModeRadio = document.querySelector('input[name="mode"][value="custom"]');
    const customSizeInputs = document.getElementById('customSizeInputs');

    if (customModeRadio) {
        customModeRadio.checked = true;
    }

    if (customSizeInputs) {
        customSizeInputs.style.display = 'block';
    }

    document.getElementById('customWidth').value = currentWidth;
    document.getElementById('customHeight').value = currentHeight;
}

// Clear all pixels
function clearAll() {
    initializePixelData();
    drawGrid();
}

// Update dimensions info display
function updateDimensionsInfo() {
    const drawable = getDrawableBounds();
    document.getElementById('dimensionsInfo').textContent = 
        `Dimensions: ${currentWidth}x${currentHeight} pixels (drawable ${drawable.width}x${drawable.height})`;
}

// Export font data as byte array
function exportFontData() {
    const output = document.getElementById('outputData');
    enforcePaddingBorder();
    
    // Convert pixel data to byte array
    // PCD8544 is vertically oriented byte addressing.
    // We always calculate ceiling(height/8) pages.
    const pages = Math.ceil(currentHeight / 8);
    let byteArray = [];
    let comments = [];

    for (let page = 0; page < pages; page++) {
        for (let col = 0; col < currentWidth; col++) {
            let byte = 0;
            for (let bit = 0; bit < 8; bit++) {
                const row = page * 8 + bit;
                if (row < currentHeight && pixelData[row][col]) {
                    byte |= (1 << bit);
                }
            }
            byteArray.push('0x' + byte.toString(16).toUpperCase().padStart(2, '0'));
        }
    }
    
    comments.push(`// Font data: ${currentWidth}x${currentHeight} pixels`);
    comments.push(`// PCD8544 format: Vertical 8-pixel columns, Column-Major`);
    comments.push(`// ${pages} banks (rows of 8 pixels height)`);
    comments.push(`// Total bytes: ${byteArray.length}`);

    // Format output
    let result = comments.join('\n') + '\n';
    const charName = document.getElementById('charInput').value || 'custom';
    // Clean charName to be valid C identifier if possible, or just use hex code
    const safeName = charName.replace(/[^a-zA-Z0-9]/g, '') || 'char';
    result += `const uint8_t char_${safeName}[] = {\n`;
    
    // Format bytes in rows of 12 (or width if small?)
    const bpl = currentWidth; // Bytes per line - match width is usually cleaner for reading
    
    for (let i = 0; i < byteArray.length; i += bpl) {
        const chunk = byteArray.slice(i, i + bpl);
        result += '  ' + chunk.join(', ');
        if (i + bpl < byteArray.length) {
            result += ',';
        }
        result += '\n';
    }
    
    result += '};\n';
    
    output.value = result;
}

// Copy output to clipboard
function copyToClipboard() {
    const output = document.getElementById('outputData');
    if (output.value) {
        navigator.clipboard.writeText(output.value).then(() => {
            const btn = document.getElementById('copyBtn');
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy to clipboard. Please try selecting and copying manually.');
        });
    } else {
        alert('Please export font data first!');
    }
}

// Helper to get 6 bytes for a character from the large array
function getCharBytes(char) {
    if (!char) return null;
    const code = char.charCodeAt(0);
    if (code < 0x20 || code > 0x7F) return null; // Out of range
    const index = (code - 0x20) * 6;
    return FONT_PCD8544.slice(index, index + 6);
}

// Render a character on the canvas with scaling
function renderCharacter() {
    const charInput = document.getElementById('charInput');
    const char = charInput.value;
    
    if (!char) {
        alert('Please enter a character to render');
        return;
    }
    
    // Get the font data for the character
    const fontData = getCharBytes(char);
    
    if (!fontData) {
        alert('Character not supported. Try standard ASCII characters (space to ~).');
        return;
    }
    
    // Clear the canvas first
    // Note: We don't call clearAll() because that resets pixelData object entirely,
    // we just want to clear the bits.
    for(let y=0; y<currentHeight; y++) {
        for(let x=0; x<currentWidth; x++) {
            pixelData[y][x] = false;
        }
    }

    // Scaling logic (Nearest Neighbor)
    // Source dimensions: 6x8
    const srcWidth = 6;
    const srcHeight = 8;
    const drawable = getDrawableBounds();
    const targetWidth = drawable.width;
    const targetHeight = drawable.height;

    if (targetWidth < 1 || targetHeight < 1) {
        alert('Drawable area is too small. Reduce separation or increase custom dimensions.');
        return;
    }
    
    for (let y = 0; y < targetHeight; y++) {
        // Map target Y to source Y
        const srcY = Math.floor((y * srcHeight) / targetHeight);
        
        for (let x = 0; x < targetWidth; x++) {
            // Map target X to source X
            const srcX = Math.floor((x * srcWidth) / targetWidth);
            
            // Get pixel state from source
            // fontData is array of 6 bytes (columns)
            // LSB is top (y=0)
            const colByte = fontData[srcX];
            const bitSet = (colByte & (1 << srcY)) !== 0;
            
            pixelData[drawable.top + y][drawable.left + x] = bitSet;
        }
    }
    
    drawGrid();
}

// Parse HEX bytes from text input (supports 0xNN and NN formats)
function parseHexBytes(input) {
    if (!input || !input.trim()) {
        return [];
    }

    const has0xTokens = /0x[0-9a-fA-F]{1,2}/.test(input);
    const tokenRegex = has0xTokens ? /0x([0-9a-fA-F]{1,2})/g : /\b([0-9a-fA-F]{1,2})\b/g;
    const bytes = [];
    let match;

    while ((match = tokenRegex.exec(input)) !== null) {
        const value = parseInt(match[1], 16);
        if (!Number.isNaN(value) && value >= 0 && value <= 0xFF) {
            bytes.push(value);
        }
    }

    return bytes;
}

// Infer source dimensions from input. If not explicitly provided, fallback to 1 page (height=8).
function inferSourceDimensions(input, bytes) {
    const explicitDimensions = input.match(/(\d+)\s*x\s*(\d+)\s*pixels/i);
    if (explicitDimensions) {
        const width = parseInt(explicitDimensions[1], 10);
        const height = parseInt(explicitDimensions[2], 10);
        const expectedBytes = width * Math.ceil(height / 8);

        if (width > 0 && height > 0 && expectedBytes === bytes.length) {
            return { width, height };
        }
    }

    // Try infer from per-line bytes (works with exported multiline arrays)
    const lineCounts = input
        .split(/\r?\n/)
        .map((line) => parseHexBytes(line).length)
        .filter((count) => count > 0);

    if (lineCounts.length > 1) {
        const first = lineCounts[0];
        const uniform = lineCounts.every((count) => count === first);
        const pages = lineCounts.length;

        if (uniform && first > 0 && first <= FULL_WIDTH && first * pages === bytes.length) {
            return { width: first, height: pages * 8 };
        }
    }

    return { width: bytes.length, height: 8 };
}

// Convert byte array (PCD8544 vertical pages) to boolean matrix [y][x]
function decodeBytesToMatrix(bytes, width, height) {
    const pages = Math.ceil(height / 8);
    const matrix = Array(height).fill(null).map(() => Array(width).fill(false));

    for (let page = 0; page < pages; page++) {
        for (let col = 0; col < width; col++) {
            const byteIndex = page * width + col;
            const value = bytes[byteIndex] || 0;

            for (let bit = 0; bit < 8; bit++) {
                const row = page * 8 + bit;
                if (row < height) {
                    matrix[row][col] = (value & (1 << bit)) !== 0;
                }
            }
        }
    }

    return matrix;
}

// Trim empty margins and return best-fit glyph matrix.
function trimMatrix(matrix) {
    const height = matrix.length;
    const width = matrix[0]?.length || 0;

    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (matrix[y][x]) {
                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
            }
        }
    }

    if (maxX === -1 || maxY === -1) {
        return {
            matrix: Array(8).fill(null).map(() => Array(Math.max(1, width)).fill(false)),
            width: Math.max(1, width),
            height: 8
        };
    }

    const trimmedWidth = maxX - minX + 1;
    const trimmedHeight = maxY - minY + 1;
    const trimmed = Array(trimmedHeight).fill(null).map(() => Array(trimmedWidth).fill(false));

    for (let y = 0; y < trimmedHeight; y++) {
        for (let x = 0; x < trimmedWidth; x++) {
            trimmed[y][x] = matrix[minY + y][minX + x];
        }
    }

    return { matrix: trimmed, width: trimmedWidth, height: trimmedHeight };
}

// Render glyph from HEX input and auto-fit canvas size
function renderFromHex() {
    const input = document.getElementById('hexInput').value;
    const bytes = parseHexBytes(input);

    if (!bytes.length) {
        alert('Please provide HEX data (e.g. 0x3E, 0x51, 0x49, 0x45, 0x3E).');
        return;
    }

    if (bytes.length > FULL_WIDTH * Math.ceil(FULL_HEIGHT / 8)) {
        alert('HEX data is too large for Nokia 5110 limits (84x48).');
        return;
    }

    const sourceDimensions = inferSourceDimensions(input, bytes);

    if (sourceDimensions.width > FULL_WIDTH || sourceDimensions.height > FULL_HEIGHT) {
        alert(`Inferred dimensions ${sourceDimensions.width}x${sourceDimensions.height} exceed Nokia 5110 limits.`);
        return;
    }

    const decodedMatrix = decodeBytesToMatrix(bytes, sourceDimensions.width, sourceDimensions.height);
    const fitted = trimMatrix(decodedMatrix);

    const sep = getSeparationOffsets();
    const minimumWidth = sep.left + sep.right + 1;
    const minimumHeight = sep.top + sep.bottom + 1;

    const targetWidth = Math.min(FULL_WIDTH, Math.max(minimumWidth, fitted.width + sep.left + sep.right));
    const targetHeight = Math.min(FULL_HEIGHT, Math.max(minimumHeight, fitted.height + sep.top + sep.bottom));

    if (!hasValidDrawableArea(targetWidth, targetHeight)) {
        alert('Current separation leaves no drawable area for this HEX data.');
        return;
    }

    ensureCustomModeSelected();
    setCustomSize(targetWidth, targetHeight);

    const drawable = getDrawableBounds();

    for (let y = 0; y < Math.min(fitted.height, drawable.height); y++) {
        for (let x = 0; x < Math.min(fitted.width, drawable.width); x++) {
            pixelData[drawable.top + y][drawable.left + x] = fitted.matrix[y][x];
        }
    }

    drawGrid();
}
