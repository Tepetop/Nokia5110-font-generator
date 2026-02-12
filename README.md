# Nokia 5110 Font Generator

Program generujący różne style i szerokości trzcionki do wyświetlenia na ekranie LCD z telefonu Nokia 5110.

A web-based tool for creating custom fonts for Nokia 5110 LCD displays (84x48 pixels).

## Features

- **Full Screen Mode**: Display and edit the entire Nokia 5110 screen (84x48 pixels)
- **Custom Size Mode**: Create fonts with custom dimensions (e.g., 8x6 for individual characters)
- **Interactive Pixel Editor**: Click to toggle pixels between black and white
- **Drag Drawing**: Hold and drag to draw multiple pixels at once
- **Export Functionality**: Generate C/Arduino byte arrays for your font data
- **Clear Function**: Reset all pixels with one click

## Usage

1. Open `index.html` in a web browser
2. Choose your display mode:
   - **Full Screen (84x48)**: For designing full screen graphics
   - **Custom Size**: For designing individual characters or smaller graphics
3. Click on squares to toggle pixels black/white
4. Click and drag to draw multiple pixels
5. Click **Export Font Data** to generate the byte array
6. Copy the generated code and use it in your Arduino/C++ project

## Display Modes

### Full Screen Mode (84x48)
Perfect for creating:
- Full screen images
- Large text displays
- Custom graphics that span the entire display

### Custom Size Mode
Perfect for creating:
- Individual characters (e.g., 8x6, 5x7)
- Custom fonts with specific dimensions
- Smaller graphic elements

## Export Format

The generator exports data in two formats depending on the height:

### For heights divisible by 8 (standard Nokia 5110 format):
- Organized in pages of 8 pixels
- Each byte represents a vertical column
- LSB is the top pixel, MSB is the bottom pixel

### For other heights:
- Row-major format
- Each byte represents 8 horizontal pixels
- MSB is the leftmost pixel, LSB is the rightmost pixel

## Example

```cpp
// Include the exported font data in your Arduino sketch
const unsigned char myFont[48] = {
  0x00, 0x00, 0x5F, 0x00, 0x00, 0x00,
  // ... more bytes
};

// Use with Nokia 5110 library
lcd.drawBitmap(0, 0, myFont, width, height, BLACK);
```

## Technical Details

- **Display Size**: 84 pixels wide × 48 pixels high
- **Pixel Representation**: Black (1) or White (0)
- **Export Format**: C/Arduino byte array
- **No Dependencies**: Pure HTML, CSS, and JavaScript

## Browser Compatibility

Works with all modern browsers:
- Chrome/Edge
- Firefox
- Safari
- Opera

## License

See LICENSE file for details.
