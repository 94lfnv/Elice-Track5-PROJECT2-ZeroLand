import React, { useEffect, useState } from "react";
import Info from "../MyPage/Info.jsx";
import Reward from "../MyPage/Reward.jsx";
import MyFav from "../MyPage/MyFav.jsx";
import MyReview from "../MyPage/MyReview.jsx";
import ChangeInfo from "../MyPage/ChangeInfo.jsx";
import ChangePassword from "../MyPage/ChangePassword.jsx";

/**
 * 
 * <a
            className="fst-italic py-4 nav-link active text-white border border-secondary"
            aria-current="page"
            href="#"
            onClick={() => {
              setMenu(<Info changeMenu={changeMenu} />);
            }}
          >
            Info
          </a>
          <a
            className="py-4 nav-link text-white border border-secondary"
            href="#"
            onClick={() => {
              setMenu(<Reward />);
            }}
          >
            Reward
          </a>
          <a
            className="py-4 nav-link text-white border border-secondary"
            href="#"
            onClick={() => {
              setMenu(<MyFav />);
            }}
          >
            Fav
          </a>
          <a
            className="py-4 nav-link text-white border border-secondary"
            href="#"
            onClick={() => {
              setMenu(<MyReview />);
            }}
          >
            My Review
          </a>
 */

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
  // withdrawal: () =>
};

export const MyPageContext = React.createContext({
  changeMenu: () => {},
  setInfo: () => {},
  info: {
    name: "이름",
    nickname: "사용자 이름",
    url: "rabbilt@elice.com",
    phone: "010-1010-2020",
    introduction: "소개",
    close_time: "오후 10시",
    reviews: "리뷰",
    star_avg: 4.8,
  },
});

function Mypage() {
  const [menu, setMenu] = useState("info");
  const [info, setInfo] = useState({
    name: "이름",
    nickname: "사용자 이름",
    url: "rabbilt@elice.com",
    phone: "010-1010-2020",
    introduction: "소개",
    close_time: "오후 10시",
    reviews: "리뷰",
    star_avg: 4.8,
  });

  const changeMenu = (path) => {
    setMenu(path);
  };

  const navMenuClassStyle = "py-4 nav-link text-white border border-secondary";
  const contextValue = {
    changeMenu,
    setInfo,
    info,
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
          <nav className="fs-4 text-end ps-0 nav flex-column col-3 justify-content-left bg-secondary bg-gradient"></nav>
          {/* 네비게이션 */}
          {navMenuList.map((nav, index) => (
            <div
              key={`${nav.path}-${index}`}
              className={navMenuClassStyle}
              onClick={() => changeMenu(nav.path)}
            >
              {nav.label}
            </div>
          ))}
          <div className="col-9 bg-light">{mapPathToComp[menu]()}</div>
        </div>
      </div>
    </MyPageContext.Provider>
  );
}

export default Mypage;
