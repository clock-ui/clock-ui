<script>
  let zone = $state("");

  const zones = [
    { label: "Local", value: "" },
    { label: "New York", value: "America/New_York" },
    { label: "London", value: "Europe/London" },
    { label: "Tokyo", value: "Asia/Tokyo" },
  ];
</script>

<h1>Clock UI — Svelte</h1>
<p class="lede">
  Svelte has no wrapper package. This is the <code>&lt;clock-ui&gt;</code>
  custom element from <code>@clock-ui/dom</code>, used directly.
</p>

<div class="grid">
  <figure>
    <clock-ui class="clock" smooth-sweep></clock-ui>
    <figcaption>Live · smooth sweep</figcaption>
  </figure>

  <figure>
    <clock-ui class="clock"></clock-ui>
    <figcaption>Live · ticking</figcaption>
  </figure>

  <figure>
    <clock-ui class="clock" tick-duration="150"></clock-ui>
    <figcaption>Tick · 150ms swing</figcaption>
  </figure>

  <figure>
    <clock-ui class="clock" hours="10" minutes="9" seconds="36"></clock-ui>
    <figcaption>Static · 10:09</figcaption>
  </figure>

  <figure>
    <clock-ui class="clock theme-midnight" smooth-sweep></clock-ui>
    <figcaption>Themed · midnight</figcaption>
  </figure>

  <figure>
    <clock-ui class="clock theme-vintage" use-roman></clock-ui>
    <figcaption>Themed · vintage</figcaption>
  </figure>

  <figure>
    <clock-ui class="clock" hide-ticks hide-numbers no-border hide-date
    ></clock-ui>
    <figcaption>Minimal</figcaption>
  </figure>

  <figure>
    <clock-ui class="clock" timezone={zone}></clock-ui>
    <figcaption>
      <select bind:value={zone}>
        {#each zones as z}
          <option value={z.value}>{z.label}</option>
        {/each}
      </select>
    </figcaption>
  </figure>
</div>
