
import React from 'react';
import Image from 'next/image';
import styles from './banner.module.css';
import { useRouter } from 'next/router';

export default function Banner(props) {
  const {title, subtitle, imgUrl,videoId} = props;
  const router = useRouter();
  const HandlePlay =()=>{
    router.push(`video/${videoId}`)
  }
  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>  
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3  className={styles.title}>
            {title}
          </h3>
          <h3  className={styles.subtitle}>
            {subtitle}
          </h3>
          <div className={styles.playBtnWrapper}>
              <button className={styles.btnWithIcon} onClick={HandlePlay}>
                <Image src="/static/play.svg" alt='play Icon' width="32px" height='32px' />
                <span className={styles.playText}>play</span></button>
          </div>
        </div>
      </div>
      <div className={styles.bannerImg}  style={{backgroundImage:`url(${imgUrl})` }}></div>
    </div>
  )
}
