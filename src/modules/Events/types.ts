export type EventsValues<TEvents> = keyof Record<TEvents, string>;
export type EventsCallback = (...args) => void;
