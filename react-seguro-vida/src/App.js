import React from 'react';
import './assets/base.css'
import { Routes, Route } from 'react-router-dom';
import CriarCotacao from './paginas/CriarCotacao.js';
import Cotacoes from './paginas/Cotacoes';
import Propostas from './paginas/Propostas';
import Apolices from './paginas/Apolices';
import Cabecalho from './componentes/Cabecalho';
import { Container } from '@mui/system';

function App() {
	return (
    <>

			<Cabecalho/>
    <Container maxWidth="lg" sx={{marginTop: "80px"}}>
      <Routes>
        <Route path='/' element={<CriarCotacao/>} />
        <Route path='cotacoes' element={<Cotacoes/>} />
        <Route path='propostas/' element={<Propostas/>} />
        <Route path='apolices/' element={<Apolices/>} />
      </Routes>
    </Container>
    </>
	);
}

export default App;
