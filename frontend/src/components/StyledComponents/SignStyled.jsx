import styled, { keyframes } from "styled-components";

// 로그인 박스 하나 만들어서 크기 조절해보자.

const boxFade = keyframes`
  0% {
    transform: translateY(30px); 
    opacity: 0; 
  }
  100% {
    transform: translateY(0px);   
    opacity: 1; 
  }
`;

export const LoginInputBox = styled.div`
    padding-top: 40px;
    background-color: #f2f2f2;
    color: #734838;
    width: 500px;
    height: 55vh;
    margin: 0 auto;
    border-radius: 35px;
    animation: ${boxFade} 1.5s ease-in-out;`

export const FormBox = styled.div`
    padding-top: 17px;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.5);
`;

export const InputBox = styled.div`
    padding-top: 40px;
    background-color: #f2f2f2;
    color: #734838;
    width: 500px;
    height: 80vh;
    margin: 0 auto;
    border-radius: 35px;
    animation: ${boxFade} 1.5s ease-in-out;
`;

export const FormTitle = styled.h3`
    color: #01402E;
    font-weight: bold;
    margin-bottom: 20px;
`;

export const InputTitle = styled.div`
    float: left;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: -0.07px;
    line-height: 15px;
    padding-left: 3%;
    padding-top: 15px;
    padding-bottom: 5px;
`

export const InputText = styled.input`
    font-size: 15px;
    &::placeholder {
        font-size: 13px;
    }
    &:hover {
        cursor: pointer;
        /* border-bottom: 2px solid #01402E; */
    }
`;

export const OutputText = styled.div`
    font-size: 11px;
    &.success {
        color: #1D735A;
    }
    &.error {
        color: #f25430;
    }
`;

export const FootBtnBox = styled.div`
    width: 100%;
    text-align: center;
    padding-top: 35px;
`

export const FootButton = styled.button`
    border-radius: 30px;
    background-color: #025f44;
    width: 180px;
    height: 45px;
    line-height: 45px;
    &:hover {
        background-color: #01402E;
    }
`;