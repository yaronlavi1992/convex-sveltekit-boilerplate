import { Result, ok, err, ResultAsync } from "neverthrow";

export { Result, ok, err, ResultAsync };

// Utility to convert a promise to a ResultAsync
export const fromPromise = <T, E = Error>(
  promise: Promise<T>,
  errorHandler: (e: unknown) => E = (e) => e as E,
): ResultAsync<T, E> => {
  return ResultAsync.fromPromise(promise, errorHandler);
};

// Utility to safely execute a function that might throw
export const tryCatch = <T, E = Error>(
  fn: () => T,
  errorHandler: (e: unknown) => E = (e) => e as E,
): Result<T, E> => {
  try {
    return ok(fn());
  } catch (e) {
    return err(errorHandler(e));
  }
};

// Utility to safely execute an async function
export const tryCatchAsync = <T, E = Error>(
  fn: () => Promise<T>,
  errorHandler: (e: unknown) => E = (e) => e as E,
): ResultAsync<T, E> => {
  return fromPromise(fn(), errorHandler);
};
