import React, { useState } from 'react';

import StoreCard from '../Common/StoreCard';
import StoreReviewList from './StoreReviewList';

function StorePage ({
  store_Id,
  isEditable, // 로그인한 상태 && 그 리뷰를 작성한 유저인 경우에만 편집 폼이 떠야 함
  isAddable, // 로그인한 상태에만 리뷰 작성 버튼이 떠야 함
  review,
  setReview,
}) {
    const [isEditing, setIsEditing] = useState(false);

    return (
          <>
          <StoreCard 
            currentStore={store_Id}
            store_Id={store_Id}
          />
          <StoreReviewList
            currentStore={store_Id}
            isEditable={isEditable}
            isAddable={true} // 원래 기본 상태 isAddable={isAddable} 인데 테스트용으로 보이게 함
            setIsEditing={setIsEditing}
            setReview={setReview}
            store_Id={store_Id}
           />
      </>
  );
}

export default StorePage;