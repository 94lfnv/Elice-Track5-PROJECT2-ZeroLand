import React, { useEffect, useContext, useState } from "react";
import ChangePassword from "./ChangePassword.jsx";
import { MyPageContext } from "../Pages/Mypage.jsx";
import * as Api from "../../utils/Api";
import Withdrawal from "./Withdrawal.jsx"

import * as MP from "../StyledComponents/MyPageStyled";



function Info() {
  const { changeMenu, setInfo, info } = useContext(MyPageContext);

  const fetchData = async () =>{
    const response = await Api.get('mypage/info');
    setInfo(response.data);
  };

  useEffect(()=>{  //무한루프 실행을 피하기 위해 useEffect를 이용. server의 값을 받아옴.
    fetchData(); // <- 위에서 작성한 fetchData 사용
  }, []);

  return (
    <>
        <MP.ProfileBox>
          <MP.ProfilePB>
          <MP.ProfilePhoto></MP.ProfilePhoto>
          <MP.ProfileBtn
            onClick={() => {
              changeMenu("changeinfo");
            }}
          >
            프로필 편집
          </MP.ProfileBtn>
          </MP.ProfilePB>
          
          <MP.ProfileIntro>

          <MP.ProfileEmail>
            {"nickname" in info ? info.nickname : "닉네임"}
            </MP.ProfileEmail>
            <MP.ProfileEmail>
            {"email" in info ? info.email : "이메일"}
            </MP.ProfileEmail>
            {/* <MP.ProfileEmail>
            {"name" in info ? info.name : "이름"}
            </MP.ProfileEmail> */}
        <MP.ProfileMyInfo>
          {"description" in info ? info.description : "소개"}
        </MP.ProfileMyInfo>
          </MP.ProfileIntro>
        </MP.ProfileBox>
      
        <MP.ReviewBox>
            <MP.ReviewSquare>

              <MP.ReviewOne onClick={() => {
              changeMenu("myfav");
            }}>{"myFavStores" in info ? info.myFavStores : 0}
              </MP.ReviewOne>

            <MP.ReviewTitle className="text-dark text-center">관심 상점</MP.ReviewTitle>

            </MP.ReviewSquare>

            <MP.ReviewSquare>
              <MP.ReviewOne x="20" y="50%" fill="white" dy=".5em" className="second-one" onClick={() => {
              changeMenu("myreview");
            }}>
                {"myReviews" in info ? info.myReviews : 0}
              </MP.ReviewOne>

            <MP.ReviewTitle className="text-dark text-center">게시글</MP.ReviewTitle>
          </MP.ReviewSquare>
        </MP.ReviewBox>

        <MP.PageFootBtnBox>
            <MP.PageFootBtn
              onClick={() => {
                changeMenu("changepassword");
              }}
            >
              비밀번호 변경
            </MP.PageFootBtn>
            <MP.PageFootBtn
              onClick={() => {
                changeMenu("withdrawal");
              }}
            >
              회원 탈퇴
            </MP.PageFootBtn>
        </MP.PageFootBtnBox>
    </>
  );
}

export default Info;
