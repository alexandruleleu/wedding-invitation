# Wedding invitation

A small responsive React + TypeScript invitation, built with Vite and prepared for Vercel.

An interactive version of Andreea and Alexandru's printed invitation for 9 January 2027. The two sides fold outward from a red A&A wax seal. The original winter artwork and branches come from the supplied two-page PDF; the seal comes from the couple's photo.

Gentle CSS snowfall can be paused. Reduced-motion preferences disable snowfall and folding transitions. Below the open invitation, a compact panel contains two unique venue links, the visible RSVP deadline and tap-to-call contacts, without repeating the full printed invitation text or a closing message.

## Local setup

```sh
npm ci
npm run dev
```

## Background sound

The optional original winter chimes start only after tapping the seal or sound button, not on page load. They are synthesized locally with native Web Audio, softly looped, and require no audio download or external service. The mute button preserves the visitor's choice when reopening the invitation. Moving the page into the background pauses playback; visitors can resume it explicitly. Unsupported browsers keep the invitation working silently.

The audio engine in `src/audio/winterChimes.ts` owns rendering/playback; `src/hooks/useWinterChimes.ts` owns React state and lifecycle cleanup; `SoundControl` is a native accessible toggle. A sparse score is rendered once per visit, and playback does not drive React render loops.

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

## Sharing previews

Share `https://wedding-invitation-two-nu-64.vercel.app/wedding-details`. Vercel rewrites that exact route to the app HTML; opening or refreshing it starts with the sealed invitation, and the original root URL still works. Static assets are not included in the rewrite. The canonical and Open Graph URLs use this readable path.

The initial HTML contains Open Graph and large-image card metadata, so link preview crawlers do not need to execute React or capture the animation. `public/images/share-preview-v1.png` is a static 1200 × 630 card using the invitation artwork, names, date and seal. Its editable source is `scripts/share-preview.html`.

To regenerate it, use Node 22.18+ or 24+, install the `agent-browser` CLI and its browser, then run `npm run generate:share-preview`. The generator reads names/date/city/tagline from `src/data/wedding.ts`, serves only its template and local assets on a temporary loopback port, waits for fonts and images, saves the PNG and closes the browser/server. The image is committed, so production builds do not require the generator. Update the canonical and metadata URLs in `index.html` if the production domain changes. Messaging apps control preview rendering and caching; old messages may retain their previous preview.

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
