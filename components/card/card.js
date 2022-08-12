import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import cls from "classnames";
import styles from './card.module.css'

const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

const Card = (props) =>{
  const {imgUrl= '/static/cliffor.webp', size = 'medium',id, shouldScale = true } = props

  const [ImgSrc, setImgSrc] = useState(imgUrl);
  const classMap= {
    'large': styles.lgItem,
    'medium': styles.mdItem,
    'small': styles.smItem
  }

  const scale = id ===0 ? {scaleY:1.1} : {scale:1.1}
  const shouldHover = shouldScale && {
    whileHover: {...scale}
  }
  const handleError=()=>{
    
    setImgSrc('https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW92aWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')
  }
  return(
    <div 
                className={styles.container}>
      
      <motion.div {...shouldHover}
                  className={cls(styles.imgMotionWrapper,classMap[size])}>  
      <Image 
              
              className={styles.cardImg} 
              onError={handleError} 
              src={ImgSrc} 
              layout='fill' />
      </motion.div>
    </div>
  )
}

export default Card;