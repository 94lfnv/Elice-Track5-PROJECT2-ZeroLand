import styled from "styled-components";

export const FavCardBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 47vw;
    height: 69vh;
    border: 1px solid #01402E;
    max-width: 635px;
    border-radius: 30px;
    align-items: center;
    color: #01402E;

    h2 {
        margin-top: 10px;
        color: #01402E;
    }
`

export const CardBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 25vw;
    height: 15vh;
    min-width: 430px;
    max-width: 450px;
    border: 1px solid #01261F;
    margin-bottom: 5px;
    background-color: #f4f5ea;
    color: #01261F;
`

export const InnerBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: relative;
`

export const StoreName = styled.div`
    text-align: center;
    padding-top: 12px;
    margin-left: 10px;
    font-size: 17px;
    width: 410px;
    height: 40px;
    border-bottom: 1px solid #01261F;
    font-weight: border;
`

export const StarBox = styled.div`
    width: 150px;
    height: 30px;
    padding-top: 15px;
    // 좋아요 밑으로 떨어지게 하려고 넣은 값. 조절해주세요.
    margin-right: 70px;
`

export const LikeIcon = styled.div`
    width: 25px;
    height: 25px;
    margin-left: 15px;
`

export const StoreAdress = styled.div`
    margin-left: 10px;
    width: 410px;
    height: 30px;
    font-size: 14px;
    padding-left: 2px;
    border-bottom: 1px solid #01261F;
`

export const StoreInfoBox = styled.div`
    margin: 0px 10px;
    padding-left: 5px;
    font-size: 15px;
`