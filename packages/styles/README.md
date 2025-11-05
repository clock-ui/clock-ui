# @clock-ui/styles

Core styles for Clock UI components — including themes, variables, and shared CSS utilities.

## CSS Variables

Customize the appearance of your clock components by overriding these CSS variables:

### Fonts

- `--cui-font-family`: Default font family (sans-serif)
- `--cui-font-family-roman`: Serif font family for Roman numerals

### Colors

- `--cui-bg-color`: Background color (default: #E8EBE4)
- `--cui-primary-color`: Primary color for main elements (default: #13293D)
- `--cui-secondary-color`: Secondary color for accents (default: #E8EBE4)
- `--cui-accent-color`: Accent color for highlights (default: #F55D3E)

### Clock-Specific Colors (Optional Overrides)

These variables allow fine-grained control over clock elements. If not set, they fall back to the general colors above.

- `--cui-face-color`: Clock face background
- `--cui-frame-color`: Clock frame color
- `--cui-tick-color`: Tick marks color
- `--cui-number-color`: Numbers color
- `--cui-info-color`: Info display color
- `--cui-hand-color`: General hand color
- `--cui-hand-accent-color`: Hand accent color
- `--cui-hour-hand-color`: Hour hand color
- `--cui-hour-hand-accent-color`: Hour hand accent color
- `--cui-minute-hand-color`: Minute hand color
- `--cui-minute-hand-accent-color`: Minute hand accent color
- `--cui-second-hand-color`: Second hand color
- `--cui-pin-color`: Center pin color

### Example Customization

```css
:root {
  --cui-bg-color: #ffffff;
  --cui-primary-color: #000000;
  --cui-accent-color: #ff0000;
}
```

## Building

To build the styles:

```bash
npm run build
```

This uses LightningCSS to process and minify the CSS.
