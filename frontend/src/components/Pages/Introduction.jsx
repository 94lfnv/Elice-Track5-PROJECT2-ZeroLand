import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";

import 'swiper/css';
import "swiper/css/pagination";
import ChartLine from "../Introduction/ChartLine";
import Chart2 from "../Introduction/Chart2";

const slideContentList = [
  // 1번
  <div>
    <h2>코로나 이후 쓰레기 배출량 증가</h2>
      <div>
      <b>코로나19로 인해 사람들은 외부 활동을 꺼리게 되었습니다.</b><br />
      <br />
      자주 사용하는 생필품들을 마트에 가서 사기보다는 택배로 주문하게 됐고,<br />
      가볍게 나가서 즐기고 왔을 외식은 사람을 마주치지 않고도 받을 수 있는 배달 주문으로 대체되었습니다.<br />
      <br />
      이렇게 늘어난 비대면 서비스의 규모만큼 사용되는 일회용품 역시 늘어났습니다. <br />
      코로나19 발생 이후 <b>버려지는 쓰레기의 양은 전년 대비 7.4% 증가</b>하였습니다. <br />
      (전국폐기물 발생 및 처리현황, 1996 ~ 2020) <br />
      <ChartLine />
      <br />
      </div>
  </div>,
  // 2번
  <div>
    <h2>제로 웨이스트란?</h2>
    <div>
    <span className="image right"><img src="img/zerowaste.jpeg" alt="제로 웨이스트 소개 이미지" /></span>
    <b>제로 웨이스트(Zero Waste)</b>는 모든 제품이 재사용될 수 있도록 장려하며 폐기물을 방지하는데 초점을 맞춘 원칙입니다. <br />
    <br />
    제로 웨이스트는 제품의 흐름을 크게 바꾸어 <b>낭비가 없는 사회를 목표</b>로 합니다.<br />
    재활용과 재사용을 통해 폐기물을 없애는 것 이상의 것을 포함하는데, 폐기물을 줄이기 위한 생산-유통 시스템의 재구축에 힘을 쏟고 있습니다. <br />
    <br />
    <b>ZeroLand는 물건을 사고 파는 과정에서 버려지는 쓰레기를 줄이기 위해 사용자의 주변에 있는 제로 웨이스트 샵의 위치 정보를 제공하는 서비스입니다.</b>
    </div>
  </div>,
  // 3번
  <div>
    <h2>왜 2030 소비자인가?</h2>
    <div>
    ZeroLand는 20대, 30대 소비자의 <b>환경관심정도</b>가 다른 연령대의 소비자들보다 낮다는 점에 주목했습니다.<br />
    <br />
    근소한 차이라고도 볼 수 있지만, 친환경에 대한 관심을 촉구하는 것은 계속해서 환경을 사용해야 하는 젊은 세대에게 무엇보다 중요합니다.<br />
    또한 친환경적 생활 습관의 실천이 어려운 이유 중 제품을 구매할 때 친환경적인 대안이 없다는 점이 가장 높은 원인임을 주목하였습니다. (친환경적 태도 및 생활 습관 실천의 어려움, 2021 KEI 국민환경의식조사) <br />
    <br />
    따라서 <b>웹 서비스에 대한 접근성이 높은 20대와 30대</b>를 서비스 타겟으로 선정해 제로웨이스트 샵에 대한 정보를 제공하고, 사용자들의 경험을 공유할 수 있는 공간을 제공하기로 했습니다.
    <Chart2 style={{innerWidth: "500px"}} />
    <br />
    </div>
  </div>,
  // 4번
  <div>
    <h2>왜 서울 지역의 소비자인가?</h2>
    <div>
    <span className="image left"><img src="img/introduction_zeromap.png" /></span>
    현재 국내에 있는 제로 웨이스트 샵의 대부분은 <b>서울과 수도권</b>에 위치하고 있습니다. <br />
    <br />
    또한 앞서 타겟으로 삼은 <b>20대, 30대 청년 인구가 서울 지역에 가장 많이 살고 있다는 점</b> 역시 고려하여 ZeroLand의 첫 번째 서비스 타겟을 서울 지역의 20대, 30대 소비자로 선정하였습니다. <br />
    <br />
    친환경적인 소비에 대한 국내 소비자들의 관심이 계속해서 증대하고 있는 만큼, 차후 서비스 범위를 전국 범위로 확대할 예정입니다.<br />
     </div>
  </div>,
];

const setSwiperSlides = () => {
  return slideContentList.map((content, index) => (
    <SwiperSlide key={index}>{content}</SwiperSlide>
  ));
};

function Introduction() {
  return (
    <article id="main">
      <section className="wrapper style5">
        <div className="inner">
        <Swiper
          Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
            {setSwiperSlides()}
        </Swiper>
        </div>
      </section>
    </article>
  );
}

export default Introduction;