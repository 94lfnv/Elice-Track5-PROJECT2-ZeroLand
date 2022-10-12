/*global kakao*/
import { useEffect } from "react";

function Location() {
    const loadKakaoMap = () => {
      if ("kakao" in window) {
        window.kakao.maps.load(() => {
          const kakaoMap = document.getElementById("kakao-map");
          const mapOption = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };
          var map = new window.kakao.maps.Map(kakaoMap, mapOption);
          var positions = [
            {
                content: `<div class="inner">카카오</div>`, 
                latlng: new kakao.maps.LatLng(33.450705, 126.570677)
            },
            {
                content: `<div class="inner">생태연못</div>`, 
                latlng: new kakao.maps.LatLng(33.450936, 126.569477)
            },
            {
                content: `<div class="inner">텃밭</div>`, 
                latlng: new kakao.maps.LatLng(33.450879, 126.569940)
            },
            {
                content: `<div class="inner">근린공원</div>`,
                latlng: new kakao.maps.LatLng(33.451393, 126.570738)
            }
        ];

        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        for (var i = 0; i < positions.length; i ++) {
    
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
    }, []);
    return (
      <div>
        <div id="kakao-map" style={{ width: "500px", height: "500px", float: "left" }}></div>
      </div>
    );
  }

export default Location;