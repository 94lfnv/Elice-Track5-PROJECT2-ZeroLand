import React, { useEffect, useState } from "react";
import Info from "../MyPage/Info.jsx";
import Reward from "../MyPage/Reward.jsx";
import MyFav from "../MyPage/MyFav.jsx";
import MyReview from "../MyPage/MyReview.jsx";
import ChangeInfo from "../MyPage/ChangeInfo.jsx";
import ChangePassword from "../MyPage/ChangePassword.jsx";
import Withdrawal from "../MyPage/Withdrawal.jsx"
import * as Api from "../../utils/Api";

const navMenuList = [
  { label: "Info", path: "info" },
  { label: "Reward", path: "reward" },
  { label: "MyFav", path: "myfav" },
  { label: "MyReview", path: "myreview" },
];

const mapPathToComp = {
  info: () => <Info />,
  reward: () => <Reward />,
  myfav: () => <MyFav />,
  myreview: () => <MyReview />,
  changeinfo: () => <ChangeInfo />,
  changepassword: () => <ChangePassword />,
  withdrawal: () => <Withdrawal />
  // withdrawal: () =>
};

export const MyPageContext = React.createContext({
  changeMenu: () => {},
  setInfo: () => {},
  // info: {
  //   name: "이름",
  //   nickname: "사용자 이름",
  //   email: "rabbilt@elice.com",
  //   phone: "010-1010-2020",
  //   introduction: "소개",
  //   close_time: "오후 10시",
  //   reviews: "리뷰",
  //   star_avg: 4.8,
  // },
  // setReviews: () =>{},
  // reviews: [{
  //   review_id: 0,
  //   star: 0,
  //   description: "",
  //   // photo: null,
  //   created_time:"",
  //   updated_time:"",
  //   user_id: "",
  //   store_id: "",
  //   like_reviews: 0
  // }],
});

function Mypage() {
  const [menu, setMenu] = useState("info");
  
    // info 부분
  const [info, setInfo] = useState({
    name: "이름",
    nickname: "사용자 이름",
    email: "rabbilt@elice.com",
    phone: "010-1010-2020",
    introduction: "소개",
    close_time: "오후 10시",
    reviews: "리뷰",
    star_avg: 4.8,});

    // myReview 부분
  const [reviews,setReviews] = useState([{
    review_id: 0,
    star: 0,
    description: "",
    // photo: null,
    created_time:"",
    updated_time:"",
    user_id: "",
    store_id: "",
    like_reviews: 0
  }]);

    // myFav부분
  const [favStores,setFavStores] = useState([{
    name:"",
    description:"",
    url:"",
    phone:"",
    open_time:"",
    close_time:"",
    // reviews:[{}],
    star_avg:0
  }])

  const changeMenu = (path) => {
    setMenu(path);
  };

  const navMenuClassStyle = "py-4 nav-link text-white border border-secondary";
  const contextValue = {
    changeMenu,
    setInfo,
    info,
    setReviews,
    reviews,
    setFavStores,
    favStores,
  };

  useEffect(() => {
    console.log(info);
  }, [info]);

  return (
    <MyPageContext.Provider value={contextValue}>
      <div className="container py-2">
        {/* <article id="main" class="w-auto h-1">
            <header>
              <h2>ZEROLAND / 서비스 소개</h2>
            </header>
          </article> */}
        <div className="row mx-4 mt-4">
          <nav className="fs-4 text-end ps-0 nav flex-column col-3 justify-content-left bg-secondary bg-gradient">
          {navMenuList.map((nav, index) => (
            <div
              key={`${nav.path}-${index}`}
              className={navMenuClassStyle}
              onClick={() => changeMenu(nav.path)}
            >
              {nav.label}
            </div>
          ))}
          </nav>
          <div className="col-9 bg-light">{mapPathToComp[menu]()}</div>
        </div>
      </div>
    </MyPageContext.Provider>
  );
}

export default Mypage;
