# Wedding invitation project rules

- This is a small React + TypeScript + Vite site. Keep components focused and use explicit typed props.
- Wedding names, dates, venues, schedule and RSVP details belong in `src/data/wedding.ts`. Visitor-facing content is Romanian and follows the supplied invitation.
- Keep state near its owner: invitation state in `App`, snow pause state in `WinterAtmosphere`. Call hooks unconditionally at the top level of components.
- Use CSS for folding and snowfall rather than timers or animation-frame React state updates. Respect reduced-motion preferences and retain the pause control.
- Preserve keyboard access, descriptive control labels and semantic HTML for details. Decorative artwork must not replace readable event content.
- Cover branches point outward from the red seal. When closing, the seal returns only after both panels have finished folding.
- Fonts and web artwork belong in `public/` with relevant font licenses. Do not commit `node_modules`, `dist`, `.vercel`, credentials or temporary photo/PDF processing files.
- Run `npm run build` for TypeScript and production-build verification. For visual changes, check desktop and phone layouts, opening/closing, overflow and browser errors.
- Publish to the personal GitHub repository as a public project and deploy to the separate Vercel `wedding-invitation` project. Keep Social Brain separate.
