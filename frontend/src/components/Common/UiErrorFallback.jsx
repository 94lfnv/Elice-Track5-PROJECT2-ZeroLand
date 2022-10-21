import React from "react";
import styled from "styled-components";

const UiErrorFallback = ({ error }) => {
  console.log({ error });
  return (
    <Wrap>
    <ErrorBox style={{ fontSize: "19px" }}>
      {error.error}
      <br />
      😮This is UI Error😵‍💫
      <button
        onClick={() => {
          window.location.href = "/";
        }}
      >
        메인 화면으로 돌아가기
      </button>
    </ErrorBox>
    </Wrap>
  );
};
export default UiErrorFallback;

const Wrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const ErrorBox = styled.div`
    width: 200px;
    height: 50px;
`;