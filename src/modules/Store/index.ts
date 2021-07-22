import { StoreEvents, StorePaths, StoreState } from './types';
import { Events } from '~modules/Events';

class StateStorage extends Events<StoreEvents> {
  readonly events = StoreEvents;

  readonly paths = StorePaths;

  private readonly storage = window.sessionStorage;

  private readonly state: StoreState = {
    profile: undefined,
    chats: [],
    users: [],
  };

  constructor() {
    super();
    const state = this.storage.getItem('state-storage');
    if (state) {
      this.state = JSON.parse(state);
    }
  }

  getState<TPath>(path: TPath): StoreState[TPath] | undefined {
    try {
      return path
        .split('.')
        .reduce((current, item) => current[item], this.state);
    } catch (e) {
      return undefined;
    }
  }

  setState<TPath>(path: TPath, data: StoreState[TPath]) {
    path
      .split('.')
      .reduce((state, current, index, arr) => {
        const last = index === arr.length - 1;
        if (last) {
          state[current] = data;
        } else {
          state[current] = state[current] || {};
        }
        return state[current];
      }, this.state);
    this.storage.setItem('state-storage', JSON.stringify(this.state));
    this.emit(this.events.update, this.state);
  }
}

export const Store = new StateStorage();

window.Store = Store;
