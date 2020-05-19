import { domain } from 'effector-next';

/**
 * Reload store on Fast-refresh
 * On store recreation with an existing sid, update its value based on an already saved
 * state, provided that the default state of the store has not changed
 * (it is stored in store.defaultState)
 */
export class StoreRefreshManager {
  constructor() {
    // eslint-disable-next-line no-multi-assign
    this.states = window.__DEV__STATES__ = window.__DEV__STATES__ || {};
  }

  // eslint-disable-next-line class-methods-use-this
  init() {
    domain.onCreateStore((store) => {
      if (!store.sid) return;
      if (store.sid in this.states) {
        const { defaultState, actual } = this.states[store.sid];
        if (store.defaultState === defaultState) {
          store.setState(actual);
        } else {
          this.states[store.sid] = {
            defaultState: store.defaultState,
            actual: store.getState(),
          };
        }
      } else {
        this.states[store.sid] = {
          defaultState: store.defaultState,
          actual: store.getState(),
        };
      }
      store.updates.watch((value) => {
        this.states[store.sid].actual = value;
      });
    });
  }
}
