import { NextFunction, Request, Response } from 'express';
import is from '@sindresorhus/is';
import { NonNullableObject } from './types.js';

export const assertPresent = <T>(val?: T | null): T => {
  if (is.nullOrUndefined(val)) {
    throw new Error('Required value misisng');
  }
  return val;
};

export const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

export const assertUnreachable = (val: never): never => {
  throw new Error(`Unreachable case: ${val}`);
};

export function wrap<T>(fn: () => T): T {
  return fn();
}

export function trueEnv(key?: string | number): boolean {
  return key === 'true' || key === '1';
}

export function allValuesExist<T>(obj: T): obj is NonNullableObject<T> {
  return Object.values(obj).every((val) => !is.nullOrUndefined(val));
}
