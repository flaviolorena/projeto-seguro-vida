import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import http from '../servicos/http.js'

function ItemProposta(props) {
  const idCobertura = props.info.cobertura
  const [coberturas, setCoberturas] = useState([])
  const [nomeCobertura, setNomeCobertura] = useState('')

  useEffect(()=>{
    const getCoberturas = async () => {
      try{
        const {data} = await http.get('coberturas')
        console.log(data)
        setCoberturas(data);
      }catch(error){
        console.error(error)
      }
    };  
    getCoberturas()
    getNomeCobertura()
    
  },[])

  function getNomeCobertura(){
    console.log(`ID cobertura: ${idCobertura}`)
    coberturas.map((item) =>{
      return idCobertura === item._id ?
        setNomeCobertura(item.nome) :
        console.error("erro get nome")
    })
  }

  return (
    <Paper className="item-cotacoes">
        <div className="campoCotacao">
          <p>Número da proposta: </p>
          <p className="valorCotacao"> {props.info.n_cotacao} </p> 
        </div>
        <div className="campoCotacao">
          <p>Nome: </p>
          <p className="valorCotacao"> {props.info.nome} </p> 
        </div>
        <div className="campoCotacao">
          <p>CPF:</p>
        <p className="valorCotacao"> {props.info.cpf} </p> 
        </div>
        <div className="campoCotacao">
          <p>Início de vigência do seguro:</p>
          <p className="valorCotacao"> {props.info.inicioVigencia} </p> 
        </div>        
        <div className="campoCotacao">
          <p>Término de vigência do seguro:</p>
          <p className="valorCotacao"> {props.info.terminoVigencia} </p> 
        </div>
        <div className="campoCotacao">
          <p>Valor de risco:</p>
          <p className="valorCotacao"> R${props.info.valorRisco} </p> 
        </div>           
        <div className="campoCotacao">
          <p>Valor a ser pago pelo segurado:</p>
          <p className="valorCotacao"> R${props.info.valorPagoSegurado} </p> 
        </div>   
        <div className="campoCotacao">
          <p>Tipo da cobertura:</p>
          <p className="valorCotacao"> {nomeCobertura} </p> 
        </div>
    </Paper>

  );
}

export default ItemProposta;
