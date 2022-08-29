import { Container , Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BuscaCobertura from '../componentes/buscaCobertura'


import http from '../servicos/http.js'

function CriarCotacao() {
  
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [coberturas, setCoberturas] = useState([])
  const [contador, setContador] = useState([])
  const [ minMaxVigencia , setMinMaxVigencia] = useState({})


  const [cotacao, setCotacao] = useState({
    n_cotacao: undefined,
    nome: '',
    cpf: '',
    inicioVigencia: '',
    terminoVigencia: '',
    valorRisco: null,
    cobertura: '',
    nomeCobertura: ''
  })

  useEffect(()=>{

    const getCoberturas = async () => {
      try{
        const {data} = await http.get('coberturas')
        setCoberturas(data);
        setLoading(false)
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

        setCotacao({
          ...cotacao,
          n_cotacao: data[0].n_cotacao,
          inicioVigencia: dataVigencia(),
        })
      }catch(error){
        console.log(error)
      }
    };
    getNumCotacao()

  },[])

  useEffect(()=>{

    function dataVigencia(){
      var now = new Date();
      const min = new Date(now.getFullYear() + 5, now.getMonth(), now.getDate() + 1)
      const max = new Date(now.getFullYear() + 10, now.getMonth(), now.getDate() + 1)
      const minDate = `${min.getFullYear()}-${String(min.getMonth()).padStart(2,'0')}-${min.getDate()}`
      const maxDate = `${max.getFullYear()}-${String(max.getMonth()).padStart(2,'0')}-${max.getDate()}`
      setMinMaxVigencia({
        min: minDate,
        max: maxDate
      })      
      
    }
    dataVigencia()
  },[])
 

  function editCotacao(){
    const novoContador = contador + 1
    http.put(`/contadores/630671a2b3dfa66834b7a2f2/`, {
      n_cotacao: novoContador,
    })
  }


  function limparForm(event){
    
    event.preventDefault()
    setCotacao({
      cpf:''
    })

  }

  const coberturaMap = coberturas.map((item) => {
    return <option key={item._id} value={item._id} > {item.nome}</option>
  })

  function setIDCobertura(evento){
    const coberturaID = evento
    coberturas.map((item) => coberturaID === item._id ? 
    setCotacao({...cotacao, nomeCobertura: item.nome, cobertura: coberturaID}) : 
    "" )

  }

  function descricaoCobertura(id){
    const coberturaID = id
    let desc = ''
    coberturas.map((item) => coberturaID === item._id ? 
    desc = item.descricao : '' )
    return desc
  }
  function postCotacao(){
    //funcao assincrona
    http
    .post('/cotacoes/', {
      //posso passasro obj somente "cotacao"
      //nome banco  :  nome cotacao
      nome: cotacao.nome,
      n_cotacao: cotacao.n_cotacao,
      cpf: cotacao.cpf,
      terminoVigencia: cotacao.terminoVigencia,
      valorRisco: cotacao.valorRisco,
      cobertura: cotacao.cobertura,

    })
    .then(() => console.log('cotacao postada'));
  }

  function setCpf(event){
    // const str = event.target.value
    const somenteNumeros = event.target.value.replace(/[^0-9]/g, '')
    setCotacao({
      ...cotacao,
      cpf: somenteNumeros
    })
  
  }
  function saveLocalStorage(){
    localStorage.setItem('n_cotacao', JSON.stringify(cotacao.n_cotacao))

  }
  function enviarForm(event){
    event.preventDefault()
    editCotacao()
    saveLocalStorage()
    console.log(cotacao)
    postCotacao()
    navigate(`/propostas/?${cotacao.n_cotacao}`);

  }

  if(loading){
    return(
      <Container maxWidth="lg">
        <>
          <Typography component='h1' variant='h5' textAlign='center'>
              Loading
          </Typography>
        </>
      </Container>
    )
  }
  return (
    <Container maxWidth="lg">
      <>

      <Typography component='h1' variant='h5' textAlign='center'>
          Formulario de Cotação
      </Typography>

      <form className="form" onSubmit={enviarForm} >
      <fieldset id="cotacao-fieldset" className="cotacao-fieldset">
        <legend>Dados para cotação</legend>
        
        <div className="flex flex-centro">
        <p className="m10"> Número da cotação:</p>
        <span className="num-cotacao"> {cotacao.n_cotacao} </span>
        </div>

        <label htmlFor="nome" className="labelTexto" >Nome</label>
        <input 
          type="text" 
          name="nome" 
          className="campoTexto w100" 
          placeholder="ex.: José Santos Silva" 
          value={cotacao.nome}
          onChange={(event) => setCotacao({...cotacao, nome: event.target.value})}   
          required 
        />    
        
        <label htmlFor="cpf" className="labelTexto">CPF</label>
        

        <input 
          type="text" 
          minLength={11}
          maxLength={11}
          onChange={(evento) => setCpf(evento)} 
          className="campoTexto w30" 
          placeholder="ex.: 123.456.789-99"
     
        />

        <label htmlFor="inicioVigencia" className="labelTexto">Início da Vigência</label>
        <p className="campoTexto w30">{cotacao.inicioVigencia}</p>

        <label htmlFor="terminoVigencia" className="labelTexto">Termino da Vigência</label>
        <input 
          type="date" 
          className="campoTexto w30" 
          value={cotacao.terminoVigencia} 
          onChange={(event) => setCotacao({...cotacao, terminoVigencia: event.target.value})} 
          min={minMaxVigencia.min} 
          max={minMaxVigencia.max}
          
          />
        
        <label htmlFor="valorRisco" className="labelTexto" >Valor em risco</label>
        <input 
          type="number" 
          name="valorRisco" 
          value={cotacao.valorRisco} 
          onChange={(event) => setCotacao({...cotacao, valorRisco: event.target.value})} 
          className="campoTexto w30" 
          min="5000.00" max="1000000.00"
          step="0.01"
          placeholder="ex.: R$10.000,00" 
          required 
        />
      
        <label htmlFor="cobertura" className="labelTexto" >Tipo da cobertura</label>
        <select
         className="campoTexto w70"
         value={cotacao.cobertura} 
         onChange={(e) => setIDCobertura(e.target.value)}
         required
        >
          <option defaultValue >Selecione a cobertura</option>
          {coberturaMap}

        </select>
          <p className="descCobertura">
            {descricaoCobertura(cotacao.cobertura)}
          </p>  
        

      </fieldset>

      {/* Proposta */}

            
        <div className="container-btn">
          <button className="btn-limpar" onClick={(event) => limparForm(event)} >Limpar</button>
          <button className="btn-elaborar" type="submit" >Elaborar proposta</button>
 
             
        </div>
      </form>

      </>
    </Container>
  );
}

export default CriarCotacao;
