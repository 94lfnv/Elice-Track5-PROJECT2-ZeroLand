import styled from "styled-components";


export const CardBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 20vw;
    height: 20vh;
    min-width: 430px;
    max-width: 450px;
    border: 1px solid #01261F;
    margin-bottom: 10px;
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
    margin-left: 8px;
`

export const LikeIcon = styled.div`
    display: flex;
    justify-content: right;
    width: 120px;
    height: 25px;

    &.like {
        margin-top: 25px;
        margin-left: 145px;
    }
`

export const StoreAdress = styled.div`
    margin-left: 10px;
    width: 410px;
    height: 30px;
    font-size: 14px;
    padding-left: 2px;
    border-bottom: 1px solid #01261F;
    padding-top: 5px;
`

export const StoreInfoBox = styled.div`
    margin: 0px 8px;
    padding-left: 5px;
    font-size: 15px;
`