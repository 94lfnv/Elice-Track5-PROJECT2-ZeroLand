// 리뷰 작성 창
import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";

function ReviewAddForm({
    setIsAdding,
}) {
    const [star, setStar] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // try, catch로 api 정보 받아오기

        setIsAdding(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Control
                type="text"
                placeholder="내용을 작성해주세요."
                value={description}
                onChange={(e) => setDescription.apply(e.target.value)}
            />
            <p>별점 매기는 거... starrate?</p>
            <p>사진 첨부 기능</p>
            <button variant="info" type="submit" size="sm">
                등록하기
            </button>
            <button
                variant="secondary"
                size="sm"
                onClick={() => setIsAdding(false)}
            >
                취소
            </button>
        </Form>
    );
}

export default ReviewAddForm;