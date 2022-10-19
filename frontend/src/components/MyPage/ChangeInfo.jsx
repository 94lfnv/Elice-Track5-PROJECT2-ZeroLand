import React, { useContext, useState } from "react";
import { MyPageContext } from "../Pages/Mypage.jsx";
import Info from "./Info.jsx";

// { name, nickname, introduction, changeMenu }
function ChangeInfo() {
  const { changeMenu, setInfo, info } = useContext(MyPageContext);
  const [changeName, setChangeName] = useState();
  const [changeNickname, setChangeNickname] = useState();
  const [changeIntroduction, setChangeIntroduction] = useState();
  const [errMsg, setErrMsg] = useState("");

  function changeimg() {}

  //* 변경완료 버튼 클릭 이벤트
  const handleClickChangeInfo = () => {
    setInfo({
      // name: changeName,
      nickname: changeNickname,
      introduction: changeIntroduction,
    });
    changeMenu("info");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentAward의 user_id를 user_id 변수에 할당함.
    const user_id = currentAward.user_id;

    if (!changeNickname) {
      setErrMsg("사용자 이름을 입력해 주세요.");
      return;
    }

    setErrMsg("");
    try {
      // "awards/수상 id" 엔드포인트로 PUT 요청함.
      await Api.put(`/user/update`, {
        changeName,
        description,
      });

      //myPage초기 화면으로 이동 해야함.
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div onSubmit={handleSubmit}>
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
          // placeholder={info.nickname}
          value={changeNickname}
          onChange={(e) => setChangeNickname(e.target.value)}
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
            onClick={handleClickChangeInfo}
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
    </div>);
}

export default ChangeInfo;
