import { RouterEvents } from './types';
import { Events } from '~modules/Events';
import { documentReady } from '~common/scripts/utils/documentReady';

class AppRouter extends Events<RouterEvents> {
  events = RouterEvents;

  currentRoute: string;

  readonly routes: Map<string, Function>;

  private readonly history: History;

  private readonly location: Location;

  constructor() {
    super();
    this.location = window.location;
    this.history = window.history;
    this.routes = new Map();
    this.currentRoute = '';
  }

  start() {
    window.onpopstate = () => this.init();
    documentReady(() => this.init());
    this.emit(this.events.start);
  }

  get url(): string {
    const { pathname, hash } = this.location;
    return `${pathname}${hash}`;
  }

  private init(route: string = this.url, data?, state?) {
    if (this.currentRoute === route) {
      return this;
    }
    const onRoute = this.routes.get(route);
    if (onRoute) {
      try {
        this.currentRoute = route;
        if (state) {
          this.history.pushState(state, '', route);
        }
        return onRoute(data);
      } catch (error) {
        this.emit(RouterEvents.error, { error, route });
        return this;
      }
    }
    this.emit(RouterEvents.error, {
      route,
      error: new Error('Not found'),
    });
    return this;
  }

  go(route: string, data?): this {
    const state = {
      prev: this.url,
      data: data ? JSON.stringify(data) : '',
    };
    return this.init(route, data, state);
  }

  use(routes: string | string[], onRoute: Function): this {
    [].concat(routes).forEach((route) => {
      if (this.routes.has(route)) {
        throw new Error(`Route ${route} already use`);
      }
      this.routes.set(route, onRoute);
    });
    return this;
  }

  remove(route: string): this {
    this.routes.delete(route);
    return this;
  }

  back(): this {
    this.history.back();
    return this;
  }

  forward(): this {
    this.history.forward();
    return this;
  }

  catch(callback): this {
    this.on(RouterEvents.error, callback);
    return this;
  }
}

const Router = new AppRouter();

export { Router };
