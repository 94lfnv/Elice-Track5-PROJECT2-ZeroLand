const REST_API_KEY = "d9529b253572187d29aceb87ea268f40";
const REDIRECT_URI = "http://127.0.0.1:5173";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;