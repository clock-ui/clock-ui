# Anatomy

## HTML Structure & CSS Classes

The clock component renders the following HTML structure:

```html
<div class="clock-ui clock-ui--roman clock-ui--bordered">
  <div class="clock-ui__face">
    <!-- Hour markers/ticks -->
    <div class="clock-ui__tick"></div>
    <div class="clock-ui__tick clock-ui__tick--major"></div>
    <!-- ... more ticks ... -->

    <!-- Hour numbers (when useRoman is false) -->
    <div class="clock-ui__number">12</div>
    <div class="clock-ui__number clock-ui__number--cardinal">3</div>
    <!-- ... more numbers ... -->

    <!-- Clock hands -->
    <div class="clock-ui__hand clock-ui__hand--hour"></div>
    <div class="clock-ui__hand clock-ui__hand--minute"></div>
    <div class="clock-ui__hand clock-ui__hand--second"></div>

    <!-- Center dot -->
    <div class="clock-ui__center"></div>

    <!-- Info slot (optional) -->
    <div class="clock-ui__info">Date info</div>
  </div>
</div>
```

### CSS Classes

| Class                         | Description                              |
| ----------------------------- | ---------------------------------------- |
| `.clock-ui`                   | Root container                           |
| `.clock-ui--roman`            | Applied when `useRoman: true`            |
| `.clock-ui--bordered`         | Applied when `noBorder: false` (default) |
| `.clock-ui__face`             | Main clock face container                |
| `.clock-ui__tick`             | Hour/minute markers around the clock     |
| `.clock-ui__tick--major`      | Major ticks (every 5 minutes)            |
| `.clock-ui__number`           | Hour number labels                       |
| `.clock-ui__number--cardinal` | Cardinal numbers (3, 6, 9, 12)           |
| `.clock-ui__hand`             | Clock hand base class                    |
| `.clock-ui__hand--hour`       | Hour hand                                |
| `.clock-ui__hand--minute`     | Minute hand                              |
| `.clock-ui__hand--second`     | Second hand                              |
| `.clock-ui__center`           | Center dot/pivot                         |
| `.clock-ui__info`             | Info slot container                      |
