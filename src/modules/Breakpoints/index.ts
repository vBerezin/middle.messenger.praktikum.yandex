import { BreakpointsPoints, BreakpointsNames, BreakpointsQueries } from './types';

class Instance {
  readonly points: BreakpointsPoints;

  protected current: string | null;

  private readonly callbacks: Set<Function>;

  private readonly queries: BreakpointsQueries;

  constructor(points: BreakpointsPoints) {
    this.current = '';
    this.queries = [];
    this.points = points;
    this.callbacks = new Set<Function>();

    Object.entries(points).forEach(([name, screen]) => {
      const media = window.matchMedia(`(min-width: ${screen}px)`);
      media.addEventListener('change', () => this.refresh());
      this.queries.push({ name, screen, media });
    });
    this.queries.sort((a, b) => a.screen - b.screen);
    this.refresh();
  }

  private refresh(): void {
    const active = this.queries.filter(({ media }) => media.matches);
    if (active.length) {
      const { name } = active[active.length - 1];
      this.current = name;
      this.callbacks.forEach((callback) => callback());
    } else {
      this.current = null;
    }
  }

  private matches(names: BreakpointsNames) {
    const matches = ([] as string[]).concat(names).filter((name) => name === this.current);
    return matches.length ? matches : false;
  }

  once(names: BreakpointsNames, fn?: Function, cb?: Function) {
    let allowFn = true;
    let allowCb = true;
    const handler = () => {
      if (this.matches(names)) {
        if (fn && allowFn) {
          allowFn = false;
          allowCb = true;
          return fn(this.current);
        }
      } else if (cb && allowCb) {
        allowCb = false;
        allowFn = true;
        return cb(this.current);
      }
      return false;
    };
    this.callbacks.add(handler);
    handler();
  }

  on(names: BreakpointsNames, fn?: Function, cb?: Function) {
    const handler = () => {
      if (this.matches(names)) {
        if (fn) {
          return fn(this.current);
        }
      } else if (cb) {
        return cb(this.current);
      }
      return false;
    };
    this.callbacks.add(handler);
    handler();
  }

  onchange(callback: Function): void {
    let last = this.current;
    if (this.current) {
      callback(this.current);
    }
    this.callbacks.add(() => {
      if (this.current !== last) {
        last = this.current;
        callback(this.current);
      }
    });
  }
}

const Breakpoints = new Instance({
  xxs: 0,
  xs: 475,
  sm: 768,
  md: 1024,
  lg: 1200,
  xl: 1366,
  xxl: 1440,
});

export { Breakpoints };
