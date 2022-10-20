import React, { useContext, useState } from "react";
import { MyPageContext } from "../Pages/Mypage.jsx";
import Info from "./Info.jsx";
import * as Api from "../../utils/Api";
import { UserStateContext } from "../../App.jsx";

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
    <form onSubmit={handleSubmit}>
      <div className="row">
        {/* <img className="col" onClick={changeimg}></img> */}
        <h4 className="col text-dark">
          프로필 편집
        </h4>
      </div>
      {/* <div className="row">
        <h4 className="col text-dark">이름</h4>
        <input
          className="col"
          type="text"
          placeholder={info.name}
          value={changeName}
          onChange={(e) => setChangeName(e.target.value)}
        />
      </div> */}
      <div className="row">
        <h4 className="col text-dark">사용자 이름</h4>
        <input
          className="col"
          type="text"
          // placeholder={info.nickName}
          value={changeNickName}
          onChange={(e) => setChangeNickName(e.target.value)}
        />
      </div>
      <div className="row">
        <h4 className="col text-dark">소개</h4>
        <input
          className="col"
          type="text"
          // placeholder={info.introduction}
          value={changeIntroduction}
          onChange={(e) => setChangeIntroduction(e.target.value)}
        />
      </div>
      <div className="col">
        <div className="alert alert-info text-dark" role="alert">
          {errMsg}
        </div>
      </div>
      <div className="row">
        <div>
          <button
            variant="primary"
            // onClick={handleClickChangeInfo}
            type="submit"
            className="me-3"
          >
            확인
          </button>
          <button
            variant="secondary"
            onClick={() => {
                changeMenu("info");
            }}
          >
            취소
          </button>
        </div>
      </div>
    </form>);
}

export default ChangeInfo;
