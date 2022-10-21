import React, { useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as ResisterStyled from "../StyledComponents/SignStyled";
import Info from "./Info.jsx";
import { MyPageContext } from "../Pages/Mypage.jsx";
import { UserStateContext } from "../../App.jsx";
import * as Api from "../../utils/Api";

function ChangePassword() {
  
  const {changeMenu} = useContext(MyPageContext);
  // 비밀번호 변경 성공하면 메인페이지로 이동?
  const navigate = useNavigate();
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("")
  const [confirmPwd, setConfirmPwd] = useState("");

  const [isAccepted, setIsAccpted] = useState(false);

  const [pwdMsg, setPwdMsg] = useState("");
  const [confirmPwdMsg, setConfirmPwdMsg] = useState("");
  const {user}=useContext(UserStateContext)

  // pw, pw확인 유효성 검사
  const validatePwd = (newPwd) => {
    return newPwd
      .toLowerCase()
      .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,25}$/);
  };
  const isPwdValid = validatePwd(newPwd);
  const isConfirmPwd = newPwd === confirmPwd;
  const isAllValid = isPwdValid && isConfirmPwd;

  // New 비밀번호 유효성 검사
  const onChangePwd = useCallback((e) => {
    const currNewPwd = e.target.value;
    setNewPwd(currNewPwd);

    if (!validatePwd(currNewPwd)) {
      setPwdMsg("영문, 숫자, 특수기호 조합으로 10자리 이상 입력해주세요.");
    } else {
      setPwdMsg("안전한 비밀번호입니다.");
    }
  }, []);

  // confirm 비밀번호 확인
  const onChangeConfirmPwd = useCallback(
    (e) => {
      const currConfirmPwd = e.target.value;
      setConfirmPwd(currConfirmPwd);

      if (currConfirmPwd !== newPwd) {
        setConfirmPwdMsg("비밀번호가 일치하지 않습니다.");
      } else {
        setConfirmPwdMsg("올바른 비밀번호입니다.");
      }
    },
    [newPwd] //이거 뭐지
  );

  // 여기까지 유효성 검사

  // 여기서 부터 put

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await Api.put(`user/updatePW`, {
        email: user.email,
        current_password: currentPwd ,
        new_password: newPwd,
      });
      console.log("성공?")
      // console.log({currentPwd, newPwd})
      
      changeMenu("info");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container my-5 pe-5">
        <div className="row">
          <p className="col text-secondary">이전 비밀번호</p>
          <input
            className="col text-dark"
            name="currentPwd"
            type="password"
            placeholder="**********"
          />
        </div>
      </div>
      <div className="container my-5 pe-5">
        <div className="row">
          <p className="col text-secondary">새 비밀번호</p>
          <input
            className="col text-dark"
            name="newPwd"
            type="password"
            placeholder="**********"
            onChange={onChangePwd}
          />
          <p
            className={
              isPwdValid ? "success text-secondary" : "error text-secondary"
            }
          >
            {pwdMsg}
          </p>
        </div>
      </div>
      <div className="container my-5 pe-5">
        <div className="row">
          <p className="col text-secondary">새 비밀번호 확인</p>
          <input
            className="col text-dark"
            name="confirmPwd"
            type="password"
            placeholder="**********"
            onChange={onChangeConfirmPwd}
          />
          <p
            className={
              isConfirmPwd ? "success text-secondary" : "error text-secondary"
            }
          >
            {confirmPwdMsg}
          </p>
        </div>
      </div>
      <div>
        <div>
          {/* <button onClick={()=>{changeMenu(<Info changeMenu={changeMenu} />)}}>취소</button> */}
          <button
            onClick={() => {
              changeMenu("info");
            }}
          >
            취소
          </button>
          <button
            variant="primary"
            type="submit"
            disabled={!isAllValid}
          >
            변경하기
          </button>
        </div>
      </div>
    </form>
  );
}

export default ChangePassword;
