# Portfolio
Code for Engineering Portfolio Website


## Styles

`assets/css/utilities.css` is generated and committed, so hosting needs no build step.
After changing utility classes, rebuild with Tailwind CSS 3.4.17:

```sh
npx --yes tailwindcss@3.4.17 -c tailwind.config.js -i tools/utilities.css -o assets/css/utilities.css --minify
```

`style.css` supplies the shared design and loads after the generated utilities.
