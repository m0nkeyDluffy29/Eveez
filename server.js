import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import appModule from './dist/server/server.js';

const app = new Hono();

// Serve static assets from Vite's client build
app.use('/assets/*', serveStatic({ root: './dist/client' }));
app.use('/favicon.ico', serveStatic({ root: './dist/client' }));

// Forward all other requests to TanStack Start's SSR fetch handler
app.all('*', async (c) => {
  return await appModule.fetch(c.req.raw);
});

const port = process.env.PORT || 3000;
console.log(`Starting Node server on port ${port}...`);

serve({
  fetch: app.fetch,
  port: Number(port),
});
