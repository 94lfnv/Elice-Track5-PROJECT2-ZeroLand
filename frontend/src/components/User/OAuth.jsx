
const REDIRECT_URI = "http://127.0.0.1:5173";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=process.env.VITE_REST_API_KEY&redirect_uri=${REDIRECT_URI}&response_type=code`;