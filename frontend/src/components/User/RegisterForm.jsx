import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as ResisterStyled from "../StyledComponents/SignStyled";
import NaverLogin from "./NaverLogin";
import { KaKaoButton } from "./KakaoLogin";
import CheckModal from "./CheckModal";
import * as api from "../../utils/Api";

// 중복 이메일 찾아야 하고 
// 인증 메일 보내야 함. 링크 보내서 누르면 true 되고 -> 인증되게끔

function RegisterForm () {
  //로그인 성공하면 내비게이트로 메인페이지 보내기
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [nickname, setNickname] = useState("");

  const [isAccepted, setIsAccpted] = useState(false);
  

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

  const validatePwd = (password) => {
    return password
      .toLowerCase()
      .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,25}$/);
  }

  const validateNickname = (nickname) => {
    return nickname
      .toLowerCase()
      .match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,8}$/)
  }

  const isEmailValid = validateEmail(email);
  const isPwdValid = validatePwd(password);
  const isConfirmPwd = password === confirmPwd;
  const isNicknameValid = validateNickname(nickname);

  const isAllValid = isEmailValid && isPwdValid && isConfirmPwd && isNicknameValid && isAccepted;


  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("user/register", {
        email, password, nickname,
      });
      navigate("/login");
    } catch (err) {
      setEmailMsg("이미 등록된 메일입니다.");
      // const res = api.get("userlist");
      // console.log(res.user_id);
      //if/else if 문 넣어서 이거면 이거 넣어주고 저거면 저거 넣어주고 이런 식으로 되나? 
      //const 데이터 이름 = 받아올 데이터 
      // 받아온 데이터랑 이메일/닉네임 같아? ㅇㅇ 그럼 ㄴㄴ 이런 식... 
    }
  };

  //이메일 
  const onChangeEmail = useCallback( async (e) => {
    const currEmail = e.target.value;
    setEmail(currEmail);

    if (!validateEmail(currEmail)) {
      setEmailMsg("이메일 형식이 올바르지 않습니다.")
    } else {
        setEmailMsg("올바른 이메일입니다.")
      }
    })

    //비밀번호
    const onChangePwd = useCallback((e) =>{
      const currPwd = e.target.value;
      setPassword(currPwd);

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

      if (currConfirmPwd !== password) {
        setConfirmPwdMsg("비밀번호가 일치하지 않습니다.")
      } else {
        setConfirmPwdMsg("올바른 비밀번호입니다.")
      }
    }, [password])

    //닉네임
    //이것도 중복이면 안 됨.
    const onChangeNickname = useCallback((e) => {
      const currNickname = e.target.value;
      setNickname(currNickname);

      if (!validateNickname(currNickname)) {
        setNicknameMsg("1글자 이상 9글자 미만으로 입력해주세요.")
      } else {
        setNicknameMsg("올바른 닉네임입니다.")
      }
    }, []);

    const handleCheckAccept = useCallback(() => {
      setIsAccpted(true);
    }, []);


  return (
    <ResisterStyled.FormBox>
        <ResisterStyled.InputBox>
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

                <CheckModal isAccepted={isAccepted} setIsAccpted={setIsAccpted} onCheckAccept={handleCheckAccept} />

        <ResisterStyled.FootBtnBox>
          <ResisterStyled.FootButton onClick={onSubmit} type="submit" disabled={!isAllValid}>
        가입하기
          </ResisterStyled.FootButton>
        </ResisterStyled.FootBtnBox>

        <ResisterStyled.LogoBox>
          <NaverLogin /> 
          <KaKaoButton />
        </ResisterStyled.LogoBox>

        </ResisterStyled.InputBox>
    </ResisterStyled.FormBox>
  );
}

export default RegisterForm;