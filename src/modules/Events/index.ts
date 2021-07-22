import { EventEmitter } from 'events';
import { EventsCallback, EventsValues } from './types';

// TODO: типизация ...args?
export abstract class Events<TEvents> {
  private readonly emitter = new EventEmitter();

  public readonly events: TEvents;

  on(event: EventsValues<TEvents>, callback: EventsCallback): this {
    this.emitter.on(event, (...args) => callback(...args));
    return this;
  }

  off(event: EventsValues<TEvents>, callback: EventsCallback): this {
    this.emitter.off(event, callback);
    return this;
  }

  emit(event: EventsValues<TEvents>, ...args): this {
    this.emitter.emit(event, ...args);
    return this;
  }
}
