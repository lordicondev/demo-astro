# Lordicon × Astro

Animated [Lordicon](https://lordicon.com/) icons in an Astro 7 site, with
[`@lordicon/element`](https://www.npmjs.com/package/@lordicon/element): icons in any `.astro`
file without a framework, icons that follow your scripts, and server rendering that does not
shift the page.

```sh
npm install
npm run dev        # http://localhost:4321
```

With Node 22.12 or later, as Astro 7 asks.

## Lordicon in your Astro site

**1. Install**

```sh
npm install @lordicon/element
```

**2. Define the element** in a `<script>` in your layout, `src/layouts/Layout.astro` here.
Astro bundles the script and runs it once on every page that uses the layout:

```astro
<script>
    import { defineElement } from '@lordicon/element';

    defineElement();
</script>
```

**3. Give icons a size** in your global CSS, so that nothing moves while the page loads. Here it
is `src/styles/global.css`, imported in the layout:

```css
@layer base {
    lord-icon {
        display: inline-block;
        width: 64px;
        height: 64px;
    }

    lord-icon:not(:defined) > * {
        width: 100%;
        height: 100%;
    }
}
```

In `@layer base`, the rule gives way to your classes, so one icon can take another size:
`class="size-8"`, or `style="width: 32px; height: 32px"`. The layer matters with Tailwind 4: its
classes sit in a layer, and a rule outside any layer would beat them.

**4. Use it**, in any `.astro` file:

```astro
<lord-icon src="/icons/lock.json" trigger="hover" />
```

Astro needs no configuration, and the icon no `client:` directive: it is plain HTML, sent with
its attributes, and the script from step 2 brings it to life.

Pick icons on [lordicon.com](https://lordicon.com/), give them your style and colours there, and
download them as Lottie JSON into `public/`, as here.

## What's inside

| Page                | Shows                                                                                   | Code                                                                   |
| ------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `/`                 | Triggers, colours, stroke, a colour from CSS, icons in buttons and links                | [`src/pages/index.astro`](src/pages/index.astro)                       |
| `/scripts`          | `follow` with the page's data, a process in stages, `play()` after an action            | [`src/pages/scripts.astro`](src/pages/scripts.astro)                   |
| `/server-rendering` | A placeholder, a size before the script runs, loading on view or interaction, an island | [`src/pages/server-rendering.astro`](src/pages/server-rendering.astro) |

The buttons, the form and the server island are in [`src/components/`](src/components/), the
action in [`src/actions/`](src/actions/).

## Good to know

- Interactive icons need no framework. Put the state on an element, as an attribute
  (`aria-pressed`, `data-state`), and let a `<script>` change it: `trigger="follow"` keeps the
  icon in step. To pass the page's data, set the attribute in the template, as the cart buttons
  do; `define:vars` would stop Astro from bundling the script.
- `document.querySelector('lord-icon')` gives the element, typed as `LordIconElement`, with
  `play()` and the rest. Methods wait for the icon to be ready by themselves; its events go to
  `addEventListener('complete', …)` and so on.
- Icons do not wait for anything else: in a server island, in HTML your script adds, or on the
  next page with `<ClientRouter />`, they load as soon as they are on the page. The element stays
  defined across the router's navigations.
- Prefer `src` to the `icon` property: the URL is in the HTML and the icon loads sooner, and the
  JSON stays out of your JavaScript.
- Astro 7 drops the whitespace at a line break next to an element. An icon inline with text
  loses its space there: give the parent `display: flex` and a `gap`, as the buttons here, or
  write `{' '}`.
- No component is needed around the element. For one of your own, an `Icon.astro` that adds the
  placeholder say, pass the rest of the props on, and write `<Icon name="lock" trigger="hover" />`:

    ```astro
    ---
    interface Props {
        name: string;
        [attribute: string]: unknown;
    }

    const { name, ...rest } = Astro.props;
    ---

    <lord-icon src={`/icons/${name}.json`} {...rest}>
        <img src={`/icons/${name}.svg`} alt="" />
    </lord-icon>
    ```

- `defineElement()` takes options, in the same script: triggers of your own, or
  `motion: 'always'` for every icon.
- Screen readers skip icons: give one an `aria-label` when it means something on its own. When
  the viewer asks for less motion, icons stop animating by themselves.
- Children of `<lord-icon>` show until the icon is ready: a still of the icon, downloaded from
  lordicon.com as SVG, makes a good placeholder.
- In a Vue or Svelte island, `<lord-icon>` works too, defined by the same script; what each
  framework wants around it, in the [Nuxt](https://github.com/lordicondev/demo-nuxt) and
  [SvelteKit](https://github.com/lordicondev/demo-sveltekit) demos. React has
  [`@lordicon/react`](https://www.npmjs.com/package/@lordicon/react), as in the
  [Next.js demo](https://github.com/lordicondev/demo-nextjs).
- Every attribute and trigger: the
  [`@lordicon/element`](https://www.npmjs.com/package/@lordicon/element) README.

## This project

A new Astro 7 site as `npm create astro` makes it (the minimal template, TypeScript in strict
mode), with ESLint through `eslint-plugin-astro`, Prettier through `prettier-plugin-astro`, and
plain CSS. Its pages are static, built ahead; the Node adapter, `@astrojs/node`, serves only the
action and the server island. Without those two, the site needs no server at all, and the icons
work the same.

```sh
npm run lint
npm run check      # astro check
npm run format     # Prettier
npm run build && npm run preview
```

`astro check` runs on TypeScript 6, hence `typescript` at `~6.0`: it does not support
TypeScript 7 yet.

## License

MIT
