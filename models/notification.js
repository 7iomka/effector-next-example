import { v4 as uuidv4 } from 'uuid';
import { createDomain } from 'effector-next';

export const EventDomain = createDomain();
export const addNotify = EventDomain.event();
export const addLoadingNotify = EventDomain.event();
export const rmNotify = EventDomain.event();

const initialState = {
  notifications: [],
  timeoutTransition: 400,
  timeoutNotifications: 25000,
  loadinguiid: uuidv4(),
};

export const $store = EventDomain.store(initialState)
.on(addNotify, (state, component) => {
  const { notifications } = state;
  const notification = {
    element: component,
    uuid: uuidv4(),
  };

  notifications.push(notification);

  setTimeout(() => rmNotify(notification.uuid), state.timeoutNotifications);

  return {
    ...state,
    notifications,
  };
})
.on(addLoadingNotify, (state, component) => {
  const { notifications } = state;
  const notification = {
    element: component,
    uuid: state.loadinguiid,
  };
  const hasDuplicate = notifications.some((el) => el.uuid === state.loadinguiid);

  if (!hasDuplicate) {
    notifications.push(notification);
  }

  return {
    ...state,
    notifications,
  };
})
.on(rmNotify, (state, uuid) => ({
  ...state,
  notifications: state.notifications.filter((el) => el.uuid !== uuid),
}));

export default {
  $store,
  addNotify,
  addLoadingNotify,
  rmNotify,
};
