import { EventEmitter } from 'events';
import { Templator } from '~modules/Templator';

export enum ComponentEvents {
  created = 'component:created',
  updated = 'component:updated',
  mounted = 'component:mounted',
  unmounted = 'component:unmounted',
}

export interface ComponentInterface {
  readonly on: Function;
  readonly off: Function;
  readonly emit: Function;
  readonly props?: Record<string, any>;
  readonly state: Record<string, any>;
  readonly emitter: EventEmitter;
  readonly templator: Templator;
  readonly el: Element;
  readonly container: Element;
  readonly setState: Function;
  readonly getState: Function;
  readonly mount: Function;
  readonly unmount: Function;
  updated: Function;
  mounted: Function;
  unmounted: Function;
  created: Function;
}
