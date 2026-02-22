import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let cachedApp: any;

async function bootstrapServerless() {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule);
    app.enableCors(); // Allow React to connect
    await app.init();
    cachedApp = app.getHttpAdapter().getInstance();
  }
  return cachedApp;
}

export default async function handler(req: any, res: any) {
  const server = await bootstrapServerless();
  return server(req, res);
}

if (!process.env.VERCEL) {
  async function bootstrapLocal() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(process.env.PORT ?? 3000);
  }
  bootstrapLocal();
}
