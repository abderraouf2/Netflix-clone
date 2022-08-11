import Head from "next/head"
import NavBar from "../../components/navBar/navbar";
import SectionCards from '../../components/card/sectionCards';
import styles from '../../styles/myList.module.css'
import useRedirect from "../../utils/redirect";
import { getLikedVideosList } from "../../lib/videos";

export async function getServerSideProps (context) {

  const { userId, token } = await useRedirect(context);
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const likedList = await getLikedVideosList(userId, token)
  return {props : { likedList }}
}

const MyList = (props) => {
  const { likedList } = props;
  return(
    <div>
      <Head>
        <title>My list</title>
      </Head>
      <main className={styles.main}>
      <NavBar />
      <div className={styles.sectionWrapper}>
        <SectionCards title="My List" videos={likedList} size="small" shouldWrap={true} shouldScale={false} />
      </div>
      </main>
    </div>
  )
}

export default MyList