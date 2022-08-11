
import { mAdmin } from "../../lib/magic-admin";
import jwt from "jsonwebtoken";
import { isNewUser,createNewUser } from "../../lib/db/hasura";
import { setTokenCookie } from "../../lib/cookies";

export default async function login(req,res) {
  if (req.method === "POST") {
  try {
    const auth = req.headers.authorization;
    const didToken = auth ? auth.substr(7) : '';

    // invoke magic

    const metadata = await mAdmin.users.getMetadataByToken(didToken)
    console.log({metadata});
    // create JWT

    const token = jwt.sign({
      issuer: `${metadata.issuer}`,
      publicAddress: `${metadata.publicAddress}`,
      email: `${metadata.email}`,
      iat: Math.floor(Date.now()/1000),
      exp: Math.floor(Date.now()/1000 + 7*24*60*60),
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["user", "admin"],
        "x-hasura-default-role": "user",
        "x-hasura-user-id": `${metadata.issuer}`  
      }
    },process.env.JWT_SECRET);

    //check if user exists

    const newUser = await isNewUser(token,metadata.issuer)
    console.log({newUser : newUser});
    if (newUser) {
      await createNewUser(token,metadata);
      
      //set cookie

      const cookie = setTokenCookie(token,res);
      console.log({cookie});

      res.send({ done : true ,msg : 'this is a new user'})
    } else {

      //set cookie

      const cookie = setTokenCookie(token,res);
      console.log({cookie});
      res.send({ done : true ,msg : 'not a new user'})
    }
   
  } catch (error) {
    console.log("something went wrong logging in", error);
    res.status(500).send({ done : false })
  }
  } else {
    res.send({ done : false })
  }
}