import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/header';
import Footer from '@/components/footer';
import Head from 'next/head';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (<>
    <Head>
      <title>Quizers | Practice from Quizs</title>
      <meta
        name="description"
        content="Practice for your competitive exams"
      />
      <link rel="icon" href="/Qlogo.png" />

    </Head>
    <Script
      strategy="lazyOnload"
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
    />

    <Script id="ga-script" strategy="lazyOnload">
      {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.GOOGLE_ANALYTICS}', {
      page_path: window.location.pathname,
    });
        `}
    </Script>
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  </>)
}
