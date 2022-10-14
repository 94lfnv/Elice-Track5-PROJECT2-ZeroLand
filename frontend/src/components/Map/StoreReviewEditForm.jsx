// 리뷰 수정 창
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import StoreReviewList from "./StoreReviewList";

function StoreReviewEditForm({
    setIsEditing,
    store_id
}) {
    const [star, setStar] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        await Api.put(`review/{review_id}`, {
            star,
            description,
        });

        const res = await Api.get(`/stores/{store_id}/reviews`);
        const UpdateReview = res.data;
        // UpdateReview로 기존 리뷰 대체... setReview(UpdateReview) ?
        setIsEditing(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="reviewAddStar">
                <Form.Control
                    type="int"
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
                    수정하기
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