import React, { useEffect, useState } from "react";
import { Container, Paper, Typography } from "@mui/material";
import http from '../servicos/http.js'

import ItemApolice from "../componentes/ItemApolice";

function Cotacoes() {
  const [apolices, setApolices] = useState([])
  const [loading, setLoading] = useState(true)

  const getData = () =>{
    const getApolices = async () => {
      try{
        const {data} = await http.get('apolices/')
        setApolices(data);
        setLoading(false)
      }catch(error){
        console.error(error)
      }
    }
    getApolices()
  }

  useEffect(()=>{
    getData()
  },[])
  const itemCotacao = apolices.map((item) => <ItemApolice info={item}/>)

  

if(loading){
  return (
    <Container maxWidth="lg">
      <Paper>

      <Typography component='h1' variant='h5' textAlign='center'>
          Carregando...
      </Typography>

      </Paper>
    </Container>
  );

}

  return (
    <Container maxWidth="lg">
      <Paper>

      <Typography component='h1' variant='h5' textAlign='center'>
          Lista de Apolices
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
