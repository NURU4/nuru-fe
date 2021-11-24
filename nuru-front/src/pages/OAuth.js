
const appKey = "c38ee04e16631dabbb8e43a1ed540d05";
const redirectURI = "http://localhost:3000/oauth/callback/kakao-login";


export const authURL = `https://kauth.kakao.com/oauth/authorize?client_id=${appKey}&redirect_uri=${redirectURI}&response_type=code`;