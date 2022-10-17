import React, {useState} from "react"
import CurrentForestName from "./CurrentForestName.jsx"

function ChangeForestName(namingForest, setNamingForest, selectForestName){

    return(
        <div className="row">
            <input className="col text-secondary" placeholder={namingForest} onChange={setNamingForest} />
            <button className="col"
            // onClick={selectForestName(CurrentForestName)}
            >확인</button>
        </div>
    )
}

export default ChangeForestName;


{/* <input className="text-secondary" placeholder={namingForest} onChange={setNamingForest} />
        <button onClick={
        setForestName(<CurrentForestName selectForestName={selectForestName} />)
        }>확인</button> */}