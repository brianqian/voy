import { NextFunction, Request, Response } from 'express';

export const assertPresent = <T>(val?: T | null): T => {
  if (val === undefined || val === null) {
    throw new Error('Required value misisng');
  }
  return val;
};

export const isPresent = (val: any) => val !== undefined && val !== null;

export const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};
