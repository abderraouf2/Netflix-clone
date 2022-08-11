import Card from "./card";
import Link from "next/link";
import styles from './sectionCard.module.css'
import clsx from 'classnames'
const SectionCards = (props) =>{
  const { title, videos=[] ,size, shouldWrap = false, shouldScale } = props
  return(
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={clsx( styles.cardWrapper, shouldWrap && styles.wrap )}>
        {
          videos.map((video, index)=>{ 
            return(<Link href={`/video/${video.id}`}><a><Card key={index} id={index} imgUrl={video.imgUrl} size={size} shouldScale={shouldScale}/></a></Link>)})
        }
        
      </div>
    </section>
  )
}

export default SectionCards;

