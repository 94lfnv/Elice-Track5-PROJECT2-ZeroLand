import React, {useCallback, useState, useContext} from "react"
import * as ModalStyled from "../StyledComponents/ModalStyled";
import ConfirmWithdrawal from "./ConfirmWithdrawal"
import { MyPageContext } from "../Pages/Mypage.jsx";
import { UserStateContext } from "../../App.jsx";
import * as Api from "../../utils/Api";
import * as WD from "../StyledComponents/ChangeInfoStyled";

function Withdrawal(){

    const {changeMenu} = useContext(MyPageContext);
    const [checkPassword, setCheckPassword] = useState("")
    const {user}=useContext(UserStateContext)

    // 모달 컨펌용
    const [isAccepted, setIsAccpted] = useState(false);


    // ????
    const onChangeAccount = (e) => {
      setCheckPassword(e.target.value)
      };

      
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();


        try {
            const res = await Api.post(`user/delete`, {
                  email: user.email,
                  password: checkPassword
              });

              console.log(res.data);
    

            changeMenu("info");
            //로그 아웃된 초기 화면으로 이동 해야함.(나중에 변경)
        } catch (err) {
            console.log(err);
        }
        };
      
      // 모달 컨펌용
      const handleCheckAccept = useCallback(() => {
        setIsAccpted(true);
      }, []);

    return (
        <form onSubmit={handleSubmit}>
          <WD.ChangeInfoBox>
          <h3>회원 탈퇴</h3>
          <WD.NickConBox>
          <WD.NickCon>비밀번호</WD.NickCon>
              <input
                className="col text-dark"
                name="checkPassword"
                type="password"
                placeholder="**********"
                onChange={onChangeAccount}
              />
              <WD.NickCon>
          <ConfirmWithdrawal isAccepted={isAccepted} setIsAccpted={setIsAccpted} onCheckAccept={handleCheckAccept} />
          </WD.NickCon>

          <WD.FootBtnBox>
              <WD.FootBtn 
                onClick={() => {
                  changeMenu("info");
                }}
              >
                취소
              </WD.FootBtn>
              <WD.FootBtn className="col"
                type="submit"
                disabled={!isAccepted}
              >
                회원 탈퇴
              </WD.FootBtn>
              </WD.FootBtnBox>
              </WD.NickConBox>
          </WD.ChangeInfoBox>
        </form>
      );
    
}

export default Withdrawal