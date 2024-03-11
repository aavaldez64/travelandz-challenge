type Errors = { errors: string[] };
export type DtoResponse<T> = [string | Errors] | [null, T];
