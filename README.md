# Lucidus International L.L.C-FZ

Corporate website for Lucidus International, built with React and Vinext for
Cloudflare's network.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

The local preview is served at `http://localhost:3000`.

## Production build

```bash
npm run build
```

## Cloudflare deployment

This project uses Vinext, Cloudflare's recommended Next.js deployment path for
Workers. The generated Worker serves the site and its static assets together.

For Cloudflare Workers Builds, connect this GitHub repository and use:

- Production branch: `main`
- Build command: `npm run build`
- Deploy command: `npm run deploy`
- Root directory: `/`

For a manual release after authenticating Wrangler:

```bash
npm run release
```

The deployment uses the Cloudflare-generated configuration in
`dist/server/wrangler.json`.
