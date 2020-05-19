/* eslint-disable react/destructuring-assignment */
import React from 'react';

/**
 * Bootstraps the page, only when rendered on the browser
 *
 * @param props
 */
const BrowserPage = (props) => {
  const { Component, err, router } = props;
  // When the page is served by the browser, some browser-only properties are available
  const pageProps = props.pageProps;

  // On server, we can access some data with req/res or page context and prepare this props on page-level inside getServerSideProps
  // (see getCommonServerSideProps in utils/page/ssr.js)

  // const userId = userSession.id;
  const injectedPageProps = {
    ...pageProps,

  };

  return (
    <Component
      {...injectedPageProps}
      // @ts-ignore
      error={err}
    />
  );
};

export default BrowserPage;
