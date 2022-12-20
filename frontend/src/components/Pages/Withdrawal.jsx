import React from 'react'

function Withdrawal(){
    
    return( 
        <div>
            <h1>정보 이용 약관</h1>
            <p>1. 탈퇴 시 회원 정보는 보류 처리되어 14일간 보관됩니다. 이 기간 동안 동일한 메일 주소로 회원가입을 할 시 가입이 제한되며, 탈퇴 취소를 원하시는 경우 취소 처리도 가능합니다.</p>
            <p>
            2. 탈퇴하더라도 작성하신 리뷰는 계속 남아 있게 됩니다. 작성한 리뷰를 제외한 모든 회원 정보는 삭제되며 남아 있는 리뷰의 작성자명은 '(익명)'으로 처리됩니다. </p>
            {/* <p>약관에 동의하십니까? </p> */}
            <div className="row">
                <button className="col" onClick={onSubmitAccept}>취소</button>
                <button className="col" onClick={onSubmitAccept}>진행</button>
            </div>
        </div>
    )
}

export default Withdrawal