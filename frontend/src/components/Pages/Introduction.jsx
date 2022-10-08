import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper";

import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";

function Introduction() {
  return (
    <article id="main">
      <header>
        <h2>ZEROLAND / 서비스 소개</h2>
      </header>
      <section class="wrapper style5">
        <div class="inner">
        <Swiper
          Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div>
              <h3>코로나 이후 쓰레기 배출량 증가</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam iure quidem nisi, velit, vel sit fugit sint quaerat earum rerum optio? Sapiente unde officia maxime aperiam, nesciunt voluptates vel nam.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam iure quidem nisi, velit, vel sit fugit sint quaerat earum rerum optio? Sapiente unde officia maxime aperiam, nesciunt voluptates vel nam.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam iure quidem nisi, velit, vel sit fugit sint quaerat earum rerum optio? Sapiente unde officia maxime aperiam, nesciunt voluptates vel nam.</p>
              <hr />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <h3>제로웨이스트란?</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam iure quidem nisi, velit, vel sit fugit sint quaerat earum rerum optio? Sapiente unde officia maxime aperiam, nesciunt voluptates vel nam.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam iure quidem nisi, velit, vel sit fugit sint quaerat earum rerum optio? Sapiente unde officia maxime aperiam, nesciunt voluptates vel nam.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam iure quidem nisi, velit, vel sit fugit sint quaerat earum rerum optio? Sapiente unde officia maxime aperiam, nesciunt voluptates vel nam.</p>
              <hr />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <h3>왜 2030 소비자인가?</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam iure quidem nisi, velit, vel sit fugit sint quaerat earum rerum optio? Sapiente unde officia maxime aperiam, nesciunt voluptates vel nam.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam iure quidem nisi, velit, vel sit fugit sint quaerat earum rerum optio? Sapiente unde officia maxime aperiam, nesciunt voluptates vel nam.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam iure quidem nisi, velit, vel sit fugit sint quaerat earum rerum optio? Sapiente unde officia maxime aperiam, nesciunt voluptates vel nam.</p>
              <hr />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <h3>왜 서울 지역의 소비자인가?</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam iure quidem nisi, velit, vel sit fugit sint quaerat earum rerum optio? Sapiente unde officia maxime aperiam, nesciunt voluptates vel nam.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam iure quidem nisi, velit, vel sit fugit sint quaerat earum rerum optio? Sapiente unde officia maxime aperiam, nesciunt voluptates vel nam.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam iure quidem nisi, velit, vel sit fugit sint quaerat earum rerum optio? Sapiente unde officia maxime aperiam, nesciunt voluptates vel nam.</p>
              <hr />
            </div>
          </SwiperSlide>
        </Swiper>
        </div>
      </section>
    </article>
  );
}

export default Introduction;