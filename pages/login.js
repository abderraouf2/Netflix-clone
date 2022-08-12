import Head from "next/head";
import styles from '../styles/login.module.css'; 
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import magic from '../lib/magic'
const Login = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [loading,setLoading] = useState(false)


  useEffect(()=>{
    const handleComplete = () =>{
      setLoading(false)
    }
      router.events.on('routeChangeComplete',handleComplete)
      router.events.on('routeChangeError',handleComplete)
      return () => {
        router.events.off('routeChangeComplete',handleComplete)
        router.events.off('routeChangeError',handleComplete)
      }
  },[router])

  const HandleLogin = async (e) =>{
    e.preventDefault();
    if(email){
        try {
            setLoading(true);
            const DID = await magic.auth.loginWithMagicLink({ email, });
            
            if (DID) {
              const response = await fetch('/api/login',{
                method: "POST",
                headers:{
                  'Authorization': `Bearer ${DID}`,
                  'Content-Type': "application.json"
                }
              });
              const loggedInResponse = await response.json();
              if (loggedInResponse.done) {
                
                router.push('/')
              }else {
                setLoading(false);
                setMessage("Something went wrong loggin in")
              }
            }
          } catch (error){
            
          }
    } else {
      setMessage('enter a valide email Address')
    }
  }
  const handleOnEmailChange = (e) =>{
    setMessage("")
      const email = e.target.value;
      setEmail(email)
      
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix signin</title>
      </Head>
      <header className={styles.header}>
          <div className={styles.headerWrapper}>
            <Link href="/">
              <a className={styles.logoLink}>
                <div className={styles.logoWrapper}>
                <Image src="/static/netflix.svg" 
                      alt='netflix logo' 
                      width="200px" 
                      height='50px' />
                </div>
              </a>
            </Link>
          </div>
      </header>
          <main className={styles.main}>
            <div className={styles.mainWrapper}>
                <h1 className={styles.signinHeader}>Sign In</h1>
                <input
                      onChange={handleOnEmailChange} 
                      className={styles.emailInput} 
                      type="email" 
                      placeholder="Email address" />
                <p className={styles.usermsg}>{message}</p>  
                <button className={styles.loginBtn} onClick={HandleLogin}>
                  {loading ? 'signing in ...' : 'Sign In'}
                </button>
            </div>
          </main>
      
    </div>
  )
}

export default Login;