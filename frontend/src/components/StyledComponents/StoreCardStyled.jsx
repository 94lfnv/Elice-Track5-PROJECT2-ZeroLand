import styled from "styled-components";

export const CardBox = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    width: 30vw;
    height: 18vh;
    min-width: 430px;
    max-width: 450px;
    border: 1px solid #40282C;
    margin-bottom: 5px;
    background-color: whitesmoke;
    color: #523338;
`

export const InnerBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    /* position: relative; */
`

export const StoreName = styled.div`
    text-align: center;
    padding-top: 5px;
    margin-left: 10px;
    font-size: 17px;
    width: 180px;
    height: 30px;
    border-bottom: 1px solid #40282C;
    font-weight: border;
`

export const StarBox = styled.div`
    width: 150px;
    height: 30px;
    padding-top: 10px;
    // 좋아요 밑으로 떨어지게 하려고 넣은 값. 조절해주세요.
    margin-right: 70px;
`
export const LikeIcon = styled.div`
    width: 25px;
    height: 25px;
    margin-left: 15px;
`

export const StoreAdress = styled.div`
    width: 365px;
    height: 25px;
    font-size: 14px;
    padding-left: 2px;
    border-bottom: 1px solid #40282C;
`

export const StoreInfoBox = styled.div`
    /* border: 1px solid #A0BCC2; */
    margin: 0px 10px;
    padding-left: 5px;
    font-size: 15px;
`