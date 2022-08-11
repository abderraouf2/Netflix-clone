import { verifyToken } from "../lib/utils";

const useRedirect = async (context) =>{
  const token = await context.req ? context.req.cookies.token : null;
  console.log({ token });
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

export default useRedirect;