import React, { useEffect, useState } from "react";
import { Container, Paper, Typography } from "@mui/material";

import ItemCotacao from "../componentes/ItemCotacao";

function Cotacoes() {
  const [storaged, setStoraged] = useState([])
  
  const getData = () =>{
    const data = JSON.parse(localStorage.getItem('proposta'))
    setStoraged(data)
    console.log(storaged)
  }

  useEffect(()=>{
    getData()
  },[])
 
 
  const itemCotacao = storaged.map((item) => <ItemCotacao info={item}/>)


  return (
    <Container maxWidth="lg">
      <Paper>

      <Typography component='h1' variant='h5' textAlign='center'>
          Lista de cotações
      </Typography>

      <div className="lista-cotacoes">
        <div className="item-cotacoes">
          {itemCotacao}
        </div>
      </div>

      </Paper>
    </Container>
  );
}

export default Cotacoes;
