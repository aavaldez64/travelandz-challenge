export type HashFunction = (password: string, salt?: number) => string;
export type CompareFunction = (password: string, hash: string) => boolean;
