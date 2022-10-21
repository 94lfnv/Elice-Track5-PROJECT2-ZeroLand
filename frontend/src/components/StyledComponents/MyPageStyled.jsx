import styled, { keyframes }  from "styled-components";

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

export const PageFormBox = styled.div`
    display: flex;
    padding-top: 40px;
    width: 100%;
    height: 85vh;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
`;

export const PageContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    justify-content: center;
    width: 62vw;
    height: 70vh;
    background-color: #dbdccb;
    border-radius: 35px;
    max-width: 900px;
    animation: ${boxFade} 1.5s ease-in-out;
`

export const Menubox = styled.div`
    display: flex;
    flex-direction: column;
    width: 15vw;
    height: 69vh;
    align-items: center;
    padding: 0 5px;
`

export const Menus = styled.div`
    display: flex;
    border: 1px solid #01402E;
    border-radius: 10px;
    width: 100%;
    height: 60px;
    color: #01402E;
    font-size: 20px;
    justify-content: center;
    line-height: 60px;
    letter-spacing: 3px;
    margin: 5px;
    cursor: pointer;

    &:first-child {
        cursor: default;
        margin-top: 10px;
        border: none;
        font-size: 23px;
        font-weight: bolder;
        border-bottom: 3px solid #01402E;
    }
`

export const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 47vw;
    height: 69vh;
    border: 1px solid #01402E;
    max-width: 635px;
    border-radius: 30px;
`

export const ProfileBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    width: 100%;
    height: 190px;
    flex-wrap: wrap;
`

export const ProfilePB = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ProfilePhoto = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #01402E;
    margin-top: 25px;
    margin-right: 10px;
    background-color: #e7e8db;
`

export const ProfileIntro = styled.div`
    padding-top: 50px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 180px;
`

export const ProfileBtn = styled.div`
    border: 1px solid #01402E;
    width: 120px;
    height: 30px;
    color: #01402E;
    text-align: center;
    margin-top: 21px;
    cursor: pointer;
    background-color: #BFBEAB;
    font-size: 14px;
`

export const ProfileEmail = styled.div`
    width: 300px;
    height: 30px;
    color: #01402E;
    font-weight: bolder;
`

export const ProfileMyInfo = styled.div`
    width: 250px;
    height: 30px;
    border-bottom: 1px solid #01402E;
    color: #01402E;
    margin-top: 25px;
    margin-bottom: 10px;
    background-color: #e7e8db;
    padding-left: 5px;
`

export const ReviewBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    height: 190px;
    flex-wrap: wrap;
    margin-top: 30px;
    color: #01402E;
    border: 1px solid #01402E;
    background-color: #e7e8db;
`

export const ReviewSquare = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-content: space-evenly;
`

export const ReviewOne = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #01402E;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    justify-content: space-evenly;
    text-align: center;
    cursor: pointer;
    font-size: 20px;
    color: #01402E;
    background-color: #7fbfad;
    margin-top: 20px;
    
    &.second-one {
        background-color: #d0ceb8;
    }
`

export const ReviewTitle = styled.div`
    width: 130px;
    height: 30px;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    color: #01402E;
`

export const PageFootBtnBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 250px;
    height: 60px;
    margin-top: 140px;
    padding-left: 10px;
`

export const PageFootBtn = styled.button`
    border: 1px solid #01402E;
    width: 110px;
    height: 35px;
    border-radius: 20px;
    background-color: #e7e8db;
`
