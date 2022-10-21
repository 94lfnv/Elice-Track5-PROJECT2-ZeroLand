import React, {useState, useContext, useEffect} from "react"
import StoreCard from "../Common/StoreCard.jsx"
import * as Api from "../../utils/Api";
import { MyPageContext } from "../Pages/Mypage.jsx";
import Pagination from "./Pagination.jsx"
import * as SC from "../StyledComponents/StoreCardStyled";

function MyFav( ) {
  
  const {favStores, setFavStores} = useContext(MyPageContext);
  // 페이지네이션 코드
  const limit= 3;
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
      <SC.FavCardBox>
      <h2>FAVORITE STORE</h2>
      <br />
      {favStores?.slice(offset, offset + limit).map((favStore, index) =>(
        <StoreCard
          key={index.toString()}
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
      </SC.FavCardBox>
    </>
  )}

export default MyFav;