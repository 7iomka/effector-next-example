/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { StoreRefreshManager } from 'utils/effector';
import { fork } from 'effector/fork';
import { Provider as EffectorProvider } from 'effector-react/ssr';
import { domain } from 'effector-next';

/**
 * Bootstraps the page, only when rendered on the browser
 *
 * @param props
 */
const BrowserPage = (props) => {
  const { Component, err, router } = props;
  // When the page is served by the browser, some browser-only properties are available
  const pageProps = props.pageProps;

  // scope for effector provider (client)
  const scope = fork(domain);

  // Init Store-refresh-manager (needed in dev. for fast-refresh)
  const storeRefreshManager = new StoreRefreshManager();
  storeRefreshManager.init();

  // const userId = userSession.id;
  const injectedPageProps = {
    ...pageProps,

  };

  return (
    <EffectorProvider value={scope}>
      <Component
        {...injectedPageProps}
        error={err}
      />
    </EffectorProvider>
  );
};

export default BrowserPage;
