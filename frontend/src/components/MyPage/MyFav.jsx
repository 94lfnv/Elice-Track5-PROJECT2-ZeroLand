import React, {useState, useEffect} from "react"
import StoreCard from "../Common/StoreCard.jsx"

  const favStore ={
    name:"가게이름자리",
    description:"주소자리",
    url:"홈페이지 주소",
    phone:"010-1010-2020",
    open_time:"오전 10시",
    close_time:"오후 10시",
    reviews:"리뷰",
    star_avg:4.8
  }

function MyFav( ) {
  

  // const favStore=[{
  //   "like_store_id": 3,
  //   "store_id": 1,
  //   "name": "ㅇㅇ샵",
  //   "description": "설명",
  //   "address_id": 1,
  //   "address_detail":"주소1", 
  //   "star_avg": 3.75
  //   },
  //   {"like_store_id": 4,
  //   "store_id": 2,
  //   "name": "ㅁㅁ샵",
  //   "description": "설명",
  //   "address_id": 2,
  //   "address_detail": "주소2",
  //   "star_avg": 3.75
  //   }]

  // const [favStore,setFavStore] = useState(null);

  // const fetchData = async () =>{  
  //   const response = await axios.get('/user/like-store');
  //   setFavStore(response.data);
  // };  // GET 요청 함수화

  // useEffect(()=>{  //무한루프 실행을 피하기 위해 useEffect를 이용. server의 값을 받아옴.
  //   fetchData(); // <- 위에서 작성한 fetchData 사용
  // }, []); 

  return(
    <>
      {<StoreCard
          name={favStore.name}
          description={favStore.description}
          // address_detail={store.address_detail}
          // url={store.url}
          // phone={store.phone}
          // open_time={store.open_time}
          // close_time={store.close_time}
          star_avg={favStore.star_avg} 
      />}
    </>
  )}

export default MyFav;



// {favStore?.map((store) =>( // map 할 값이 없을 때 에러를  피하기 위해 .map 앞에 '?'를 추가
//         <StoreCard
//           name={store.name}
//           description={store.description}
//           address_detail={store.address_detail}
//           url={store.url}
//           phone={store.phone}
//           open_time={store.open_time}
//           close_time={store.close_time}
//           star_avg={store.star_avg} 
//         />
//       ))}