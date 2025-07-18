export class APIError extends Error {
  status: number;
  fieldErrors?: Record<string, string>;

  constructor(
    message: string,
    status: number,
    fieldErrors?: Record<string, string>,
  ) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.fieldErrors = fieldErrors;
    Object.setPrototypeOf(this, APIError.prototype);
  }
}
