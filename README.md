# Matt Volkens — Portfolio

Personal portfolio site. Vite + React + TypeScript + TailwindCSS.

## Development

```bash
npm install
npm run dev
```

## Adding Work Images

Drop images into `public/work/` using these naming prefixes:

- `vocreative_*.png`
- `journey_*.png`
- `sown_*.png`
- `sermonseed_*.png`
- `maku_*.png`
- `luva_*.png`

Images are auto-discovered at build time. Restart the dev server after adding new images.

## Deploy to Vercel

1. Push to GitHub
2. Import repo in Vercel
3. Vercel auto-detects the `vercel.json` config
4. Deploy

Or use Vercel CLI:

```bash
npx vercel
```
