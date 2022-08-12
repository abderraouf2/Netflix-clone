import videoTestData from '../data/videos.json';
import { getWatchedVideos,getLikedVideos } from './db/hasura';


const fetchVideos = async (URL) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const BASE_URL = `youtube.googleapis.com/youtube/v3`;
  const response = await fetch(`https://${BASE_URL}/${URL}&key=${YOUTUBE_API_KEY}`)
  return await response.json();
}
export const getCommunVideos = async (URL) => {
  
  try {   
    // const isDev = process.env.DEVELOPEMENT
    const data = await fetchVideos(URL)

    if (data?.error) {
     
      return []
    }

    return data?.items.map((item)=>{
      const id = item.id?.videoId || item.id
      return {
        title:item.snippet.title,
        imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` ,
        id,
        description : item.snippet.description,
        channelTitle: item .snippet.channelTitle,
        statistics : item.statistics ? item.statistics : {viewCount : 0},
        publishedAt: item.snippet.publishedAt
      }
     });
  } catch (error) {
    console.log("Something went wrong, please refresh")
    return [];
  }
}

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&maxResults=25&q=${searchQuery}`
  return getCommunVideos(URL)
}

export const getPopularVideos = () => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=25&regionCode=US`

  return getCommunVideos(URL)
}

export const getYoutubeVideoById = (videoId) => {
  const URL =  `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`
  return getCommunVideos(URL)
}

export const getWatchedVideosList = async ( userId, token ) => {
  const videos = await getWatchedVideos ( userId, token ) 
  return videos.map((video) => {
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`  
    }
  })
}

export const getLikedVideosList = async ( userId, token ) => {
  const videos = await getLikedVideos ( userId, token ) 
  return videos.map((video) => {
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`  
    }
  })
}
