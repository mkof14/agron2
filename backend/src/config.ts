
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  HOST: z.string().default('0.0.0.0'),
  // DATABASE_URL is now optional to allow "Lite" mode initialization
  DATABASE_URL: z.string().optional(),
  JWT_SECRET: z.string().min(32, "JWT Secret must be at least 32 characters").default('placeholder-secret-for-initial-dev-only'),
  FRONTEND_URL: z.string().url().default('http://localhost:5173'),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().email().default('system@agron.dev'),
});

const envVars = envSchema.safeParse(process.env);

if (!envVars.success) {
  console.error('❌ Invalid environment variables:', envVars.error.format());
  // In production we still want to know if critical things are missing, but let's not crash if we just want a health check
}

export const config = {
  env: envVars.success ? envVars.data.NODE_ENV : 'production',
  port: envVars.success ? parseInt(envVars.data.PORT, 10) : 3000,
  host: envVars.success ? envVars.data.HOST : '0.0.0.0',
  db: {
    url: envVars.success ? envVars.data.DATABASE_URL : undefined,
  },
  security: {
    jwtSecret: envVars.success ? envVars.data.JWT_SECRET : 'placeholder-secret-for-initial-dev-only',
    frontendUrl: envVars.success ? envVars.data.FRONTEND_URL : '*',
    accessTokenTtl: '15m',
    refreshTokenTtlDays: 7,
  },
  email: {
    apiKey: envVars.success ? envVars.data.RESEND_API_KEY : undefined,
    from: envVars.success ? envVars.data.EMAIL_FROM : 'system@agron.dev',
  }
};
