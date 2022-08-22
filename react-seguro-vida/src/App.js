import React from 'react';
import './assets/base.css'
import { Routes, Route } from 'react-router-dom';
import CriarCotacao from './paginas/CriarCotacao.js';
import Sobre from './paginas/Sobre';
import Cabecalho from './componentes/Cabecalho';
import { Container } from '@mui/system';

function App() {
	return (
    <>

			<Cabecalho/>
    <Container maxWidth="lg" sx={{marginTop: "80px"}}>
      <Routes>
        <Route path='/' element={<CriarCotacao/>} />
        <Route path='sobre' element={<Sobre/>} />
      </Routes>
    </Container>
    </>
	);
}

export default App;
