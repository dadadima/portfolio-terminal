import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Add favicon links here */}
        <link rel="icon" type="image/png" sizes="16x16" href="/images/robot-pink.ico"/>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
