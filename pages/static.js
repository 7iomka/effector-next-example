import React from "react";
import Link from "next/link";
// notifications stuff
import { addNotify } from 'models/notification';
import { Notification, NotificationsControl } from '../components/notification-control';

export default function StaticOptimizedPage() {
  // add notification to store
  const handleAddSuccessNotify = () => {
    return addNotify(
      <Notification theme="success">
        <div>Something success happens</div>
        <div>some else</div>
      </Notification>,
    );
  };
  return (
    <div>
      <h1>Static Page</h1>
      <br />
      <Link href="/">
        <a href="/">to server page</a>
      </Link>
      <button onClick={handleAddSuccessNotify} >Show notification</button>

      {/*container with all visible notifications*/}
      <NotificationsControl />
    </div>
  );
}
