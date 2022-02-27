export class ExceptionError extends Error {
  public readonly name: string;
  public readonly httpCode: number;
  public readonly isOperational: boolean;

  constructor(
    name: string,
    httpCode: number,
    // isOperational: boolean,
    description: string,
  ) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    this.name = name;
    this.httpCode = httpCode;
    // this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}
