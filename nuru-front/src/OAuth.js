const rest_api_key = "c38ee04e16631dabbb8e43a1ed540d05"
const redirect_URI = "https://localhost:3000/oauth/callback/kakao-login"


export const kakao_login_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_URI}&response_type=code`