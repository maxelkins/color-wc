# Colour Palette

This Web Component is used to showcase a collection of colours.

It also shows the contrast rating with black and white text, and shows the accessibility rating according to WCAG's [Contrast (Enhanced)(Level AAA)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html#dfn-text) success criterion.

This Web Component using [Stencil](https://stenciljs.com/).

## Get started

```bash
npm install
npm start
```

To build the component for production, run:

```bash
npm run build
```

To run the unit tests for the components, run:

```bash
npm test
```

## Using this component (To be updated)

There are three strategies we recommend for using web components built with Stencil.

The first step for all three of these strategies is to [publish to NPM](https://docs.npmjs.com/getting-started/publishing-npm-packages).

### Script tag

- Put a script tag similar to this `<script type='module' src='https://unpkg.com/my-component@0.0.1/dist/my-component.esm.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules

- Run `npm install my-component --save`
- Put a script tag similar to this `<script type='module' src='node_modules/my-component/dist/my-component.esm.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app

- Run `npm install my-component --save`
- Add an import to the npm packages `import my-component;`
- Then you can use the element anywhere in your template, JSX, html etc
