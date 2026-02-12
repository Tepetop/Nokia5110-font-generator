// Nokia 5110 LCD specifications
const FULL_WIDTH = 84;
const FULL_HEIGHT = 48;
const PIXEL_SIZE = 8; // Size of each pixel square in the canvas

// Global state
let currentWidth = FULL_WIDTH;
let currentHeight = FULL_HEIGHT;
let pixelData = [];
let canvas, ctx;
let isDragging = false;
let lastToggleState = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('pixelCanvas');
    ctx = canvas.getContext('2d');
    
    initializePixelData();
    setupCanvas();
    drawGrid();
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

// Draw the pixel grid
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let y = 0; y < currentHeight; y++) {
        for (let x = 0; x < currentWidth; x++) {
            const pixelX = x * PIXEL_SIZE;
            const pixelY = y * PIXEL_SIZE;
            
            // Fill pixel
            ctx.fillStyle = pixelData[y][x] ? '#000000' : '#ffffff';
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
    if (x >= 0 && x < currentWidth && y >= 0 && y < currentHeight) {
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
        isDragging = true;
        const { x, y } = getPixelCoords(e);
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
    
    currentWidth = width;
    currentHeight = height;
    initializePixelData();
    setupCanvas();
    drawGrid();
    updateDimensionsInfo();
}

// Clear all pixels
function clearAll() {
    initializePixelData();
    drawGrid();
}

// Update dimensions info display
function updateDimensionsInfo() {
    document.getElementById('dimensionsInfo').textContent = 
        `Dimensions: ${currentWidth}x${currentHeight} pixels`;
}

// Export font data as byte array
function exportFontData() {
    const output = document.getElementById('outputData');
    
    // Convert pixel data to byte array
    // For Nokia 5110, data is typically organized in columns of 8 pixels (1 byte per column)
    let byteArray = [];
    let comments = [];
    
    if (currentHeight % 8 === 0) {
        // Height is divisible by 8, organize in standard format
        const pages = currentHeight / 8;
        
        for (let page = 0; page < pages; page++) {
            for (let col = 0; col < currentWidth; col++) {
                let byte = 0;
                for (let bit = 0; bit < 8; bit++) {
                    const row = page * 8 + bit;
                    if (pixelData[row][col]) {
                        byte |= (1 << bit);
                    }
                }
                byteArray.push('0x' + byte.toString(16).toUpperCase().padStart(2, '0'));
            }
        }
        
        comments.push(`// Font data: ${currentWidth}x${currentHeight} pixels`);
        comments.push(`// Organized in ${pages} page(s) of 8 pixels height`);
        comments.push(`// Each byte represents a vertical column of 8 pixels`);
        comments.push(`// LSB is top pixel, MSB is bottom pixel`);
    } else {
        // Height not divisible by 8, use row-major format
        for (let row = 0; row < currentHeight; row++) {
            for (let col = 0; col < currentWidth; col += 8) {
                let byte = 0;
                for (let bit = 0; bit < 8 && (col + bit) < currentWidth; bit++) {
                    if (pixelData[row][col + bit]) {
                        byte |= (1 << (7 - bit));
                    }
                }
                byteArray.push('0x' + byte.toString(16).toUpperCase().padStart(2, '0'));
            }
        }
        
        comments.push(`// Font data: ${currentWidth}x${currentHeight} pixels`);
        comments.push(`// Organized in row-major format`);
        comments.push(`// Each byte represents 8 horizontal pixels`);
        comments.push(`// MSB is leftmost pixel, LSB is rightmost pixel`);
    }
    
    // Format output
    let result = comments.join('\n') + '\n';
    result += `const unsigned char fontData[${byteArray.length}] = {\n`;
    
    // Format bytes in rows of 12
    for (let i = 0; i < byteArray.length; i += 12) {
        const chunk = byteArray.slice(i, i + 12);
        result += '  ' + chunk.join(', ');
        if (i + 12 < byteArray.length) {
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
