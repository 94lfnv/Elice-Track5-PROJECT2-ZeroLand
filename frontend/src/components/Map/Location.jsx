/*global kakao*/ 
import React, { useEffect } from 'react'

const Location = () => {
    const loadKakaoMap = () => {
        if ("kakao" in window) {
          window.kakao.maps.load(() => {
            const kakaoMap = document.getElementById("kakao-map");
            const mapOption = {
              center: new window.kakao.maps.LatLng(33.450701, 126.570667),
              level: 3,
            };

            new window.kakao.maps.Map(kakaoMap, mapOption);
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
      }, []);
      return (
        <div className="App">
          <div id="kakao-map" style={{ width: "500px", height: "500px" }}></div>
        </div>
      );
}

export default Location;