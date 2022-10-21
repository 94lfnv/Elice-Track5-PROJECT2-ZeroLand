import React from "react"
import StarRate from "./StarRate.jsx"

function StoreCard({...props}) {
    const {favStore}= props
    console.log(favStore)

  return(
    <div className="card mb-3">
        <div className="row g-0">
            <div className="col-md-8">
                <div className="card-body">
                    <div className="row">
                        {/* <h4 className="col card-title text-dark"><a href="/storepage">{favStore.name}</a></h4>
                         <h5 className="col text-secondary">{favStore.address_detail}</h5>
                         <div className="col"><StarRate star={favStore.star_avg} /></div> */}
                         <h3 className="col text-dark">
                        {/* {"store_name" in favStore ? favStore.store_name : "매장 명"} */}
                        {"name" in favStore ? favStore.name : "매장 명"}
                        </h3>
                        <h5 className="col text-secondary">
                        {"address_detail" in favStore ? favStore.address_detail : "상세 주소"}
                        </h5>
                        <div className="col text-dark">
                            🌟: {favStore.avg_star}
                        </div>
                    </div>
                    <p className="card-text text-secondary">
                    {"description" in favStore ? favStore.description : "설명"}
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StoreCard;
