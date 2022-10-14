// 리뷰 작성 창
import React, { useState } from "react";
import { Form } from "react-bootstrap";

function StoreReviewAddForm({
    store_Id,
    setReview,
    setIsAdding,
}) {
    const [star, setStar] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reviewStore = store_Id;

        // 리뷰 정보 api에서 post, get
        await Api.post(`/stores/{store_id}/review`, {
            reviewStore, // 이게 있어야 하나...??
            star,
            description,
            photo,
        });

        const res = await Api.get(`/stores/{store_id}/reviews`); // 해당 스토어 전체 리뷰 가져오기
        setReview(res.data);
        setIsAdding(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="reviewAddStar">
                <Form.Control
                    type="number"
                    placeholder="별점을 평가해주세요. (1~5)"
                    value={star}
                    onChange={(e) => setStar.apply(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="reviewAddDescription">
                <Form.Control
                    type="text"
                    placeholder="내용을 작성해주세요."
                    value={description}
                    onChange={(e) => setDescription.apply(e.target.value)}
                />
            </Form.Group>

            <Form.Group>
                <button
                    type="submit"
                    size="sm"
                >
                    등록하기
                </button>
                <button
                    size="sm"
                    onClick={() => setIsAdding(false)}
                >
                    취소
                </button>
            </Form.Group>
        </Form>
    );
}

export default StoreReviewAddForm;