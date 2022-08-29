/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import http from '../servicos/http.js'
import ItemProposta from '../componentes/ItemProposta'


function Propostas() {
  //estado nao esta setando no tempo correto
  // const [n_cotacao, setN_cotacao] = useState(null)

  let n_cotacao = null
  const [proposta, setProposta] = useState({})
  const [loading, setLoading] = useState(true)
  
  // useEffect(()=>{
  //   console.log(`cotacao em state: ${n_cotacao}`)
  // },[])

  useEffect(() =>{
    getNomeCobertura()
  },[])

  const getNomeCobertura = async () => {
    try {
      console.log(window.location.search)
      // await setN_cotacao((window.location.search).replace('?',''))
      n_cotacao = window.location.search.replace('?','')
      console.log(n_cotacao)
      getProposta()
    } catch (error) {
      console.error(error)
    }
  }

  // function getNomeCobertura(){
  //   const numCotacao = window.location.search
  //   setN_cotacao(numCotacao)
  //   console.log(`recebido num cotacao: ${n_cotacao}`)
  // }

  const getProposta = async () => {
    try{
      const {data} = await http.get(`propostas/busca/?n_proposta=${n_cotacao}`)
      console.log(data[0])
      setProposta(data[0]);
      setLoading(false)
    }catch(error){
      console.error(error)
    }
  };  

  function enviarProposta(event){
    event.preventDefault()
    console.log(proposta)
  }


  if(loading){
    return(
      <Container maxWidth="lg">
        <>

        <Typography component='h1' variant='h5' textAlign='center'>
            Carregando...
        </Typography>
        </>
      </Container>

    )
  }

  if(!loading){

    function calcParcelas(valorRisco, qtParcelas){
      const valor = valorRisco / qtParcelas
      return valor.toFixed(2)
  
    }

    return (
      <Container maxWidth="lg">
      

        <Typography component='h1' variant='h5' textAlign='center'>
            Propostas
        </Typography>
        <ItemProposta info={proposta} />
        
        {/* Pagamento */}

        <div>
          <form className="form" onSubmit={enviarProposta} >
            <fieldset id="pagamento-fieldset" className="cotacao-fieldset" >
            <legend>Forma de pagamento</legend>
            <p>Valor a vista: <strong>R${proposta.valorPago}</strong> </p>
            <p>Valor parcelado:</p>
              <select 
                className="campoTexto w50" 
                value={proposta.qtParcelas} 
                onChange={(evento) => setProposta({...proposta, qtParcelas: Number(evento.target.value)})}
              >
                <option value="0" > A vista: R$ {proposta.valorPago} </option>
                <option value="1" > Parcelado 1x: R$ {calcParcelas(proposta.valorPago,1)} </option>
                <option value="2" > Parcelado 2x: R$ {calcParcelas(proposta.valorPago,2)} </option>
                <option value="3" > Parcelado 3x: R$ {calcParcelas(proposta.valorPago,3)} </option>
                <option value="4" > Parcelado 4x: R$ {calcParcelas(proposta.valorPago,4)} </option>
                <option value="5" > Parcelado 5x: R$ {calcParcelas(proposta.valorPago,5)} </option>
                <option value="6" > Parcelado 6x: R$ {calcParcelas(proposta.valorPago,6)} </option>
                <option value="7" > Parcelado 7x: R$ {calcParcelas(proposta.valorPago,7)} </option>
                <option value="8" > Parcelado 8x: R$ {calcParcelas(proposta.valorPago,8)} </option>
                <option value="9" > Parcelado 9x: R$ {calcParcelas(proposta.valorPago,9)} </option>
                <option value="10" > Parcelado 10x: R$ {calcParcelas(proposta.valorPago,10)} </option>
                <option value="11" > Parcelado 11x: R$ {calcParcelas(proposta.valorPago,11)} </option>
                <option value="12" > Parcelado 12x: R$ {calcParcelas(proposta.valorPago,12)} </option>
              </select>
            </fieldset>
            <button className="btn-elaborar" type="submit" >Elaborar apolice</button>

          </form>
        </div>
      </Container>
    );
  }


{/* vn_cotacaon_cotacaon_cotacaon_cotacao




*/}
 
}

export default Propostas;
