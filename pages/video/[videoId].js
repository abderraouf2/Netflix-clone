import { useRouter } from "next/router"
import Modal from 'react-modal';
import styles from '../../styles/video.module.css';
import { getYoutubeVideoById } from "../../lib/videos";
import NavBar from '../../components/navBar/navbar'
import clsx from 'classnames'
import Like from "../../components/icons/like";
import Dislike from "../../components/icons/dislike";
import { useEffect, useState } from "react";
import useRedirect from '../../utils/redirect'
Modal.setAppElement("#__next");



export async function getStaticProps(context) {
  // const { userId, token } = await useRedirect(context);
  // if (!token) {
  //   return {
  //     props: {},
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  //     },
  //   }
  // }

  const videoId = context.params.videoId;
  console.log(context);
  const videoArray = await getYoutubeVideoById(videoId)
  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 60, // In seconds
  }
}

export async function getStaticPaths() {
  const listOfVideos = ['H44eTKam6Uc','mYfJxlgR2jw','4zH5iYM4wJo', 'KCPEHsAViiQ']

  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }))

  return { paths, fallback: 'blocking' }
}



const Video = (video) => {
  const verify = async () => {
    const response  = await fetch(`/api/stats?videoId=${videoId}`, {
      method:"GET"
    })
    const data = await response.json();
    console.log({ data });
    if (data.length > 0) {
      const favourited = data[0].favourited;
      if (favourited === 1) {
        setLike(true)
      } else if (favourited === 0){
        setDislike(true)
      }
    }
  }

  useEffect(()=>{
   verify();
  },[])

  const router = useRouter(); 
  const videoId = router.query.videoId;
  const {title,publishedAt,description,channelTitle,statistics :{viewCount} = {viewCount: '0'}} = video.video;
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const RatingServer = async (favourited) => {
    return await fetch("/api/stats", {
      method:"POST",
      body: JSON.stringify({
             videoId, 
             favourited,
            }),
      headers : {
        'Content-Type' : "application/json"
      }
    })
  }

  const toggleLike = async () => {
    setLike(!like)
    setDislike(false)
    console.log("liked");
    const val = !like;
    const favourited = val ? 1 : null
    const response = await RatingServer(favourited)
    console.log("data", await response.json());
  }
  const toggleDislike = async() => {
    setLike(false)
    setDislike(!dislike)
    console.log("disliked");
    const val = !dislike;
    const favourited = val ? 0 : null
    const response = await RatingServer(favourited)
    console.log("data", await response.json());
  }
  
  return (
    <div className={styles.container}>
      <NavBar />
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={()=>router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >     
        <iframe 
                className={styles.videoPlayer}
                id="ytplayer" type="text/html" width="100%" height="360"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=1`}
                frameborder="0">
       </iframe>
       <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>  
            <button onClick={toggleLike} >
              <div className={styles.btnWrapper}>
              <Like selected ={like}/>
              </div>
            </button>
          </div>
        <button  onClick={toggleDislike}>
          <div className={styles.btnWrapper}> 
              <Dislike selected ={dislike}/>
          </div>
        </button>
       </div>

       <div className={styles.modalBody}>
        <div className={styles.modalBodyContent}>
          <div className={styles.col1}>
            <p className={styles.publishTime}>{publishedAt}</p>
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.col2}>
          <p className={clsx(styles.subText, styles.subTextWrapper)}>
            <span className={styles.TextColor}>Cast: </span>
            <span className={styles.channelTitle}>{channelTitle}</span>
          </p>
          <p className={clsx(styles.subText, styles.subTextWrapper)}>
            <span className={styles.textColor}>View Count: </span>
            <span className={styles.channelTitle}>{viewCount}</span>
          </p>
          </div>
        </div>
       </div>
       
      </Modal>

    </div>
  ) 
}

export default Video 