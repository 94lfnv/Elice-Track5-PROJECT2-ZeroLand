import React, {useState} from "react"
import CurrentForestName from "../Common/CurrentForestName.jsx";

function Reward() {

  // selectForestName >> 현재 forestname 자리에 보이는 상태

  const [forestName, setForestName] = useState(<CurrentForestName />)
  // <CurrentForestName setForestName selectForestName={selectForestName} />


  const selectForestName = (value) => {
    setForestName(value);
  };

  return(
    <div className="row text-secondary">
      <div className="col">
        <div>{forestName}</div>
        <h4 className="text-secondary">모인 새싹</h4>
        <div className="text-secondary">이미지들</div>
      </div>
      <div className="col">
        <div style={{padding:"10px", height:"100px", border:"1px solid black", backgroundColor:"aqua"}}>
        {/* <!-- 새롭게 부모가 된 div --> */}
          <div style={{position:"relative", border:"1px solid red", width:"100%", height:"100%"}}>

          {/* <!-- 자식 div --> */}
            <div style={{position:"absolute", backgroundColor:"blueviolet", opacity:"0.7", width:"100%", height:"100%"}}>
              <p>나무</p>
            </div>
            <p style={{color:"black"}}> 숲숲숲숲숲숲숲숲숲숲숲숲숲숲숲 </p>   
          </div>  
        </div>
      </div>
    </div>
  )
}

export default Reward;