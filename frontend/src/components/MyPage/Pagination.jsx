import styled from "styled-components";

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 20px;
`;

const Button = styled.button`
  width: 20px;
  height: 20px;
  padding: 17px;
  // 활성화된 버튼 컬러
  background: #D9D8D2;
  color: #f2f2f2;
  font-size: 14px;
  line-height: 5px;

  &:hover {
    background: #D8D9C5;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #68A694;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;