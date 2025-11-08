# Styling

The clock components use CSS custom properties for easy theming and customization.

## CSS Custom Properties

| Property                  | Description                     | Default                                                                                                                                                                  |
| ------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--cui-font-family`       | Font family for Arabic numerals | `ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`                                                     |
| `--cui-font-family-roman` | Font family for Roman numerals  | `ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif`                                                                                                            |
| `--cui-bg-color`          | Background color                | <div style="display: flex; gap: 4px; align-items: center;"><div style="background-color: #E8EBE4; height: 20px; width: 20px; border-radius: 10px;"></div>`#E8EBE4`</div> |
| `--cui-primary-color`     | Primary color (hands, numbers)  | <div style="display: flex; gap: 4px; align-items: center;"><div style="background-color: #13293D; height: 20px; width: 20px; border-radius: 10px;"></div>`#13293D`</div> |
| `--cui-secondary-color`   | Secondary color (face, ticks)   | <div style="display: flex; gap: 4px; align-items: center;"><div style="background-color: #E8EBE4; height: 20px; width: 20px; border-radius: 10px;"></div>`#E8EBE4`</div> |
| `--cui-accent-color`      | Accent color (second hand)      | <div style="display: flex; gap: 4px; align-items: center;"><div style="background-color: #F55D3E; height: 20px; width: 20px; border-radius: 10px;"></div>`#F55D3E`</div> |

## Advanced Customization

For more granular control over individual clock elements, you can use these additional CSS custom properties:

| Property                         | Description                          | Default                                                                                                                                                                  |
| -------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--cui-face-color`               | Clock face background color          | <div style="display: flex; gap: 4px; align-items: center;"><div style="background-color: #E8EBE4; height: 20px; width: 20px; border-radius: 10px;"></div>`#E8EBE4`</div> |
| `--cui-frame-color`              | Clock frame/border color             | <div style="display: flex; gap: 4px; align-items: center;"><div style="background-color: #13293D; height: 20px; width: 20px; border-radius: 10px;"></div>`#13293D`</div> |
| `--cui-tick-color`               | Tick marks color                     | <div style="display: flex; gap: 4px; align-items: center;"><div style="background-color: #13293D; height: 20px; width: 20px; border-radius: 10px;"></div>`#13293D`</div> |
| `--cui-number-color`             | Hour numbers color                   | <div style="display: flex; gap: 4px; align-items: center;"><div style="background-color: #13293D; height: 20px; width: 20px; border-radius: 10px;"></div>`#13293D`</div> |
| `--cui-info-color`               | Info slot text color                 | <div style="display: flex; gap: 4px; align-items: center;"><div style="background-color: #13293D; height: 20px; width: 20px; border-radius: 10px;"></div>`#13293D`</div> |
| `--cui-hand-color`               | Base color for all clock hands       | <div style="display: flex; gap: 4px; align-items: center;"><div style="background-color: #13293D; height: 20px; width: 20px; border-radius: 10px;"></div>`#13293D`</div> |
| `--cui-hand-accent-color`        | Accent color for dual-tone hands     | <div style="display: flex; gap: 4px; align-items: center;"><div style="background-color: #E8EBE4; height: 20px; width: 20px; border-radius: 10px;"></div>`#E8EBE4`</div> |
| `--cui-hour-hand-color`          | Hour hand color                      | <div style="display: flex; gap: 4px; align-items: center;"><div style="background-color: #13293D; height: 20px; width: 20px; border-radius: 10px;"></div>`#13293D`</div> |
| `--cui-hour-hand-accent-color`   | Hour hand accent color (dual-tone)   | <div style="display: flex; gap: 4px; align-items: center;"><div style="background-color: #E8EBE4; height: 20px; width: 20px; border-radius: 10px;"></div>`#E8EBE4`</div> |
| `--cui-minute-hand-color`        | Minute hand color                    | <div style="display: flex; gap: 4px; align-items: center;"><div style="background-color: #13293D; height: 20px; width: 20px; border-radius: 10px;"></div>`#13293D`</div> |
| `--cui-minute-hand-accent-color` | Minute hand accent color (dual-tone) | <div style="display: flex; gap: 4px; align-items: center;"><div style="background-color: #E8EBE4; height: 20px; width: 20px; border-radius: 10px;"></div>`#E8EBE4`</div> |
| `--cui-second-hand-color`        | Second hand color                    | <div style="display: flex; gap: 4px; align-items: center;"><div style="background-color: #F55D3E; height: 20px; width: 20px; border-radius: 10px;"></div>`#F55D3E`</div> |
| `--cui-pin-color`                | Center pin/dot color                 | <div style="display: flex; gap: 4px; align-items: center;"><div style="background-color: #13293D; height: 20px; width: 20px; border-radius: 10px;"></div>`#13293D`</div> |

## Styling

The component uses CSS custom properties for theming. You can customize the appearance by overriding these variables:

```css
/* Import Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Noto+Serif+Display:wght@400;500;600;700&display=swap");

.custom-clock-class {
  --cui-font-family: "Cinzel", serif;
  --cui-font-family-roman: "Noto Serif Display", serif;

  --cui-bg-color: #0d1b2a;
  --cui-primary-color: #ffe0b5;
  --cui-secondary-color: #251101;
  --cui-accent-color: #690500;
}
```

```vue
<LiveClock class="custom-clock-class" />
```

<div class="clock-wrapper">
  <LiveClock class="custom-clock-class" />
</div>

### Advanced Example

For more detailed customization, you can override individual element colors:

```css
.advanced-custom-clock {
  /* Override specific elements */
  --cui-face-color: #1a1a2e;
  --cui-frame-color: #16213e;
  --cui-tick-color: #0f3460;
  --cui-number-color: #e94560;
  --cui-info-color: #0f3460;

  /* Customize hands individually */
  --cui-hour-hand-color: #16213e;
  --cui-hour-hand-accent-color: #e94560;
  --cui-minute-hand-color: #16213e;
  --cui-minute-hand-accent-color: #e94560;
  --cui-second-hand-color: #f39c12;
  --cui-pin-color: #e94560;
}
```

```vue
<LiveClock class="advanced-custom-clock" />
```

<div class="clock-wrapper">
  <LiveClock class="advanced-custom-clock" />
</div>

### Dark Mode

```css
@media (prefers-color-scheme: dark) {
  :root {
    --cui-bg-color: #13293d;
    --cui-primary-color: #e8ebe4;
    --cui-secondary-color: #13293d;
    --cui-accent-color: #f55d3e;

    /* Advanced dark mode customization */
    --cui-face-color: #1a2633;
    --cui-frame-color: #0f1419;
    --cui-tick-color: #4a5d6a;
    --cui-number-color: #b8c5d1;
    --cui-info-color: #4a5d6a;
    --cui-hand-color: #b8c5d1;
    --cui-hand-accent-color: #1a2633;
    --cui-hour-hand-color: #b8c5d1;
    --cui-hour-hand-accent-color: #1a2633;
    --cui-minute-hand-color: #b8c5d1;
    --cui-minute-hand-accent-color: #1a2633;
    --cui-second-hand-color: #f55d3e;
    --cui-pin-color: #b8c5d1;
  }
}
```
