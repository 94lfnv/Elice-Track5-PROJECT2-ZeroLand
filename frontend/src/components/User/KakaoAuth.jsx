import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../utils/Api";
import { DispatchContext, UserStateContext } from "../../App";


const KakaoAuth = () => {
    const navigate = useNavigate();
    const dispatch = useContext(DispatchContext);
    const [code, setCode] = useState("");

    const kakaoLogin = async (_code) => {
            if (!_code) return;
            const res = await Api.post("kakaoOauth", {code: _code});
            
            const kakaoUser = res.data;
            const kakaoToken = kakaoUser.token;

            sessionStorage.setItem("userToken", kakaoToken);

            dispatch({
                type: "LOGIN",
                payload: kakaoUser,
            })
            navigate("/");
        };
        // 인가 코드
        const getSourceCode = () => {
            const params = new URL(window.location.href).searchParams;
            const _code = params.get("code");
            if (!code) {
                kakaoLogin(_code);
            }
            setCode(_code);
        }
      
        useEffect(()=> {
          getSourceCode();
        }, [])


    return (
        <div>로그인 중입니다. 잠시만 기다려주세요.</div>
    )
}

export default KakaoAuth;
