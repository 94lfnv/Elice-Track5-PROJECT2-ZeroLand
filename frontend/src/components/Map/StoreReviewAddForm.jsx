// 리뷰 작성 창
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import styled from 'styled-components';

import Rating from "./Rating";

import * as Api from "../../utils/Api";

function StoreReviewAddForm({
    clickedStoreId,
    setReviews,
    setIsAdding,
}) {
    const [star, setStar] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // 리뷰 등록
        await Api.post(`stores/${clickedStoreId}/review`, {
            star,
            description,
            photo,
        });

        // 등록한 리뷰 포함 해당 스토어 전체 리뷰 가져오기
        const res = await Api.get(`stores/${clickedStoreId}/reviews`);
        const UpdateReviews = res.data;
        setReviews(UpdateReviews);
        setIsAdding(false);
    };

    const handleChangeScore = (score) => {
        setStar(score);
    };

    return (
        <>
        <AddformTitle>리뷰 작성하기</AddformTitle>
        <Form onSubmit={handleSubmit}>
            <Rating
                onChangeScore={handleChangeScore}
            />
            <Form.Group controlId="reviewAddDescription">
                <Form.Control
                    type="text"
                    placeholder="내용을 작성해주세요."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
        </>
    );
}

export default StoreReviewAddForm;

const AddformTitle = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  color: black;
`;