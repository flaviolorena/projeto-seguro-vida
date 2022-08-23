import { Container, Paper, Typography } from "@mui/material";
import CpfMask  from "../componentes/cpfMask.js";
import TerminoVigencia  from "../componentes/dataMask.js";
import React, { useState, useEffect } from "react";

function CriarCotacao() {
  
  const fieldset = document.getElementById('cotacao-fieldset')

  
  useEffect(()=>{
  },[])

  const [usuario, setUsuario] = useState({
    cpf: '',
    terminoVigencia: '',
    valorRisco: null,
    qtParcelas: null,
  })

  const [exibeProposta, setExibeProposta] = useState(false)

  const [cobertura, setCobertura] = useEffect('')

  function calcParcelas(valorRisco, qtParcelas){
    const valor = valorRisco / qtParcelas
    return valor.toFixed(2)
  }

  function limparForm(event){
    
    event.preventDefault()
    console.log(event)
    setUsuario({
      cpf:''
    })

    fieldset.removeAttribute('disabled')
    setExibeProposta(false)
  }

  function avancarForm(event){
    event.preventDefault()
    fieldset.setAttribute('disabled','')
    setExibeProposta(true)
    console.log(usuario)
  }

  function enviarForm(event){
    event.preventDefault()
    console.log("enviado")
  }


  return (
    <Container maxWidth="lg">
      <Paper>

      <Typography component='h1' variant='h5' textAlign='center'>
          Formulario de Cotação
      </Typography>

      <form className="form">
      <fieldset id="cotacao-fieldset" className="cotacao-fieldset">
        <legend>Dados para cotação</legend>

        <label htmlFor="nome" className="labelTexto" >Nome</label>
        <input type="text" name="nome" className="campoTexto w100" placeholder="ex.: José Santos Silva"  />    
        
        <label htmlFor="cpf" className="labelTexto">CPF</label>
        <CpfMask value={usuario.cpf} onChange={(event) => setUsuario({cpf: event.target.value})}   />
        
        <label htmlFor="terminoVigencia" className="labelTexto">Termino da Vigência</label>
        <TerminoVigencia value={usuario.terminoVigencia} onChange={(event) => setUsuario({terminoVigencia: event.target.value})} placeholder="ex R$10.000,00" />

        <label htmlFor="valorRisco" className="labelTexto" >Valor em risco</label>
        <input type="number" name="valorRisco" value={usuario.valorRisco} onChange={(event) => setUsuario({valorRisco: event.target.value})} className="campoTexto w30" min="5000" max="1000000" placeholder="ex.: R$10.000,00" />    
      </fieldset>
      
      {/* Proposta */}
      {
        exibeProposta &&

      <fieldset id="pagamento-fieldset" className="cotacao-fieldset" >
        <legend>Forma de pagamento</legend>
        <p>Valor a vista: <strong>R${usuario.valorRisco}</strong> </p>
        <p>Valor parcelado:</p>
        <select 
          className="campoTexto w50" 
          value={usuario.qtParcelas} 
          onChange={(evento) => setUsuario({...usuario, qtParcelas: evento.target.value})}
        >
          <option value="0" > A vista: R$ {usuario.valorRisco} </option>
          <option value="1" > Parcelado 1x: R$ {calcParcelas(usuario.valorRisco,1)} </option>
          <option value="2" > Parcelado 2x: R$ {calcParcelas(usuario.valorRisco,2)} </option>
          <option value="3" > Parcelado 3x: R$ {calcParcelas(usuario.valorRisco,3)} </option>
          <option value="4" > Parcelado 4x: R$ {calcParcelas(usuario.valorRisco,4)} </option>
          <option value="5" > Parcelado 5x: R$ {calcParcelas(usuario.valorRisco,5)} </option>
          <option value="6" > Parcelado 6x: R$ {calcParcelas(usuario.valorRisco,6)} </option>
          <option value="7" > Parcelado 7x: R$ {calcParcelas(usuario.valorRisco,7)} </option>
          <option value="8" > Parcelado 8x: R$ {calcParcelas(usuario.valorRisco,8)} </option>
          <option value="9" > Parcelado 9x: R$ {calcParcelas(usuario.valorRisco,9)} </option>
          <option value="10" > Parcelado 10x: R$ {calcParcelas(usuario.valorRisco,10)} </option>
          <option value="11" > Parcelado 11x: R$ {calcParcelas(usuario.valorRisco,11)} </option>
          <option value="12" > Parcelado 12x: R$ {calcParcelas(usuario.valorRisco,12)} </option>
        </select>
      </fieldset>
      }
    

        <div className="container-btn">
          <button className="btn-limpar" onClick={(event) => limparForm(event)} >Limpar</button>
          
        {
          !exibeProposta ?

          <button className="btn-enviar" onClick={(event) => avancarForm(event)} >Avançar</button>
          :
          <button className="btn-enviar" onClick={(event) => enviarForm(event)} >Enviar</button>

        }
        
        </div>
      </form>

      </Paper>
    </Container>
  );
}

export default CriarCotacao;
