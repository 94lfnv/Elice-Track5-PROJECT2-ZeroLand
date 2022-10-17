import React,{useState} from "react"
import Info from "../MyPage/Info.jsx"
import Reward from "../MyPage/Reward.jsx"
import MyFav from "../MyPage/MyFav.jsx"
import MyReview from "../MyPage/MyReview.jsx"


function Mypage() {
  
  const [menu, setMenu] = useState(<Info />)
  const changeMenu = (value) => {
    setMenu(value);
};
  


    return (    
        <div className="container py-2">
          {/* <article id="main" class="w-auto h-1">
            <header>
              <h2>ZEROLAND / 서비스 소개</h2>
            </header>
          </article> */}
          <div className="row mx-4 mt-4">
            <nav className="fs-4 text-end ps-0 nav flex-column col-3 justify-content-left bg-secondary bg-gradient">
                <a className="fst-italic py-4 nav-link active text-white border border-secondary" aria-current="page" href="#" onClick={()=>{setMenu(<Info changeMenu={changeMenu} />)}}>Info</a>
                <a className="py-4 nav-link text-white border border-secondary" href="#" onClick={()=>{setMenu(<Reward />)}}>Reward</a>
                <a className="py-4 nav-link text-white border border-secondary" href="#" onClick={()=>{setMenu(<MyFav />)}}>Fav</a>
                <a className="py-4 nav-link text-white border border-secondary" href="#" onClick={()=>{setMenu(<MyReview />)}}>My Review</a>
             </nav>
            {/* 네비게이션 */}
            <div className="col-9 bg-light">
              {menu}  
            </div>   
      </div>
    </div>
  );
}

export default Mypage;