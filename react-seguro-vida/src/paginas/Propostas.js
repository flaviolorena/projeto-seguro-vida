import React, { useEffect, useState } from "react";
import { Container, Paper, Typography } from "@mui/material";


function Propostas() {
  

  return (
    <Container maxWidth="lg">
      <Paper>

      <Typography component='h1' variant='h5' textAlign='center'>
          Propostas
      </Typography>
{/* 

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
