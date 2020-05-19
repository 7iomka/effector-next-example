import React from "react";
import { useStore, useEvent } from "effector-react";
import { withStart } from "effector-next";
import Link from "next/link";
import { $data, pageLoaded, buttonClicked } from "../models";
// notifications stuff
import { $store, addNotify } from 'models/notification';
import { Notification, NotificationsControl } from '../components/notification-control';

const enhance = withStart(pageLoaded);

function HomePage() {
  const data = useStore($data);
  const handleClick = useEvent(buttonClicked);

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
      <h1>Server Page</h1>
      <h2>Store state: {JSON.stringify({ data })}</h2>
      <button onClick={handleClick}>click to change store state</button>
      <br />
      <br />
      <Link href="/static">
        <a href="/static">to static page</a>
      </Link>

      <button onClick={handleAddSuccessNotify} >Show notification</button>

      {/*container with all visible notifications*/}
      <NotificationsControl />
    </div>
  );
}

export default enhance(HomePage);
