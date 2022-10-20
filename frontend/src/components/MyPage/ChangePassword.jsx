import React, { useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as ResisterStyled from "../StyledComponents/SignStyled";
import Info from "./Info.jsx";
import { MyPageContext } from "../Pages/Mypage.jsx";

function ChangePassword() {
  
  const {changeMenu} = useContext(MyPageContext);
  // 비밀번호 변경 성공하면 메인페이지로 이동?
  const navigate = useNavigate();
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [isAccepted, setIsAccpted] = useState(false);

  const [pwdMsg, setPwdMsg] = useState("");
  const [confirmPwdMsg, setConfirmPwdMsg] = useState("");

  // pw, pw확인 유효성 검사
  const validatePwd = (pwd) => {
    return pwd
      .toLowerCase()
      .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,25}$/);
  };
  const isPwdValid = validatePwd(pwd);
  const isConfirmPwd = pwd === confirmPwd;
  const isAllValid = isPwdValid && isConfirmPwd;

  // 비밀번호
  const onChangePwd = useCallback((e) => {
    const currPwd = e.target.value;
    setPwd(currPwd);

    if (!validatePwd(currPwd)) {
      setPwdMsg("영문, 숫자, 특수기호 조합으로 10자리 이상 입력해주세요.");
    } else {
      setPwdMsg("안전한 비밀번호입니다.");
    }
  }, []);

  // 비밀번호 확인
  const onChangeConfirmPwd = useCallback(
    (e) => {
      const currConfirmPwd = e.target.value;
      setConfirmPwd(currConfirmPwd);

      if (currConfirmPwd !== pwd) {
        setConfirmPwdMsg("비밀번호가 일치하지 않습니다.");
      } else {
        setConfirmPwdMsg("올바른 비밀번호입니다.");
      }
    },
    [pwd]
  );

  const handleCheckAccept = useCallback(() => {
    setIsAccpted(true);
  }, []);

  // 여기까지 유효성 검사

  // 여기서 부터 put

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setErrMsg("");
    try {
      // "awards/수상 id" 엔드포인트로 PUT 요청함.
      await Api.put(`/user/updatePW`, {
        current_password:pwd,
        new_password:confirmPwd,
      });
      changeMenu("info");
      //myPage초기 화면으로 이동 해야함.
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div onSubmit={handleSubmit}>
      <div className="container my-5 pe-5">
        <div className="row">
          <p className="col text-secondary">이전 비밀번호</p>
          <input
            className="col text-dark"
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
            name="password"
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
            name="confirmPassword"
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
            type="submit"
            disabled={!isAllValid}
            onClick={() => {
              changeMenu("info");
            }}
          >
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
