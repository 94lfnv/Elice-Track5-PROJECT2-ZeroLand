import React, {useCallback, useState, useContext} from "react"
import * as ModalStyled from "../StyledComponents/ModalStyled";
import ConfirmWithdrawal from "./ConfirmWithdrawal"
import { MyPageContext } from "../Pages/Mypage.jsx";
import { UserStateContext } from "../../App.jsx";
import * as Api from "../../utils/Api";

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
    
    // 회원 탈퇴 delete
    // const handleCheckAccept = useCallback(() => {
    //   setIsAccpted(true);
    // }, []);

      
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // if (!checkPassword) {
        //     setErrMsg("패스워드를 입력해 주세요.");
        //     return;
        //   }
    
        // if (!) {
        //     setErrMsg("약관을 확인해 주세요.");
        //     return;
        //   }

        try {
            
          console.log({email: user.email,
            password: checkPassword})

            await Api.post(`user/delete`, {
                email: user.email,
                password: checkPassword
            });
    

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
          <div className="container my-5 pe-5">
            <div className="row">
              <p className="col text-secondary">비밀번호</p>
              <input
                className="col text-dark"
                name="checkPassword"
                type="password"
                placeholder="**********"
                onChange={onChangeAccount}
              />
            </div>
          </div>
          <ConfirmWithdrawal isAccepted={isAccepted} setIsAccpted={setIsAccpted} onCheckAccept={handleCheckAccept} />
          <br />
          <div className="row">
            <div>
              <button className="col"
                onClick={() => {
                  changeMenu("info");
                }}
              >
                취소
              </button>
              <button className="col"
                type="submit"
                disabled={!isAccepted}
              >
                회원 탈퇴
              </button>
            </div>
          </div>
        </form>
      );
    
}

export default Withdrawal