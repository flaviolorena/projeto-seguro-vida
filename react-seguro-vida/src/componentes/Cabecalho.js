import React from "react";
import { Link } from "react-router-dom";

function Cabecalho() {
  return (
    <header>
      <nav>
        <ul className="flex flex-centro cor cabecalho">
          <li> <Link className="item__cabecalho"  to="/">Criar Cotação</Link> </li>
          <li> <Link className="item__cabecalho" to="/sobre">Sobre</Link> </li>
        </ul>
      </nav>
    </header>
  );
}

export default Cabecalho;
