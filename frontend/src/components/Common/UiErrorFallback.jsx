import React from "react";

const UiErrorFallback = ({ error }) => {
  console.log({ error });
  return (
    <div style={{ fontSize: "100px" }}>
      {error.error}
      <br />
      This is UI Error
      <button
        onClick={() => {
          window.location.href = "/";
        }}
      >
        go-back
      </button>
    </div>
  );
};
export default UiErrorFallback;