import React from 'react';
import Head from 'next/head';
import {isBrowser} from 'utils';
import BrowserPage from './browser-page';
import ServerPage from './server-page';



/**
 * Bootstraps a page and renders it
 *
 * Basically does everything a Page component needs to be rendered.
 * All behaviors defined here are applied across the whole application (they're common to all pages)
 *
 * @param props
 */
const UniversalApp = (props) => {
  const { pageProps } = props;

  if (isBrowser()) {
    // Avoids log clutter on server
    console.debug('UniversalAppBootstrap.props', props);
  }

  if (pageProps.isReadyToRender || pageProps.statusCode === 404) {
    console.info('App is ready, rendering...');

    /*
     * We split the rendering between server and browser
     * There are actually 3 rendering modes, each of them has its own set of limitations
     *  1. SSR (doesn't have access to browser-related features (LocalStorage), but it does have access to request-related data (cookies, HTTP headers))
     *  2. Server during SSG (doesn't have access to browser-related features (LocalStorage), nor to request-related data (cookies, localStorage, HTTP headers))
     *  3. Static rendering (doesn't have access to server-related features (HTTP headers), but does have access to request-related data (cookie) and browser-related features (LocalStorage))
     *
     * What we do here, is to avoid rendering browser-related stuff if we're not running in a browser, because it cannot work properly.
     * (e.g: Generating cookies will work, but they won't be stored on the end-user device, and it would create "Text content did not match" warnings, if generated from the server during SSG)
     *
     * So, the BrowserPage does browser-related stuff and then call the Page which takes care of stuff that is universal (identical between browser and server)
     *
     * XXX If you're concerned regarding React rehydration, read our talk with Josh, author of https://joshwcomeau.com/react/the-perils-of-rehydration/
     *  https://twitter.com/Vadorequest/status/1257658553361408002
     *
     * XXX There may be more rendering modes - See https://github.com/zeit/next.js/discussions/12558#discussioncomment-12303
     */
    let browserPageBootstrapProps;
    let serverPageBootstrapProps;

    // Maybe this isn't good for rehydration and needs to be re-implemented - see
    // https://joshwcomeau.com/react/the-perils-of-rehydration/
    if (isBrowser()) {
      browserPageBootstrapProps = {
        ...props,
        pageProps: {
          ...pageProps,
        },
      };
    } else {
      serverPageBootstrapProps = {
        ...props,
        pageProps: {
          ...pageProps,
        },
      };
    }

    const PageComponentToRender = () => (
      <>
        <Head />
        {isBrowser() ? (
          <BrowserPage {...browserPageBootstrapProps} />
        ) : (
          <ServerPage {...serverPageBootstrapProps} />
        )}
      </>
    );

    return (<PageComponentToRender />);
  } else {
    // We wait for out props to contain "isReadyToRender: true", which means they've been set correctly by either getInitialProps/getStaticProps/getServerProps
    // This helps avoid multiple useless renders (especially in development mode) and thus avoid noisy logs
    // XXX I've recently tested without it and didn't notice any more logs than expected/usual. Maybe this was from a time where there were multiple full-renders? It may be removed if so (TODO later with proper testing)
    console.info('App is not ready yet, waiting for isReadyToRender');
    return null;
  }
};

export default UniversalApp;
