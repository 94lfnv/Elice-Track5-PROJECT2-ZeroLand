import React, {useState, useContext} from "react"
import * as ModalStyled from "../StyledComponents/ModalStyled";
import ConfirmWithdrawal from "./ConfirmWithdrawal"
import { MyPageContext } from "../Pages/Mypage.jsx";
import { UserStateContext } from "../../App.jsx";

function Withdrawal(){

    const {changeMenu} = useContext(MyPageContext);
    const [isAccepted, setIsAccpted] = useState(false);
    const [checkPassword, setCheckPassword] = useState("")
    const {user}=useContext(UserStateContext)


    const onChangeAccount = (e) => {
        setAccount({
          ...account,
          [e.target.name]: e.target.value,
        });
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

        setErrMsg("");
        try {
            // "awards/수상 id" 엔드포인트로 PUT 요청함.
            const res = await Api.delete(`user/delete`, {
                email: user.email,
                password: checkPassword
            });
            console.log({email: user.email,
                password: checkPassword})

            changeMenu("info");
            //로그 아웃된 초기 화면으로 이동 해야함.(나중에 변경)
        } catch (err) {
            console.log(err);
        }
        };



    return (
        <div onSubmit={handleSubmit}>
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
          <ConfirmWithdrawal isAccepted={isAccepted} setIsAccpted={setIsAccpted} />
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

export default Withdrawal