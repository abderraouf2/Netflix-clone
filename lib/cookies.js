
import cookie from 'cookie'

const maxAge = 7*24*60*60;

export const setTokenCookie = (token,res) => {
  const setCookie = cookie.serialize('token', token, {
    maxAge: maxAge,
    expires: new Date(Date.now() + maxAge*1000),
    secure: process.env.NODE_ENV === "production",
    path: '/'
  });
  res.setHeader("Set-Cookie", setCookie)

}

export const removeTokenCookie = ( res, token ) => {
  const val = cookie.serialize("token", token, {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", val);
};