import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(process.cwd(), 'dist');
const host = process.env.HOST || '127.0.0.1';
const startPort = Number(process.env.PORT || 5173);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4'
};

if (!existsSync(root)) {
  console.error('Missing dist folder. Run npm run build first.');
  process.exit(1);
}

const safePath = (urlPath) => {
  const decoded = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  const clean = normalize(decoded).replace(/^(\.\.[/\\])+/, '');
  const target = join(root, clean);
  return target.startsWith(root) ? target : join(root, 'index.html');
};

const server = createServer((req, res) => {
  const requestPath = req.url === '/' ? '/index.html' : req.url || '/index.html';
  let filePath = safePath(requestPath);

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = join(root, 'index.html');
  }

  const stream = createReadStream(filePath);
  res.setHeader('Content-Type', types[extname(filePath)] || 'application/octet-stream');
  stream.on('error', () => {
    res.statusCode = 500;
    res.end('File read error');
  });
  stream.pipe(res);
});

const listen = (port) => {
  server.once('error', (error) => {
    if (error.code === 'EADDRINUSE' && port < startPort + 20) {
      listen(port + 1);
      return;
    }
    console.error(error.message);
    process.exit(1);
  });

  server.listen(port, host, () => {
    console.log(`AGRON local site: http://${host}:${port}/`);
  });
};

listen(startPort);
