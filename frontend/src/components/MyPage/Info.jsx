import React, {useState} from "react"


function Info() {

  let [myRewardNum, setRewardNum] = useState(0)
  let [myFavNum, setmyFavNum] = useState(0)
  let [myReviewNum,setMyReviewNum] = useState(0)

  return(      
      <>
      <div className="col-lg-4 text-dark">
        <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>

        <h2 className="text-dark">이름</h2>
        <p>email@elice.com</p>
        <p >소개글 This is the first column.</p>
      </div>
        <hr className="ms-3 me-5" style={{backgroundColor: "gray"}} />
  {/* -------------------------------------------------- */}
      <div className="container marketing text-dark">
        <div className="row">
          <div className="col-4">
            <svg className="bd-placeholder-img rounded-circle" width="110" height="110" role="img" focusable="false">
              <rect width="100%" height="100%" fill="#777"/>
              <text x="20" y="50%" fill="white" dy=".5em">{myFavNum}</text>
            </svg>
            <h2 className="text-dark text-center">관심 상점</h2>
          </div>
          <div className="col-4">
            <svg className="bd-placeholder-img rounded-circle" width="110" height="110" role="img" focusable="false">
              <rect width="100%" height="100%" fill="#777"/>
              <text x="20" y="50%" fill="white" dy=".5em">{myReviewNum}</text>
            </svg>
            <h2 className="text-dark text-center">게시글</h2>
          </div>
          <div className="col-4">
            <svg className="bd-placeholder-img rounded-circle" width="110" height="110" role="img" focusable="false">
              <rect width="100%" height="100%" fill="#777"/>
              <text x="20" y="50%" fill="white" dy=".5em">{myRewardNum}</text>
            </svg>
            <h2 className="text-dark text-center">활동 배지</h2>
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <p>
            <a className="col btn btn-secondary" href="#">pw 변경 &raquo;</a>
            <a className="ms-5 col btn btn-secondary" href="#">회원 탈퇴 &raquo;</a>
          </p>
        </div>
      </div>
      </>
  )
}

export default Info;