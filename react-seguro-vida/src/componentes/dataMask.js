import React from "react"
import InputMask from "react-input-mask"



const dataMask = ({value, onChange}) =>{

  return <InputMask className="campoTexto w50" mask='99/99/9999' value={value} onChange={onChange} placeholder="ex.: 01/10/2028 "/>

}

export default dataMask