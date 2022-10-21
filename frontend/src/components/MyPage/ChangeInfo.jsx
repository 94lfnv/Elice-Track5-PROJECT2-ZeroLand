import React, { useContext, useState } from "react";
import { MyPageContext } from "../Pages/Mypage.jsx";
import Info from "./Info.jsx";
import * as Api from "../../utils/Api";
import { UserStateContext } from "../../App.jsx";
import * as CI from "../StyledComponents/ChangeInfoStyled";

// { name, nickname, introduction, changeMenu }
function ChangeInfo() {

  const {changeMenu} = useContext(MyPageContext);
  const [changeName, setChangeName] = useState();
  const [changeNickName, setChangeNickName] = useState();
  const [changeIntroduction, setChangeIntroduction] = useState();
  const {user}=useContext(UserStateContext)
  // console.log(user)
  const [errMsg, setErrMsg] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!changeNickName) {
      setErrMsg("사용자 이름을 입력해 주세요.");
      return;
    }


    setErrMsg("");
    try { 
      await Api.put(`user/updateInfo`, {
        email: user.email,
        nickname: changeNickName,  
        description: changeIntroduction
      });

      // console.log("데이터", res.data)
      console.log({nickname: changeNickName,  
        description: changeIntroduction})

      //info화면으로 이동.
      changeMenu("info");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <CI.ChangeInfoBox>
        <h3>프로필 편집</h3>
      <CI.ChangeBox>
        <CI.NickConBox>
        <CI.NickCon>사용자 이름</CI.NickCon>
        <input
          className="col"
          type="text"
          value={changeNickName}
          onChange={(e) => setChangeNickName(e.target.value)}
        />
        </CI.NickConBox>

        <CI.NickConBox>
      <CI.NickCon>소개글</CI.NickCon>
        <input
          className="col"
          type="text"
          value={changeIntroduction}
          onChange={(e) => setChangeIntroduction(e.target.value)}
        />
      </CI.NickConBox>
        <CI.NickCon className="error-msg" role={alert}>
          {errMsg}
        </CI.NickCon>


      <CI.FootBtnBox>
          <CI.FootBtn
            type="submit"
          >
            확인
          </CI.FootBtn>
          <CI.FootBtn
            onClick={() => {
                changeMenu("info");
            }}
          >
            취소
          </CI.FootBtn>
        </CI.FootBtnBox>
        </CI.ChangeBox>
      </CI.ChangeInfoBox>
    </form>
    </>
    );
}

export default ChangeInfo;
