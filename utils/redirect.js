import { verifyToken } from "../lib/utils";

const RedirectInfo = async (context) =>{
  const token = await context.req ? context.req.cookies.token : null;
  
  const userId = await verifyToken(token);
  // if (!token) {
  //     return {
  //       props: {},
  //       redirect: {
  //         destination: '/login',
  //         permanent: false,
  //       },
  //     }
  //   }
  return {
    userId,
    token
  }
}

export default RedirectInfo;