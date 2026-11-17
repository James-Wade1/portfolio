# Portfolio
Code for Engineering Portfolio Website


## Styles

`style.css` contains generated Tailwind utilities followed by the custom design rules.
It is committed and served directly, so hosting needs no build step or separate utility stylesheet.

After changing utility classes, rebuild with Tailwind CSS 3.4.17:

```sh
sh tools/build-styles.sh
```

Edit custom rules below `/* END GENERATED UTILITIES */` in `style.css`.
The build preserves those rules.
