import React, { useEffect, useState } from "react";
import { Container, Paper, Typography } from "@mui/material";
import http from '../servicos/http.js'
import ItemProposta from '../componentes/ItemProposta'


function Propostas() {

  const [n_cotacao, setNCotacao] = useState(0)
  const [id_proposta, setId_proposta] = useState(0)
  const [cotacoes, setCotacoes] = useState([])
  const [proposta, setProposta] = useState({})


  useEffect(()=>{
    const storaged = JSON.parse(localStorage.getItem('n_cotacao'))
    setNCotacao(storaged)
  },[])

  useEffect(()=>{
    const getCotacoes = async () => {
      try{
        const {data} = await http.get('cotacoes')
        // console.log(data)
        setCotacoes(data);
      }catch(error){
        console.error(error)
      }
    };  
    getCotacoes()
    
  },[])

  useEffect(() =>{

    const mapCotacoes = () => {
      const map = cotacoes.map(
        (item) => n_cotacao === item.n_cotacao ? 
          setId_proposta(item._id) : 
          console.log("nao encontrou") )

      return map
    }
    mapCotacoes()
    getCotacaoID()

    console.log(proposta)
  },[])
  
  const getCotacaoID = async () => {
    try{
      const {data} = await http.get(`cotacoes/${id_proposta}`)
      // console.log(data)
      setProposta(data);
    }catch(error){
      console.error(error)
    }
  };  


  return (
    <Container maxWidth="lg">
      <Paper>

      <Typography component='h1' variant='h5' textAlign='center'>
          Propostas
      </Typography>
      <ItemProposta info={proposta} />


{/* vn_cotacaon_cotacaon_cotacaon_cotacao

  function calcParcelas(valorRisco, qtParcelas){
    const valor = valorRisco / qtParcelas
    return valor.toFixed(2)

  }

    function calcValorPagoSegurado(valorRisco){
    let valor = valorRisco * 0.05
    valor = valor.toFixed(2)
    setUsuario({
      ...usuario,
      valorPagoSegurado: valor,
    })

    return valor;
  }

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
*/}
      </Paper>
    </Container>
  );
}

export default Propostas;
