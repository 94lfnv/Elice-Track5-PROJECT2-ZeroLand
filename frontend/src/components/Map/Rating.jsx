import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

const ARRAY = [0, 1, 2, 3, 4];

function Rating() {
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const handleStarClick = index => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  useEffect(() => {
    sendReview();
  }, [clicked]);

  const sendReview = () => {
    let score = clicked.filter(Boolean).length; // 사용자가 매긴 별점, 이 값을 보내야 함
  };

  return (
    <Wrap>
      <RatingText>별점</RatingText>
      <Stars>
        {ARRAY.map((e, idx) => {
          return (
            <FaStar
              key={idx}
              size="25"
              onClick={() => handleStarClick(e)}
              className={clicked[e] && 'yellowStar'}
            />
          );
        })}
      </Stars>
    </Wrap>
  );
}

export default Rating;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

const RatingText = styled.div`
  color: #787878;
  font-size: 12px;
  font-weight: 400;
`;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;
