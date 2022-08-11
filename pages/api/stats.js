import { findVideoIdByUserId,updateStats,insertStats } from "../../lib/db/hasura";
import { verifyToken } from "../../lib/utils";

export default async function stats(req,res){

  try {
    const token = req.cookies.token;
      
      if (!token) {
        res.status(403);
        res.send({ msg : "error, no cookie detected"})
      }
      const { videoId } = req.method === "POST" ? req.body : req.query
      if (videoId) {
      
      const userId= await verifyToken(token);
      const findVideo = await findVideoIdByUserId( token, userId, videoId );
      const doesStatsExist = findVideo?.length > 0;
      
      if (req.method==="POST") { 
          const {favourited, watched=true } = req.body
          console.log({ doesStatsExist });
          if(doesStatsExist){
            console.log("updating...");
            const response = await updateStats(token, {userId, videoId,favourited ,watched })
            res.send({ msg : "updated", data: response.data })
          } else {
            console.log("inserting..."); 
            const response = await insertStats(token, { userId, videoId, favourited, watched })
            res.send({ msg : "inserted",data: response.data })
          }
      } else {
        if(doesStatsExist){
          res.send(findVideo);
        } else {
          res.status(404).send({msg : "video not found"})
        }
      }
    }
      
  } catch (error) {
    res.status(500).send({ done: false, error: error?.message})
  }
}


