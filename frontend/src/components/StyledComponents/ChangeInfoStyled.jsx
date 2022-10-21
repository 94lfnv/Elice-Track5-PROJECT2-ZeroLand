import styled from "styled-components"

export const ChangeInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 47vw;
    height: 69vh;
    border: 1px solid #01402E;
    max-width: 635px;
    border-radius: 30px;
    align-items: center;
    color: #01402E;

    h3 {
        font-size: 21px;
        margin-top: 30px;
        color: #01402E;
    }
`

export const ChangeBox = styled.div`
    width: 470px;
    height: 45vh;
    padding: 30px 0px;
    margin-top: 10px;
`

export const NickConBox = styled.div`
    color: #01402E;
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    margin: 10px 0;
`

export const PwConBox = styled.div`
    color: #01402E;
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    margin: 10px 0;
`

export const NickCon = styled.div`
    font-weight: 600;
    color: #01402E;
    font-size: 16px;
    padding-left: 20px;

    &.error-msg {
        width: 100%;
        height: 30px;
        margin-top: 10px;
    }
`

export const ErrPlace = styled.div`
    width: 100%;
    height: 30px;
    margin-left: 15px;
`

export const FootBtnBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 60px;
    margin-top: 25px;
    justify-content: center;
`

export const FootBtn = styled.button`
    border: 1px solid #01402E;
    width: 110px;
    height: 35px;
    border-radius: 20px;
    background-color: #e7e8db;
    margin: 5px;
`