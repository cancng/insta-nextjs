import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
