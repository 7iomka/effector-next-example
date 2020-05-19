import React from 'react';
import UniversalApp from 'components/universal-app/univarsal-app';
import { withHydrate } from 'effector-next';

/**
 * This file is the entry point for all pages, it initialize all pages.
 *
 * It can be executed server side or browser side.
 * It can be executed from a static build (SSG) or dynamically per request (SSR).
 *
 * We use "_app" to handle root errors and configure common behaviours and configurations across all pages. (it inits sentry, by importing our helper)
 * Some of those behaviours/config are applied based on the runtime engine (browser vs server) and on the rendering mode (dynamic vs static)
 *
 * Next.js provides huge capabilities, but with such comes complexity.
 * You may have a hard time knowing for sure if a particular function will run identically on browser + server + statically + dynamically
 * For instance, if you depend on cookies, then you'll have a different behaviour whether executing the code:
 *  - During the SSG rendering (server side, but no request and no access to user-data or request-data)
 *  - During a server side request (no access to browser data (localstorage, browser cookies)
 *  - During a client side request (no access to server data (server cookies, HTTP headers)
 *
 *
 * @see https://nextjs.org/docs/advanced-features/custom-app Custom _app
 */

/**
 * Renders the whole page
 * For the sake of readability/maintainability, we have decoupled what happens in the "render" to our "UniversalApp" component.
 *
 * All props returned by "getInitialProps", "getServerSideProps" or "getStaticProps" are available in "props.pageProps".
 * The "Component" prop within "props.pageProps" contains the page that is being rendered.
 */
const UniversalAppEntryPoint = (props) => {
  return <UniversalApp {...props} />;
};

/**
 * XXX We have disabled the use of getInitialProps by default with NRN, because it's what's recommended since v9.3,
 *  feel free to use it if needed, but beware you'll opt-out of automated static optimization for all pages by doing so.
 *
 * By default, all pages will be served statically (using automated static optimization)
 * If the page uses "getStaticProps", then it will use SSG. (a static build will be generated in production, in development it'll simulate a static build)
 * If the page uses "getServerSideProps" or "getInitialProps", then it will use SSR. (your request will be served dynamically by a Serverless Function (AKA AWS Lambda))
 *
 * From the official doc:
 * If you're using Next.js 9.3 or newer, we recommend that you use getStaticProps or getServerSideProps instead of getInitialProps.
 * These new data fetching methods allow you to have a granular choice between static generation and server-side rendering.
 *
 * @see https://nextjs.org/docs/api-reference/data-fetching/getInitialProps Recommendations regarding "getInitialProps"
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation "getStaticProps" doc
 * @see https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering "getServerSideProps" doc
 */

// export default UniversalAppEntryPoint;
// To get the initial state on the client and drop it into the application, we attach
// withHydrate wrapper to own UniversalAppEntryPoint component
const enhance = withHydrate();

export default enhance(UniversalAppEntryPoint);
