import '../styles/globals.css';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Add favicon links here */}
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/robot-pink.ico"
        />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
