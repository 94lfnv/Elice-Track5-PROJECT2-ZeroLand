import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as ResisterStyled from "../StyledComponents/SignStyled";

// 중복 이메일 찾아야 하고 
// 약관 동의 체크 박스나 모달로 말해야 하고
// 체크 박스는 맨 마지막에 allvalid면 나오는 걸로 (칸이 작아서)
// 인증 메일 보내야 함. (버튼을 다음으로 바꾸고 인증메일 쓰라는 모달을 띄우면 어떨까?)

function RegisterForm () {
  //로그인 성공하면 내비게이트로 메인페이지 보내기
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [nickname, setNickname] = useState("");

  //각 항목 조건이 맞지 않을 때 띄우는 메시지 
  const [emailMsg, setEmailMsg] = useState("");
  const [pwdMsg, setPwdMsg] = useState('');
  const [confirmPwdMsg, setConfirmPwdMsg]= useState("")
  const [nicknameMsg, setNicknameMsg] = useState("")

  // 이메일, 비밀번호, 닉네임 유효성 검사 
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
  };

  const validatePwd = (pwd) => {
    return pwd
      .toLowerCase()
      .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,25}$/);
  }

  const validateNickname = (nickname) => {
    return nickname
      .toLowerCase()
      .match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,8}$/)
  }

  const isEmailValid = validateEmail(email);
  const isPwdValid = validatePwd(pwd);
  const isConfirmPwd = pwd === confirmPwd;
  const isNicknameValid = validateNickname(nickname);

  const isAllValid = isEmailValid && isPwdValid && isConfirmPwd && isNicknameValid;

  const onSubmit = async (e) => {
    e.stopPropagaion();
    e.preventDefault();
    console.log("로그인 됐어? 됐다!")
    //navigate("/login")
  }

  //이메일 
  // 중복 메일이면 그것도 넣어줘야 함... 어떻게 넣어야 할까? userService 부분 보기.
  const onChangeEmail = useCallback((e) => {
    const currEmail = e.target.value;
    setEmail(currEmail);

    if (!validateEmail(currEmail)) {
      setEmailMsg("이메일 형식이 올바르지 않습니다.")} else {
        setEmailMsg("올바른 이메일입니다.")
      }
    })

    //비밀번호
    const onChangePwd = useCallback((e) =>{
      const currPwd = e.target.value;
      setPwd(currPwd);

      if (!validatePwd(currPwd)) {
        setPwdMsg("영문, 숫자, 특수기호 조합으로 10자리 이상 입력해주세요.")
      } else {
        setPwdMsg("안전한 비밀번호입니다.")
      }
    }, [])

    //비밀번호 확인
    const onChangeConfirmPwd = useCallback((e) => {
      const currConfirmPwd = e.target.value;
      setConfirmPwd(currConfirmPwd);

      if (currConfirmPwd !== pwd) {
        setConfirmPwdMsg("비밀번호가 일치하지 않습니다.")
      } else {
        setConfirmPwdMsg("올바른 비밀번호입니다.")
      }
    }, [pwd])

    //닉네임
    const onChangeNickname = useCallback((e) => {
      const currNickname = e.target.value;
      setNickname(currNickname);

      if (!validateNickname(currNickname)) {
        setNicknameMsg("1글자 이상 9글자 미만으로 입력해주세요.")
      } else {
        setNicknameMsg("올바른 닉네임입니다.")
      }
    }, [])

  return (
    <ResisterStyled.FormBox>
        <ResisterStyled.InputBox onSubmit={onSubmit}>
        <ResisterStyled.FormTitle>회원가입</ResisterStyled.FormTitle>
        <ResisterStyled.InputTitle>이메일 주소 *</ResisterStyled.InputTitle>
            <ResisterStyled.InputText 
                name="email"
                type="text"
                placeholder="ex) zeroland@zeroland.com"
                onChange={onChangeEmail}/>
                <ResisterStyled.OutputText className={isEmailValid ? 'success' : 'error'}>{emailMsg}</ResisterStyled.OutputText>
        <ResisterStyled.InputTitle>비밀번호 *</ResisterStyled.InputTitle>
            <ResisterStyled.InputText 
                name="password"
                type="password"
                placeholder="**********"
                onChange={onChangePwd}/>
                <ResisterStyled.OutputText className={isPwdValid ? 'success' : 'error'}>{pwdMsg}</ResisterStyled.OutputText>
        <ResisterStyled.InputTitle>비밀번호 확인 *</ResisterStyled.InputTitle>
            <ResisterStyled.InputText 
                name="confirmPassword"
                type="password"
                placeholder="**********"
                onChange={onChangeConfirmPwd}/>
                <ResisterStyled.OutputText className={isConfirmPwd ? 'success' : 'error'}>{confirmPwdMsg}</ResisterStyled.OutputText>
        <ResisterStyled.InputTitle>닉네임 *</ResisterStyled.InputTitle>
            <ResisterStyled.InputText 
                name="nickname"
                type="text"
                placeholder="제로랜드"
                onChange={onChangeNickname}/>
                <ResisterStyled.OutputText className={isNicknameValid ? 'success' : 'error'}>{nicknameMsg}</ResisterStyled.OutputText> 
        <ResisterStyled.FootBtnBox>
          <ResisterStyled.FootButton type="submit" disabled={!isAllValid}>
        가입하기
          </ResisterStyled.FootButton>
        </ResisterStyled.FootBtnBox>
        </ResisterStyled.InputBox>
    </ResisterStyled.FormBox>
  );
}

export default RegisterForm;