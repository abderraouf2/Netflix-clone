import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from './navbar.module.css'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import magic from '../../lib/magic';

const NavBar = () => {
  const router = useRouter();
  const handleOnClickHome = (e) =>{
    e.preventDefault()
    router.push('/')
  }
  const handleOnClickMyList = (e) =>{
    e.preventDefault()
    router.push({
      pathname: `/browse/my-list`,
    });
  }
  const [display,setDisplay]= useState(false);
  const [username,setUsername]= useState("");
  const handleLogOut =async (e) => {
    e.preventDefault();
    const didToken = await magic.user.getIdToken();
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
    } catch (error) {
      console.error("Error logging out", error);
      router.push("/login");
    }
  };
  const getEmail = async () =>{
    try {
      const { email } = await magic.user.getMetadata();
      const didToken = await magic.user.getIdToken();
      
      if(email){
        setUsername(email);
      }
    } catch {
      
      // Handle errors if required!
    }
  }
  useEffect( () =>{
    getEmail();
  },[])
  return(
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/">
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>
            <Image src="/static/netflix.svg" alt='netflix logo' width="200px" height='50px' />
            </div>
          </a>
        </Link>
        <ul className={styles.navItems}>
          <li  className={styles.navItem} onClick={handleOnClickHome}>Home</li>
          <li  className={styles.navItem} onClick={handleOnClickMyList}>My list</li>
        </ul>

        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={()=>setDisplay(!display)}>
              <p  className={styles.username}>{username}</p>
              <Image src="/static/expand.png" alt='play Icon' width="20px" height='20px' />
            </button>
            {/* expand more icon */}
            {display && <div  className={styles.navDropdown}>
              <div>
                
                  <a  className={styles.linkName} onClick={handleLogOut} >sign out </a>
                
              <div  className={styles.lineWrapper}>
              </div>  
              </div>
            </div>}
          </div>
        </nav>
      </div>
    </div>

  )
}

export default NavBar;