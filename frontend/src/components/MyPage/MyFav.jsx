import React, {useState} from "react"


function MyFav( ) {

  let [reward, setReward] = useState(0)
  let [fav, setFav] = useState(0)
  let [myReview,setMyReview] = useState(0)

  return(
    <p className="text-secondary">My Fav</p>
  )
}

export default MyFav;