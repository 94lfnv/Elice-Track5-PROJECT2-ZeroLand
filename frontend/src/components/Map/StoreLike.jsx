import React, { useState } from "react";
import { Col } from "react-bootstrap";
import * as Api from "../../utils/Api";

function StoreLike ({ store_id }) {
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);

    const handleLike = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        await Api.post(`stores/${store_id}/like`);
        setLike(true);
    };

    const handleDislike = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        await Api.delete(`store/${store_id}/like`);
        setDislike(true);
    };

    return (
      <Col>
        <button
            onClick={handleLike}
        >
            찜하기
        </button>
        <button
            onClick={handleDislike}
        >
            찜 해제
        </button>
      </Col>
    );
}

export default StoreLike;