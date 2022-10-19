import React, {useContext, useEffect} from "react"
import StoreCard from "../Common/StoreCard.jsx"
import * as Api from "../../utils/Api";
import { MyPageContext } from "../Pages/Mypage.jsx";

function MyFav( ) {
  
  const {favStores, setFavStores} = useContext(MyPageContext);

  const fetchData = async () =>{  
    const response = await Api.get('user/like-store');
    setFavStores(response.data);
  };

  useEffect(()=>{
    fetchData();
  }, []); 

  return(
    <>
      {favStores?.map((favStore) =>(
        <StoreCard
          favStore={favStore}
        />
      ))}
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