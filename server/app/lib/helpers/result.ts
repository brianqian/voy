/**
 * `Result` or `Either` generic type, meaning it captures the success or failure of an operation.
 */
export module Result {
  /**
   * Enum capturing status of operation
   */
  export type Status = 'SUCCESS' | 'FAILURE';

  /**
   * A successful result.
   * @member type always `Status.SUCCESS`
   * @member value the value associated with this successful result
   */
  export interface SuccessType<TSuccess> {
    readonly type: 'SUCCESS';
    readonly value: TSuccess;
  }

  /**
   * A failed result.
   * @member type always `'FAILURE'`
   * @member value the value associated with this failed result
   */
  export interface FailureType<TFailure> {
    readonly type: 'FAILURE';
    readonly value: TFailure;
  }

  /**
   * A result that might be success or failure, determinable by checking
   * .type (either directly or with `Result.isSuccess()` or `Result.isFailure()`)
   */
  export type Type<TSuccess, TFailure> = SuccessType<TSuccess> | FailureType<TFailure>;

  /**
   * Creates a successful result
   * @param value a value to use in a successful result
   * @description equal to `lift()` / `return()` in category theory
   */
  export function success<TSuccess>(value: TSuccess): SuccessType<TSuccess> {
    return { type: 'SUCCESS', value };
  }

  /**
   * Creates a failed result
   * @param value a value to use in a failed result
   */
  export function failure<TFailure>(value: TFailure): FailureType<TFailure> {
    return { type: 'FAILURE', value };
  }

  /**
   * Indicates if result is a success.  In the "condition is true" scope following,
   * the type is narrowed to a success result. In the "condition is false" scope,
   * it is narrowed to a failure result.
   * @param result the result to check
   */
  export function isSuccess<TSuccess, TFailure>(
    result: Type<TSuccess, TFailure>
  ): result is SuccessType<TSuccess> {
    return result.type === 'SUCCESS';
  }

  /**
   * Indicates if result is a failure.  In the "condition is true" scope following,
   * the type is narrowed to a failure result. In the "condition is false" scope,
   * it is narrowed to a success result.
   * @param result the result to check
   */
  export function isFailure<TSuccess, TFailure>(
    result: Type<TSuccess, TFailure>
  ): result is FailureType<TFailure> {
    return result.type === 'FAILURE';
  }

  export function toMaybe<S>(v: Result.Type<S, any>): S | null {
    if (Result.isSuccess(v)) {
      return v.value;
    }
    return null;
  }

  /**
   * Take a list of Result.Type values and return
   * a Result of Success[] or *first failed value*
   * @param xs list of result values
   */
  export function listInvert<TSuccess, TFailure>(
    xs: readonly Type<TSuccess, TFailure>[]
  ): Type<readonly TSuccess[], TFailure> {
    const successes: TSuccess[] = [];
    for (const x of xs) {
      if (isFailure(x)) {
        return x;
      }
      successes.push(x.value);
    }
    return success(successes);
  }

  /**
   * success functor map for Result
   * @param r a result
   * @param fn a function that creates a new "success" value (if `r`
   * is a success)
   * @returns a Result.Type with a new success value, or the failure value of `r`
   */
  export function successMap<TS1, TS2, TF>(r: Type<TS1, TF>, fn: (s: TS1) => TS2): Type<TS2, TF> {
    return isSuccess(r) ? success(fn(r.value)) : r;
  }

  /**
   * failure functor map for Result
   * @param r a result
   * @param fn a function that creates a new "fail" value (if `r` is a failure)
   * @returns a Result.Type with a new failure value, or the success value of `r`
   */
  export function failureMap<TS, TF1, TF2>(r: Type<TS, TF1>, fn: (f: TF1) => TF2): Type<TS, TF2> {
    return isFailure(r) ? failure(fn(r.value)) : r;
  }
}
