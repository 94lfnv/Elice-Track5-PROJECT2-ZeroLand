import React, {useState, useContext, useEffect} from "react"
import StoreCard from "../Common/StoreCard.jsx"
import * as Api from "../../utils/Api";
import { MyPageContext } from "../Pages/Mypage.jsx";
import Pagination from "./Pagination.jsx"

function MyFav( ) {
  
  const {favStores, setFavStores} = useContext(MyPageContext);
  // 페이지네이션 코드
  const limit= 4;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  
  const fetchData = async () =>{  
    const response = await Api.get('mypage/stores');
    setFavStores(response.data);
  };

  useEffect(()=>{
    fetchData();
  }, []); 

  return(
    <>
      <h2 className="text-dark">My Review</h2>
      <br />
      {favStores?.slice(offset, offset + limit).map((favStore) =>(
        <StoreCard
          favStore={favStore}
        />
      ))}
      <footer>
          <Pagination
            total={favStores.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </footer>
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