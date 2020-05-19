import React from "react";
import { useStore, useEvent } from "effector-react/ssr";
import { withStart } from "effector-next";
import Link from "next/link";
import { $data, pageLoaded, buttonClicked } from "models";
// notifications stuff
import { $store, addNotify } from 'models/notification';
import { Notification, NotificationsControl } from 'components/notification-control';
import { getCommonServerSideProps } from 'utils/page/ssr';

const START_UNIT_KEY = "__EFFECTOR_START_UNIT__";


export const getServerSideProps = async (context) => {
  const commonServerSideProps = await getCommonServerSideProps(context);
  // Get some data from API (Graphql query, REST API)

  return {
    // Props returned here will be available as page properties (pageProps)
    props: {
      ...commonServerSideProps,
      customProp: 1500,
    },
  };
};


function HomePage(props) {
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

      <div>Custom prop: {props.customProp}</div>

      <button onClick={handleAddSuccessNotify} >Show notification</button>

      {/*container with all visible notifications*/}
      <NotificationsControl />
    </div>
  );
}

// const enhance = withStart(pageLoaded);
// export default enhance(HomePage);
HomePage[START_UNIT_KEY] = pageLoaded;
export default HomePage;
