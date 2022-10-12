import styled from "styled-components";

export const ModalButton = styled.div`
        width: 70px;
        height: 20px;
        float: left;
        margin-top: 10px;
        margin-left: 2.5%;
        cursor: pointer;
        font-size: 13px;
        line-height: 18px;

    span.no {
        color: #f25430;
        border-bottom: 2px solid #f25430;
    }
    span.yes {
        color: #1D735A;
        border-bottom: 2px solid #1D735A;
    }
`;

export const ModalForm = styled.div`
    width: 450px;
    height: 430px;
    background-color: #f2f2f2;
    border: 2px solid #01402E;
    font-size: 15px;

    /* 모달창 중앙, 맨 앞 위치 */
    z-index: 999;
    position: absolute;
    top: 43%;
    left: 50%;
    transform: translate(-50%, -50%);

    h1 {
        font-size: 18px;
        color: #734838;
        padding: 20px;
        font-weight: bolder;
        border-bottom: 1px dotted #01402E;
    }

    p {
        padding: 15px 20px;
        font-size: 14px;
        text-align: left;
        word-spacing: -3px;
    }

    button {
        border: 1px solid #01402E;
        color: #01402E;
        width: 120px;
        height: 35px;
        font-size: 15px;
    }
`;