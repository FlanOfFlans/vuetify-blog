export type Reviver = (key: string, value: unknown) => unknown;

// JSON reviver utility
// Allows composing multiple reviver functions
// Overkill right now, but very useful should this be scaled up!
export const pipeRevivers = (revivers: Reviver[]) => 
    (key: string, value: unknown) => 
        revivers.reduce((v, f) => f(key, v), value);

export const asDate = (prop: string) => 
    (key: string, value: unknown) =>
        key === prop && 
            typeof key === "string" || 
            typeof key === "number" 
        ? new Date(value as string)
        : value;