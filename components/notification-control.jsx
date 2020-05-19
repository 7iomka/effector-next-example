import React from 'react';
import { createComponent, useStore } from 'effector-react';
import { $store, rmNotify } from 'models/notification';


export const NotificationList = ({ children }) => {
  return <div className='notification-list'>{children}</div>;
};

export const Notification = ({ children, theme = 'success' }) => {
  return <div className={`notification notification--${theme}`}>{children}</div>;
};

export const NotificationsControl = () => {
  const store = useStore($store);
  return (
    <NotificationList>
      {store.notifications.map((notify) => (
        <div role="button" tabIndex={0} key={notify.uuid} onClick={() => rmNotify(notify.uuid)}>
          {notify.element}
        </div>
      ))}
    </NotificationList>
  );
};

// export const NotificationsControl = createComponent($store, (_, state) => {
//   return (
//     <NotificationList>
//        {state.notifications.map((notify) => (
//         <div role="button" tabIndex={0} key={notify.uuid} onClick={() => rmNotify(notify.uuid)}>
//           {notify.element}
//         </div>
//        ))}
//     </NotificationList>
//   );
// });
