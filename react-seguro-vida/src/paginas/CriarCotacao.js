import { Container, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

import http from '../servicos/http.js'
import CpfMask  from "../componentes/cpfMask.js";
import TerminoVigencia  from "../componentes/dataMask.js";

function CriarCotacao() {
  
  const fieldset = document.getElementById('cotacao-fieldset')

  
 
  const [usuario, setUsuario] = useState({
    nome: '',
    cpf: '',
    terminoVigencia: '',
    valorRisco: null,
    valorPagoSegurado: null,
    qtParcelas: null,
    cobertura: ''

  })

  const [exibeProposta, setExibeProposta] = useState(false)

  const [coberturas, setCoberturas] = useState([])

  useEffect(()=>{
    getCoberturas()
    console.log(coberturas)
    console.log(usuario)
  },[])
  const getCoberturas = async () => {
    const { data } = await http.get('coberturas')
      try{
        setCoberturas(data);
      }catch(error){
        console.log(error)
      }
  };

  function calcParcelas(valorRisco, qtParcelas){
    const valor = valorRisco / qtParcelas
    console.log(usuario)
    return valor.toFixed(2)

  }

  function calcValorPagoSegurado(valorRisco){
    let valor = valorRisco * 0.05
    valor = valor.toFixed(2)
    setUsuario({
      ...usuario,
      valorPagoSegurado: valor,
    })
    console.log(usuario)

    return valor;
  }

  function limparForm(event){
    
    event.preventDefault()
    setUsuario({
      cpf:''
    })

    fieldset.removeAttribute('disabled')
    setExibeProposta(false)
  }

  function avancarForm(event){
    event.preventDefault()
    fieldset.setAttribute('disabled','')
    calcValorPagoSegurado(usuario.valorRisco)
    setExibeProposta(true)
    console.log(usuario)
  }

  function enviarForm(event){
    event.preventDefault()
    console.log(usuario)
  }

  const coberturaMap = coberturas.map((item) => {
    return <option value={item._id} > {item.nome}</option>

  })

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
        <input 
          type="text" 
          name="nome" 
          className="campoTexto w100" 
          placeholder="ex.: José Santos Silva" 
          onChange={(event) => setUsuario({...usuario, nome: event.target.value})}   
          required 
        />    
        
        <label htmlFor="cpf" className="labelTexto">CPF</label>
        <CpfMask 
          value={usuario.cpf} 
          onChange={(event) => setUsuario({...usuario, cpf: event.target.value})}   
        />
        
        <label htmlFor="terminoVigencia" className="labelTexto">Termino da Vigência</label>
        <TerminoVigencia 
          value={usuario.terminoVigencia} 
          onChange={(event) => setUsuario({...usuario, terminoVigencia: event.target.value})} 
          placeholder="ex R$10.000,00" 
        />

        <label htmlFor="valorRisco" className="labelTexto" >Valor em risco</label>
        <input 
          type="number" 
          name="valorRisco" 
          value={usuario.valorRisco} 
          onChange={(event) => setUsuario({...usuario, valorRisco: event.target.value})} 
          className="campoTexto w30" 
          min="5000" max="1000000" 
          placeholder="ex.: R$10.000,00" 
          required 
        />    
      
        <label htmlFor="cobertura" className="labelTexto" >Tipo da cobertura</label>
        <select
         className="campoTexto w70"
         value={usuario.cobertura}
         onChange={(evento) => setUsuario({...usuario, cobertura: evento.target.value})}
         required
        >
          {coberturaMap}
        </select>

      </fieldset>

      {/* Proposta */}
      {
        exibeProposta &&

      <fieldset id="pagamento-fieldset" className="cotacao-fieldset" >
        <legend>Forma de pagamento</legend>
        <p>Valor a vista: <strong>R${usuario.valorPagoSegurado}</strong> </p>
        <p>Valor parcelado:</p>
        <select 
          className="campoTexto w50" 
          value={usuario.qtParcelas} 
          onChange={(evento) => setUsuario({...usuario, qtParcelas: evento.target.value})}
        >
          <option value="0" > A vista: R$ {usuario.valorPagoSegurado} </option>
          <option value="1" > Parcelado 1x: R$ {calcParcelas(usuario.valorPagoSegurado,1)} </option>
          <option value="2" > Parcelado 2x: R$ {calcParcelas(usuario.valorPagoSegurado,2)} </option>
          <option value="3" > Parcelado 3x: R$ {calcParcelas(usuario.valorPagoSegurado,3)} </option>
          <option value="4" > Parcelado 4x: R$ {calcParcelas(usuario.valorPagoSegurado,4)} </option>
          <option value="5" > Parcelado 5x: R$ {calcParcelas(usuario.valorPagoSegurado,5)} </option>
          <option value="6" > Parcelado 6x: R$ {calcParcelas(usuario.valorPagoSegurado,6)} </option>
          <option value="7" > Parcelado 7x: R$ {calcParcelas(usuario.valorPagoSegurado,7)} </option>
          <option value="8" > Parcelado 8x: R$ {calcParcelas(usuario.valorPagoSegurado,8)} </option>
          <option value="9" > Parcelado 9x: R$ {calcParcelas(usuario.valorPagoSegurado,9)} </option>
          <option value="10" > Parcelado 10x: R$ {calcParcelas(usuario.valorPagoSegurado,10)} </option>
          <option value="11" > Parcelado 11x: R$ {calcParcelas(usuario.valorPagoSegurado,11)} </option>
          <option value="12" > Parcelado 12x: R$ {calcParcelas(usuario.valorPagoSegurado,12)} </option>
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
