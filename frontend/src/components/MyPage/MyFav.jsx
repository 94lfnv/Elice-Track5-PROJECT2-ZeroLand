import React, {useState} from "react"
import StoreCard from "../Common//StoreCard.jsx"

function MyFav( ) {

  // let [reward, setReward] = useState(0)
  // let [fav, setFav] = useState(0)
  // let [myReview,setMyReview] = useState(0)

  return(
    <>
      <h3 className="text-secondary">My Fav</h3>
      <StoreCard />
      <StoreCard />
      <StoreCard />
      <StoreCard />
    </>
    
  )
}

export default MyFav;