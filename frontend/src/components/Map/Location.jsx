/*global kakao*/
import React, { useState, useEffect } from "react";

import useGeolocation from "../../hooks/useGeolocation";

function Location({
  stores, counts,
}) {
  const geo = useGeolocation();

  const loadKakaoMap = () => {
    if ("kakao" in window) {
      window.kakao.maps.load(() => {
        const kakaoMap = document.getElementById("kakao-map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(geo.lat, geo.lon),
          level: 3,
        };

        var map = new window.kakao.maps.Map(kakaoMap, mapOption);

        let positions = []
        for (i=0; i<counts; i++) {
            positions[i] = {
              content: `<div className="inner">${stores[i].name}</div>`,
              latlng: new kakao.maps.LatLng(stores[i].latitude, stores[i].longitude),
            }
        };

        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        for (var i = 0; i < counts; i ++) {
    
            var imageSize = new kakao.maps.Size(24, 35); 
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
            
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                image : markerImage // 마커 이미지
            });

            // 마커에 표시할 인포윈도우 생성
            var infowindow = new kakao.maps.InfoWindow({
                content: positions[i].content // 인포윈도우에 표시할 내용
            });

            // 마커에 mouseover 이벤트와 mouseout 이벤트 등록
            // 이벤트 리스너로는 클로저를 만들어 등록합니다 
            // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됨
            kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
            kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
        }

        // 인포윈도우 표시 클로저 함수
        function makeOverListener(map, marker, infowindow) {
            return function() {
                infowindow.open(map, marker);
            };
        }
        // 인포윈도우 닫는 클로저 함수
        function makeOutListener(infowindow) {
            return function() {
                infowindow.close();
            };
        }
        });
        return;
      }
      return loadKakaoMap();
    };
    
    useEffect(() => {
      const kakaoMapScript = document.createElement("script");
      kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
        import.meta.env.VITE_KAKAOMAP_API_KEY
      }&autoload=false`;
      kakaoMapScript.defer = true;
      kakaoMapScript.async = true;
      document.head.appendChild(kakaoMapScript);
      kakaoMapScript.addEventListener("load", loadKakaoMap);
      
      return () => {
        kakaoMapScript.removeEventListener("load", loadKakaoMap);
      };
    }, [geo]);

    return (
      <div>
        <div id="kakao-map" style={{ width: "500px", height: "500px", float: "left" }}></div>
      </div>
    );
  }

export default Location;