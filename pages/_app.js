import { useEffect, useState } from 'react'
import '../styles/globals.css'
import magic from '../lib/magic'
import { useRouter } from 'next/router';
import Loading from '../components/loading/loading';

function MyApp({ Component, pageProps }) {
  
  const router = useRouter();
  const [loading,setLoading] = useState(true)
  
  useEffect(() => {
    const handleComplete = () => {
      setLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete());
    router.events.on("routeChangeError", handleComplete());

    return () => {
      router.events.off("routeChangeComplete", handleComplete());
      router.events.off("routeChangeError", handleComplete());
    };
  }, [router]);

  return (
    loading ?
     <Loading />
    : 
     <Component {...pageProps} />)
}

export default MyApp
