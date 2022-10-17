import React, {useState} from "react"
import ChangeForestName from "./ChangeForestName.jsx"


function CurrentForestName({selectForestName}){

    const [namingForest, setNamingForest]=useState("숲 이름")

    return(
        <div className="row">
            <h3 className="col text-secondary">
            {namingForest}
            </h3>
            <ChangeForestName />
            <button className="col"
            // onClick={selectForestName(<ChangeForestName />)}
            >
                수정
            </button>
            {/* <button className="col"
            onClick={selectForestName(<ChangeForestName
            namingForest={namingForest}
            setNamingForest={setNamingForest} 
            selectForestName={selectForestName} />)}>수정</button> */}
        </div>
    )
}

export default CurrentForestName;