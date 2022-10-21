import React, { useState } from "react"
import * as RC from "../StyledComponents/StoreCardStyled";

function ReviewCard({...props}) {
    const {review}= props  //
    console.log(review.star)
    const [date, setDate] = useState(new Date(review.created_time));
    const newDate = date.toISOString().split("T")[0];

  return(
            <RC.CardBox>
                <RC.InnerBox>
                    <RC.StoreName>
                            {"store_name" in review ? review.store_name : "매장이름"}
                            </RC.StoreName>

                            <div style={{marginLeft:"10px"}}>
                                🌟:{"star" in review ? review.star : 0}
                            </div>
                            <div className="col hearts">🧡x
                            {"like_reviews" in review ? review.like_reviews.length : 0}
                            </div>

                            <RC.StoreAdress>
                            {"created_time" in review ? newDate : ""}
                             </RC.StoreAdress>
                             <RC.StoreInfoBox>
                            {"description" in review ? review.description : ""}
                        </RC.StoreInfoBox>
                    </RC.InnerBox>
            </RC.CardBox>
  )
}

export default ReviewCard;
