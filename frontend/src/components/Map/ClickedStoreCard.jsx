import React, { useState, useEffect } from "react"
import StarRate from "../Common/StarRate";
import * as Api from "../../utils/Api";
import StoreLike from "./StoreLike";

function ClickedStoreCard({
    clickedStoreId
}) {
    const [thisStore, setThisStore] = useState([]);

    const getThisStore = async () => {
        const resultThisStore = await Api.get(`store/${clickedStoreId}`);
        setThisStore(resultThisStore.data);
    };
    useEffect(() => {
        getThisStore();
    }, []); // 클릭한 가게 정보만 불러오기

    return(
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-8">
                    <div className="card-body">
                        <div className="row">
                            <h4 className="col card-title text-dark">{thisStore[0]?.name}</h4>
                            <h5 className="col text-secondary">{thisStore[0]?.address_detail}</h5>
                            <div className="col">🌟: {thisStore[0]?.avg_star}</div>
                            <StoreLike store_id={clickedStoreId} />
                        </div>
                        <p className="card-text text-secondary">{thisStore[0]?.description}</p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ClickedStoreCard;
