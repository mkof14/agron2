import { buildApp } from './app';
import { config } from './config';

const start = async () => {
  const app = await buildApp();

  try {
    await app.listen({ port: config.port, host: config.host });
    console.log(`🚀 AGRON Backend System online at http://${config.host}:${config.port}`);
  } catch (err) {
    app.log.error(err);
    (process as any).exit(1);
  }
};

start();