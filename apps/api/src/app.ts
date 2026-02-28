import express from 'express';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';
import pino from 'pino';
import { apiKeyAuth } from './middleware/auth';
import { errorHandler, notFound } from './middleware/error-handler';
import { requestContext } from './middleware/request-context';
import { listingRouter } from './routes/listing';

export function createApp() {
  const app = express();
  const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    redact: ['req.headers.authorization', 'req.headers.x-api-key']
  });

  app.use(express.json({ limit: '200kb' }));
  app.use(requestContext);
  app.use(
    pinoHttp({
      logger,
      customProps: (req) => ({ requestId: req.requestId }),
      customSuccessMessage: (req, res) => `request completed ${req.method} ${req.url} ${res.statusCode}`,
      customErrorMessage: (req, res, err) => `request failed ${req.method} ${req.url} ${res.statusCode}: ${err.message}`
    })
  );

  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: 60,
      standardHeaders: true,
      legacyHeaders: false
    })
  );

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use(apiKeyAuth);
  app.use(listingRouter);
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
