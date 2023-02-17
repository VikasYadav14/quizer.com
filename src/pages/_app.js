import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/header';
import Footer from '@/components/footer';
import Head from 'next/head';

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
      <>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </>
  </>)
}
