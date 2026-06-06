
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, res: VercelResponse) => {
  // Simplified health check for Vercel Deploy validation
  res.status(200).json({
    status: 'AGRON_CORE_STABLE',
    mode: 'DETACHED_EDGE',
    timestamp: new Date().toISOString(),
    db: 'detached',
    message: 'Infrastructure node active. Awaiting database connection.'
  });
};
