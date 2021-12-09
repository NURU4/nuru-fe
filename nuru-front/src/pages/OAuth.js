const rest_api_key = "c38ee04e16631dabbb8e43a1ed540d05"
const redirect_URI = "https://nuru.kr/oauth/callback/kakao-login"

const appKey = "c38ee04e16631dabbb8e43a1ed540d05";
const protocol = window.location.protocol;
const host = window.location.host;
const redirectURI = "/oauth/callback/kakao-login";


export const authURL = `https://kauth.kakao.com/oauth/authorize?client_id=${appKey}&redirect_uri=${protocol}//${host}${redirectURI}&response_type=code`;
