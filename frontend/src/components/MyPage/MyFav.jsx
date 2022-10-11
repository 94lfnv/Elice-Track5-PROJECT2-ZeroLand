import React, {useState} from "react"
import MyFavCard from "./MyFavCard.jsx"

function MyFav( ) {

  // let [reward, setReward] = useState(0)
  // let [fav, setFav] = useState(0)
  // let [myReview,setMyReview] = useState(0)

  return(
    <>
      <h3 className="text-secondary">My Fav</h3>
      <MyFavCard />
      <MyFavCard />
      <MyFavCard />
      <MyFavCard />
    </>
    
  )
}

export default MyFav;