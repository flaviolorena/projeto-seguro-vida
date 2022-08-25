import { Container, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

import http from '../servicos/http.js'
import CpfMask  from "../componentes/cpfMask.js";
import TerminoVigencia  from "../componentes/dataMask.js";

function CriarCotacao() {
  

  const [usuario, setUsuario] = useState({
    n_cotacao: undefined,
    nome: '',
    cpf: '',
    inicioVigencia: '',
    terminoVigencia: '',
    valorRisco: null,
    cobertura: '',
    nomeCobertura: ''

  })


  const [coberturas, setCoberturas] = useState([])

  const [contador, setContador] = useState([])

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
    
  },[])


  useEffect(()=>{
    function dataVigencia(){
        const now = new Date()
        const date = now.getDate() + 1
        const month = now.getMonth()
        const year = now.getFullYear()
        return `${date}/${month}/${year}`
    }
    const getNumCotacao = async () => {

      try{
        const { data } = await http.get('contadores')
        setContador(data[0].n_cotacao);

        setUsuario({
          ...usuario,
          n_cotacao: data[0].n_cotacao,
          inicioVigencia: dataVigencia(),
        })
      }catch(error){
        console.log(error)
      }
    };
    getNumCotacao()

  },[])
 

  function editCotacao(){
    const novoContador = contador + 1
    http.put(`/contadores/630671a2b3dfa66834b7a2f2/`, {
      n_cotacao: novoContador,
    })
  }


  function limparForm(event){
    
    event.preventDefault()
    setUsuario({
      cpf:''
    })

  }

  const coberturaMap = coberturas.map((item) => {
    return <option key={item._id} value={item._id} > {item.nome}</option>
  })



  function setIDCobertura(evento){
    const coberturaID = evento
    coberturas.map((item) => coberturaID === item._id ? setUsuario({...usuario, nomeCobertura: item.nome, cobertura: coberturaID}) : console.log("nao encontrou") )

  }



  function postCotacao(){
    http
    .post('/cotacoes/', {
      //nome banco  :  nome usuario
      nome: usuario.nome,
      n_cotacao: usuario.n_cotacao,
      cpf: usuario.cpf,
      terminoVigencia: usuario.terminoVigencia,
      valorRisco: usuario.valorRisco,
      cobertura: usuario.cobertura,

    })
    .then(() => console.log('cotacao postada'));
  }
  function saveLocalStorage(){

    const storaged = JSON.parse(localStorage.getItem('proposta'))
    let dados = localStorage.getItem('proposta') !== null ? storaged : [] 
    dados.push(usuario)
    localStorage.setItem('proposta', JSON.stringify(dados))
    console.log(usuario.n_cotacao)
    localStorage.setItem('n_cotacao', JSON.stringify(usuario.n_cotacao))

  }
  function enviarForm(event){
    event.preventDefault()
    // console.log(usuario)
    editCotacao()
    saveLocalStorage()
    postCotacao()
  }

  return (
    <Container maxWidth="lg">
      <Paper>

      <Typography component='h1' variant='h5' textAlign='center'>
          Formulario de Cotação
      </Typography>

      <form className="form" onSubmit={enviarForm} >
      <fieldset id="cotacao-fieldset" className="cotacao-fieldset">
        <legend>Dados para cotação</legend>
        
        <div className="flex flex-centro">
        <p className="m10"> Número da cotação:</p>
        <span className="num-cotacao"> {usuario.n_cotacao} </span>
        </div>

        <label htmlFor="nome" className="labelTexto" >Nome</label>
        <input 
          type="text" 
          name="nome" 
          className="campoTexto w100" 
          placeholder="ex.: José Santos Silva" 
          value={usuario.nome}
          onChange={(event) => setUsuario({...usuario, nome: event.target.value})}   
          required 
        />    
        
        <label htmlFor="cpf" className="labelTexto">CPF</label>
        <CpfMask 
          value={usuario.cpf} 
          onChange={(event) => setUsuario({...usuario, cpf: event.target.value})}   
        />

        <label htmlFor="inicioVigencia" className="labelTexto">Início da Vigência</label>
        <p className="campoTexto w30">{usuario.inicioVigencia}</p>

        <label htmlFor="terminoVigencia" className="labelTexto">Termino da Vigência</label>
        <TerminoVigencia 
          value={usuario.terminoVigencia} 
          onChange={(event) => setUsuario({...usuario, terminoVigencia: event.target.value})} 
          placeholder="ex R$10.000,00" 
        />

        <label htmlFor="valorRisco" className="labelTexto" >Valor em risco</label>
        <input 
          type="number" 
          name="valorRisco" 
          value={usuario.valorRisco} 
          onChange={(event) => setUsuario({...usuario, valorRisco: event.target.value})} 
          className="campoTexto w30" 
          min="5000" max="1000000"
          placeholder="ex.: R$10.000,00" 
          required 
        />
      
        <label htmlFor="cobertura" className="labelTexto" >Tipo da cobertura</label>
        <select
         className="campoTexto w70"
         value={usuario.cobertura} 
         onChange={(e) => setIDCobertura(e.target.value)}
         required
        >
          <option defaultValue >Selecione a cobertura</option>
          {coberturaMap}

        </select>

      </fieldset>

      {/* Proposta */}

        <div className="container-btn">
          <button className="btn-limpar" onClick={(event) => limparForm(event)} >Limpar</button>
          <button className="btn-elaborar" type="submit" >Elaborar proposta</button>
        </div>
      </form>

      </Paper>
    </Container>
  );
}

export default CriarCotacao;
