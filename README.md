# Wedding invitation

A small responsive React + TypeScript invitation, built with Vite and prepared for Vercel.

The initial page is a design preview with an interactive envelope. The invitation artwork, names, date, venue and final animation direction will be supplied by the couple. No wedding details are assumed.

## Local setup

```sh
npm ci
npm run dev
```

## Checks

```sh
npm run build
```

The build includes strict TypeScript checking. The envelope supports keyboard interaction and reduced-motion preferences.

## Vercel

Import the private GitHub repository into Vercel, select the Vite framework and deploy `main`. Build command: `npm run build`; output: `dist`. No environment variables or database are required for the starter.

Alternatively, from this folder with the Vercel CLI authenticated:

```sh
vercel link
vercel --prod
```

## Next design pass

- Add the original invitation image and match its typography and colors.
- Adapt the envelope animation to the supplied animation references.
- Add the actual wedding details, map links and optional RSVP behavior once confirmed.
