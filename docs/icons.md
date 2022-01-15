# Inline svg favicon

Solution from https://stackoverflow.com/questions/66935329/use-inline-svg-as-favicon

<link rel="icon" href="data:image/svg+xml,[YOUR ENCODED SVG HERE]" type="image/svg+xml" />

```html
<svg
  id="Layer_1"
  data-name="Layer 1"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 361.19 340.32"
>
  <style>
    path {
      fill: black;
    }
    @media (prefers-color-scheme: dark) {
      path {
        fill: white;
      }
    }
  </style>
  <path d="M0,316.26a24.06,24.06,0,0,0,24.06,24.06H46V155.77H0Z" />
  <path
    d="M239.63,203.39c15.1,9.68,24,27.49,24,49.17,0,3.85-2.54,6.5-7,7s-35.68,1.62-76.27,1.62-71.5-1.27-75.88-1.62-7-3.12-7-7c0-21.68,8.52-39.49,23.62-49.17,26.32-16.65,31.74-36.78,32.91-47.62H68.47V340.32H292.72V155.77h-86C208.27,166.61,213.31,186.74,239.63,203.39Z"
  />
  <path d="M315.19,155.77V340.32h21.94a24.06,24.06,0,0,0,24.06-24.06V155.77Z" />
  <path
    d="M149.82,120.16A44.56,44.56,0,0,1,136.65,88.8c0-24,19.75-43.36,43.75-43.36S224.15,64.8,224.15,88.8A44.56,44.56,0,0,1,211,120.16L230.58,133H361.19V90.3c0-.85,0-1.7,0-2.55C359.88,38.73,319,0,269.93,0H91.3C42.25,0,1.32,38.71,0,87.73c0,.86,0,1.71,0,2.57V133H130.23Z"
  />
</svg>
```

### Advanced techniques

https://css-tricks.com/svg-favicons-in-action/

Try to make different versions light/dark depending on browser style. Couldn't get this to work on chromium

```html
<svg>
  <style>
    path {
      fill: black;
    }
    @media (prefers-color-scheme: dark) {
      path {
        fill: white;
      }
    }
  </style>

  <!-- more stuff -->
</svg>
```
