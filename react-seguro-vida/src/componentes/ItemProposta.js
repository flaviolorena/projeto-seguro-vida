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
        setCoberturas(data);
      }catch(error){
        console.error(error)
      }
    };  
    getCoberturas()
    getNomeCobertura()

    
  },[])

  function getNomeCobertura(){
    coberturas.map((item) =>{
      return idCobertura === item._id ?
        setNomeCobertura(item.nome) :
        console.error("erro get nome")
    })
  }
  const dataFormat = (data) =>{
    let dataObj = new Date(data);
    return `${dataObj.getDate()}/${dataObj.getMonth()+1}/${dataObj.getFullYear()}`

  } 
  // function dataFormat(data){
  //   // console.log(data)
  //   let dataObj = new Date(data);
  //   console.log(dataObj.getMonth())
  //   return `${dataObj.getDate()}/${dataObj.getMonth()}/${dataObj.getFullYear()}`

  // }

  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


  return (
    <Paper className="item-cotacoes">
        <div className="campoCotacao">
          <p>Número da proposta: </p>
          <p className="valorCotacao"> {props.info.n_proposta} </p> 
        </div>
        <div className="campoCotacao">
          <p>Nome: </p>
          <p className="valorCotacao"> {props.info.nome}  </p> 
        </div>
        <div className="campoCotacao">
          <p>CPF:</p>
        <p className="valorCotacao"> {props.info.cpf} </p> 
        </div>
        <div className="campoCotacao">
          <p>Início de vigência do seguro:</p>
          <p className="valorCotacao"> {dataFormat(props.info.inicioVigencia)} </p> 
        </div>        
        <div className="campoCotacao">
          <p>Término de vigência do seguro:</p>
          <p className="valorCotacao"> {dataFormat(props.info.terminoVigencia)} </p> 
        </div>
        <div className="campoCotacao">
          <p>Valor de risco:</p>
          <p className="valorCotacao"> R${props.info.valorRisco} </p> 
        </div>           

        <div className="campoCotacao">
          <p>Tipo da cobertura:</p>
          <p className="valorCotacao"> {nomeCobertura} </p> 
          {/* <p className="valorCotacao"> {makeid(8)}</p>  */}
          
        </div>


    </Paper>

  );
}

export default ItemProposta;
