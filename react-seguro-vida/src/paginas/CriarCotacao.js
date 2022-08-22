import { Container, Paper, Typography } from "@mui/material";
import CpfMask  from "../componentes/cpfMask.js";
import TerminoVigencia  from "../componentes/dataMask.js";
import React, { useState } from "react";


function CriarCotacao() {

  const [usuario, setUsuario] = useState({
    cpf: '',
    terminoVigencia: '',
  })
  console.log(usuario)

  function limparForm(event){
    event.preventDefault()
    console.log(event)
    setUsuario({
      cpf:''
    })
  }

  return (
    <Container maxWidth="lg">
      <Paper>

      <Typography component='h1' variant='h5' textAlign='center'>
          Formulario de Cotação
      </Typography>

      <form className="form">

        <label for="nome" className="labelTexto" >Nome</label>
        <input type="text" name="nome" className="campoTexto w100" placeholder="ex.: José Santos Silva"  />    
        
        <label for="cpf" className="labelTexto">CPF</label>
        <CpfMask value={usuario.cpf} onChange={(event) => setUsuario({cpf: event.target.value})}   />
        
        <label for="terminoVigencia" className="labelTexto">Termino da Vigência</label>
        <TerminoVigencia value={usuario.terminoVigencia} onChange={(event) => setUsuario({terminoVigencia: event.target.value})} placeholder="ex R$10.000,00" />
        {/* <input type="text" name="terminoVigencia" className="campoTexto" maxlength="6" id="cpf"/> */}
        
 
        <label for="valorRisco" className="labelTexto" >Valor em risco</label>
        <input type="number" name="valorRisco" className="campoTexto w50" min="5000" max="1000000" placeholder="ex.: R$10.000,00" />    

        <div className="container-btn">
          <button className="btn-limpar" onClick={(event) => limparForm(event)} >Limpar</button>
          <button className="btn-enviar" onClick={(event) => limparForm(event)} >Avançar</button>
        </div>
      </form>

      </Paper>
    </Container>
  );
}

export default CriarCotacao;
