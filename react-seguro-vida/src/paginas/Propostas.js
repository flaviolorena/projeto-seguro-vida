import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import http from '../servicos/http.js'
import ItemProposta from '../componentes/ItemProposta'


function Propostas() {

  const [n_cotacao, setN_cotacao] = useState(18)
  const [proposta, setProposta] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    setN_cotacao((window.location.search).replace('?',''))

  },[]) 
  // const params = useParams()



  useEffect(() =>{
    getProposta()
  },[])

  const getProposta = async () => {
    try{
      const {data} = await http.get(`propostas/busca/?n_proposta=${n_cotacao}`)
      console.log(data)
      setProposta(data[0]);
      setLoading(false)
    }catch(error){
      console.error(error)
    }
  };  


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

  return (
    <Container maxWidth="lg">
      <>

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
      </>
    </Container>
  );
}

export default Propostas;
