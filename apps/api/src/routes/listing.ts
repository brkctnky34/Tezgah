import { Router } from 'express';
import { listingRequestSchema } from '../validators/listing';
import { AppError } from '../types';
import { buildListing } from '../services/listing';

export const listingRouter = Router();

listingRouter.post('/v1/listing', async (req, res, next) => {
  const parsed = listingRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return next(new AppError(parsed.error.issues.map((i) => i.message).join('; '), 400));
  }

  try {
    const result = await buildListing(parsed.data);
    res.json(result);
  } catch (error) {
    next(error);
  }
});
