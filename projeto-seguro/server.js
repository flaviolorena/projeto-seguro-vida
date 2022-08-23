import app from './src/app.js';

const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(`Funcionando na porta ${port} , execute em http://localhost:${port}`);
});