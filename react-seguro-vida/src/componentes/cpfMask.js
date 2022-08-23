import React from "react"
import InputMask from "react-input-mask"

const somenteNumeros = (str) => str.replace(/[^0-9]/g, '')


const cpfMask = ({value, onChange}) =>{
  function handleChange(event){
    onChange({
      ...event,
      target:{
        ...event.target,
        value: somenteNumeros(event.target.value)
      }
    })
  }
  return <InputMask className="campoTexto w30" mask='999.999.999-99' value={value} onChange={handleChange} placeholder="ex.: 123.456.789-99" required/>

}

export default cpfMask