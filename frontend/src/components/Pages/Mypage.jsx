import React, { useEffect, useState } from "react";
import Info from "../MyPage/Info.jsx";
import MyFav from "../MyPage/MyFav.jsx";
import MyReview from "../MyPage/MyReview.jsx";
import ChangeInfo from "../MyPage/ChangeInfo.jsx";
import ChangePassword from "../MyPage/ChangePassword.jsx";
import Withdrawal from "../MyPage/Withdrawal.jsx"
import * as Api from "../../utils/Api";

import * as MP from "../StyledComponents/MyPageStyled";

const navMenuList = [
  { label: "Information", path: "info" },
  { label: "Favorites", path: "myfav" },
  { label: "My review", path: "myreview" },
];

const mapPathToComp = {
  info: () => <Info />,
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
});

    // myReview 부분
  const [reviews,setReviews] = useState([{
    review_id: 0,
    avg_star: 0,
    description: "",
    // photo: null,
    created_time: "",
    updated_time:"",
    user_id: "",
    store_id: "",
    like_reviews: 0
  }]);

    // myFav부분
  const [favStores,setFavStores] = useState([{
    name:"",
    description:"",
    tag:"",
    url:"",
    phone:"",
    open_time: null,
    close_time:null,
    address_detail:"",
    avg_star:0
  }])

  const changeMenu = (path) => {
    setMenu(path);
  };

  const navMenuClassStyle = "menu-name";
  const contextValue = {
    changeMenu,
    setInfo,
    info,
    setReviews,
    reviews,
    setFavStores,
    favStores,
  };

  // useEffect(() => {
  //   console.log(info);
  // }, [info]);

  return (
    <MyPageContext.Provider value={contextValue}>
      <MP.PageFormBox>
      <MP.PageContainer>
        <MP.Menubox>
          <MP.Menus>MY PAGE</MP.Menus>
          {navMenuList.map((nav, index) => (
            <MP.Menus
              key={`${nav.path}-${index}`}
              className={navMenuClassStyle}
              onClick={() => changeMenu(nav.path)}
            >
              {nav.label}
            </MP.Menus>
          ))}
          </MP.Menubox>
          <MP.ContentBox>{mapPathToComp[menu]()}</MP.ContentBox>
        </MP.PageContainer>
      </MP.PageFormBox>
    </MyPageContext.Provider>
  );
}

export default Mypage;
