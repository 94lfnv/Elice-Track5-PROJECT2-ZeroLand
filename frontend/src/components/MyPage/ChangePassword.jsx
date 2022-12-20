import React, { useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as ResisterStyled from "../StyledComponents/SignStyled";
import Info from "./Info.jsx";
import { MyPageContext } from "../Pages/Mypage.jsx";
import { UserStateContext } from "../../App.jsx";
import * as Api from "../../utils/Api";
import * as CP from "../StyledComponents/ChangeInfoStyled";


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
    [newPwd]
  );

  // 여기까지 유효성 검사

  // 여기서 부터 put

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // "awards/수상 id" 엔드포인트로 PUT 요청함.
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
      <CP.ChangeInfoBox>
      <h3>비밀번호 변경</h3>
        <CP.ChangeBox>
        <CP.PwConBox>
        <CP.NickCon>이전 비밀번호</CP.NickCon>
          <input
            className="col text-dark"
            name="currentPwd"
            type="password"
            placeholder="**********"
          />
        </CP.PwConBox>

      <CP.PwConBox>
      <CP.NickCon>새 비밀번호</CP.NickCon>
          <input
            className="col text-dark"
            name="newPwd"
            type="password"
            placeholder="**********"
            onChange={onChangePwd}
          />
        </CP.PwConBox>
        <CP.ErrPlace
            className={
              isPwdValid ? "success text-secondary" : "error text-secondary"
            }
          >
            {pwdMsg}
        </CP.ErrPlace>

        <CP.PwConBox>
      <CP.NickCon>새 비밀번호 확인</CP.NickCon>
          <input
            className="col text-dark"
            name="confirmPwd"
            type="password"
            placeholder="**********"
            onChange={onChangeConfirmPwd}
          />
          </CP.PwConBox>
          <CP.NickCon
            className={
              isConfirmPwd ? "success text-secondary" : "error text-secondary"
            }
          >
            {confirmPwdMsg}
          </CP.NickCon>

        <CP.FootBtnBox>
          <CP.FootBtn
            onClick={() => {
              changeMenu("info");
            }}
          >
            취소
          </CP.FootBtn>
          <CP.FootBtn
            type="submit"
            disabled={!isAllValid}
          >
            변경하기
          </CP.FootBtn>
          </CP.FootBtnBox>
        </CP.ChangeBox>
      </CP.ChangeInfoBox>
    </form>
  );
}

export default ChangePassword;
