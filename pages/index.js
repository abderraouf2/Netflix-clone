import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Banner from '../components/banner/banner';
import NavBar  from '../components/navBar/navbar';
import SectionCards from '../components/card/sectionCards';

import { getVideos,getPopularVideos,getWatchedVideosList } from '../lib/videos';

import useRedirect from '../utils/redirect';

export async function getServerSideProps (context) {
  const {userId, token} = await useRedirect(context);
  // if (!userId) {
  //   return {
  //     props: {},
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  //     },
  //   }
  // }
  const DisneyVideos = await getVideos('disney trailer');
  const AnimeVideos = await getVideos('one piece');
  const TravelVideos = await getVideos('travel');
  const watchedVideosList = await getWatchedVideosList( userId, token )
  const PopularVideos = await getPopularVideos();
  return {props : { DisneyVideos,AnimeVideos,TravelVideos,PopularVideos,watchedVideosList }}
}

export default function Home(props) {
  const {DisneyVideos,AnimeVideos, TravelVideos,PopularVideos,watchedVideosList } = props;
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.MAIN}>
        <NavBar />

        {/* <Card /> */}
        <Banner 
          videoId='4zH5iYM4wJo'
          title="Clifford the red dog"
          subtitle='a very cute dog' 
          imgUrl='/static/clifford.webp' 
        />
        <div className={styles.sectionWrapper}>
          
        <SectionCards title='Disney' videos={DisneyVideos} size='large' />
        <SectionCards title='Watch it again' videos={watchedVideosList} size='small' />
        <SectionCards title='Anime' videos={AnimeVideos} size='medium' />
        <SectionCards title='Travel' videos={TravelVideos} size='small' />
        <SectionCards title='Popular' videos={PopularVideos} size='small' />
        </div>
      </div>

    </div>
  )
}