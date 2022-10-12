import React from "react";
import { useDispatch } from "react-redux";
import { KAKAO_AUTH_URL } from "./OAuth";

//프론트는 카카오로부터 인가 코드를 받고 백엔드로 넘겨주는 역할 + 리다이렉팅까지.
//백은 프론트한테 인가 코드 받고 카카오한테 토큰을 발급 받음. 여기에 담긴 유저 정보를 프로젝트 전용 토큰으로 새로 발급해서 프론트한테 줌.

export function KakaoLogin () {
    const dispatch = useDispatch();

    // window.location.href를 쓰면 현재 주소창으로 주소값을 불러올 수 있다.
    // 인가 코드
    const href = window.location.href;
    let code = new URL(href).searchParams.get("code");

    React.useEffect(async () => {
        // await dispatch(userActions.kakaoLogin(code));
    }, []);

    //api 파일에 kakaoLogin = (code) => api.get(`리다이렉트 되는 주소/?code=${code}`, {}) 이런 식으로 백엔드에 인가 코드를 쿼리 스트링으로 보내줘야 함.
    //userActions 부분은 좀 더 공부를 해야 할 듯...

    return (
        <div>잠시만 기다려주세요. 로그인 중입니다.</div>
    )
}

export const KaKaoButton = () => {
    return (
        <div>
            <a href={KAKAO_AUTH_URL}>
                <img className="kakaologo" src="img/kakaotalk_sharing_btn_small.png" />
            </a>
        </div>
    )
}