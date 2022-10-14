// 특정 스토어 전체 리뷰
import React, { useState } from 'react';

import ReviewCard from '../Common/ReviewCard';
import StoreReviewCard from './StoreReviewCard';

// 로그인 상태일 때 & 본인이 작성한 리뷰 카드에서만 isEditable = true이여야 함 < 이 로직 짜야 함

function StoreReviewList ({
    store_id,
    isEditable,
}) {
    return (
        <StoreReviewCard /> 
    );
}

export default StoreReviewList;