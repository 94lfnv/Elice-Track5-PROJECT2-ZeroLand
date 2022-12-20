const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY
const REDIRECT_URL = import.meta.env.VITE_KAKAO_REDIRECT_URL

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;


export const KaKaoButton = () => {
    return (
        <div>
            <a href={KAKAO_AUTH_URL}>
                <img className="kakaologo" src="/img/kakao_login_medium_wide.png" />
            </a>
        </div>
    )
};
