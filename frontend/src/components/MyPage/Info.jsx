import React, {useState} from "react"
import ChangePassword from "./ChangePassword.jsx"
import ChangeInfo from "./ChangeInfo.jsx"


function Info({changeMenu}) {

  const [info, setInfo] = useState(
    {
      name:"이름",
      nickname:"사용자 이름",
      url:"rabbilt@elice.com",
      phone:"010-1010-2020",
      introduction:"소개",
      close_time:"오후 10시",
      reviews:"리뷰",
      star_avg:4.8
    }
  );

  // const fetchData = async () =>{  
  //   const response = await axios.get('/user');
  //   setInfo(response.data);
  // };

  // useEffect(()=>{  //무한루프 실행을 피하기 위해 useEffect를 이용. server의 값을 받아옴.
  //   fetchData(); // <- 위에서 작성한 fetchData 사용
  // }, []); 

  return(      
      <>
      <div className="col-lg-4 text-dark">
        <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>

        <div className="row">
          <h2 className="col text-dark">{info.nickname}</h2>
          <button className="col btn btn-secondary" onClick={()=>{changeMenu(<ChangeInfo 
            name={info.name}
            nickname={info.nickname}
            introduction={info.introduction}
            changeMenu={info.changeMenu}
          />)}}>프로필 편집</button>
        </div>
        
        <p>{info.email}</p>
        <h4>{info.name}</h4>
        <p>{info.introduction}</p>
      </div>
        <hr className="ms-3 me-5" style={{backgroundColor: "gray"}} />
  {/* -------------------------------------------------- */}
      <div className="container marketing text-dark">
        <div className="row">
          <div className="col-4">
            <svg className="bd-placeholder-img rounded-circle" width="110" height="110" role="img" focusable="false">
              <rect width="100%" height="100%" fill="#777"/>
              <text x="20" y="50%" fill="white" dy=".5em">myFavNum</text>
            </svg>
            <h2 className="text-dark text-center">관심 상점</h2>
          </div>
          <div className="col-4">
            <svg className="bd-placeholder-img rounded-circle" width="110" height="110" role="img" focusable="false">
              <rect width="100%" height="100%" fill="#777"/>
              <text x="20" y="50%" fill="white" dy=".5em">myReviewNum</text>
            </svg>
            <h2 className="text-dark text-center">게시글</h2>
          </div>
          <div className="col-4">
            <svg className="bd-placeholder-img rounded-circle" width="110" height="110" role="img" focusable="false">
              <rect width="100%" height="100%" fill="#777"/>
              <text x="20" y="50%" fill="white" dy=".5em">myRewardNum</text>
            </svg>
            <h2 className="text-dark text-center">활동 배지</h2>
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <p>
            <a className="col btn btn-secondary" href="#" onClick={()=>{changeMenu(<ChangePassword changeMenu={changeMenu} />)}}
            >pw 변경 &raquo;</a>
            <a className="ms-5 col btn btn-secondary" href="#" onClick={()=>{changeMenu(<Withdrawal />)}}>회원 탈퇴 &raquo;</a>
          </p>
        </div>
      </div>
      </>
  )
}

export default Info;