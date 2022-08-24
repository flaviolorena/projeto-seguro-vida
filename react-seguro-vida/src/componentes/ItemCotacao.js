import { Paper } from "@mui/material";
import React from "react";

function ItemCotacao(props) {
  return (
    <Paper className="item-cotacoes">
        <div className="campoCotacao">
          <p>Nome: </p>
          <p className="valorCotacao"> {props.info.nome} </p> 
        </div>
        <div className="campoCotacao">
          <p>CPF:</p>
        <p className="valorCotacao"> {props.info.cpf} </p> 
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
          <p>Quantidade de parcelas:</p>
          <p className="valorCotacao"> {props.info.qtParcelas} </p> 
        </div>
        <div className="campoCotacao">
          <p>Valor pago pelo segurado:</p>
          <p className="valorCotacao"> R${props.info.valorPagoSegurado} </p> 
        </div>
        <div className="campoCotacao">
          <p>Tipo da cobertura:</p>
          <p className="valorCotacao"> {props.info.nomeCobertura} </p> 
        </div>
    </Paper>

  );
}

export default ItemCotacao;
