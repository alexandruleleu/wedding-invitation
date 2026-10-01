# Wedding invitation

A small responsive React + TypeScript invitation, built with Vite and prepared for Vercel.

An interactive version of Andreea and Alexandru's printed invitation for 9 January 2027. The two sides fold outward from a red A&A wax seal. The original winter artwork and branches come from the supplied two-page PDF; the seal comes from the couple's photo.

Gentle CSS snowfall can be paused. Reduced-motion preferences disable snowfall and folding transitions. Below the open invitation, a compact panel contains two unique venue links and tap-to-call RSVP contacts, without repeating the printed invitation text or a closing message.

## Local setup

```sh
npm ci
npm run dev
```

## Checks

```sh
npm run build
```

The build includes strict TypeScript checking. The seal and controls support keyboard interaction and reduced-motion preferences.

## Vercel

Import the public GitHub repository into Vercel, select the Vite framework and deploy `main`. Build command: `npm run build`; output: `dist`. No environment variables or database are required.

Alternatively, from this folder with the Vercel CLI authenticated:

```sh
vercel link
vercel --prod
```

## Artwork

Web-optimized invitation artwork is in `public/images`. Original PDF and HEIC files remain outside the repository. Temporary rendering and browser-check files in `tmp/` are ignored.

Fonts are served locally from `public/fonts`, with their SIL Open Font License files. The couple's names use Allura, matching the script font in the printed invitation; controls use DM Sans and the printed artwork remains unchanged. No external font requests are required.

When closing, both panels finish folding before the wax seal settles back into place. A clear Romanian instruction points visitors to the red seal.

The seal gives a gentle, occasional wiggle while closed, pauses on hover/focus, and stays still for reduced-motion visitors. Both interior fold edges use matching soft shadows.

## Structure

- `src/main.tsx`: React entry point.
- `src/App.tsx`: page composition and invitation open/closed state.
- `src/data/wedding.ts`: typed Romanian wedding content from the PDF.
- `src/components/`: independent header, folding invitation, controls, event details and snowfall. Snow pause state belongs to the atmosphere component.
- `src/styles.css`: typography, presentation, responsive layout and declarative CSS motion.
- `public/`: artwork, fonts and their licenses, included in source control.

Components use explicit typed props, stable data keys, native controls and top-level hooks. Animations run in CSS rather than React render loops. The cover branches are mirrored so their stems meet at the seal and their tips point outward.

On phones the event cards stack, links have at least 44px tap areas, and the complete artwork can be opened separately for zooming. Readable HTML details accompany the scaled printed invitation.

The printed artwork stays intact and can be opened separately for zooming on phones. The full invitation text and event times remain available as screen-reader-only semantic HTML without adding visible repetition or scroll height. Map links search by the venue names supplied in the invitation; they are not verified street-address pins.
