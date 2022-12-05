// Requer módulo
const express = require('express');
const mysql = require('mysql2');
const connect = require('./conexao.js');

// Criando objeto express
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Processando a solicitação GET
app.get('/', (req, res) => {
    res.send('Um aplicativo Node simples é ' + 'rodando neste servidor')
    res.end()
})
// Processando a solicitação Listando pacientes (GET)
app.get('/pacientes', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return connect.execSQLQuery('select * from pacientes', res);
})

// Processando a solicitação (GET - Pelo o Id)
app.get('/pacientes/:id', (req, res) => {
    return connect.execSQLQuery('select * from pacientes where id='+ req.params.id, res);
})

// Processando a solicitação (PUT - Alturação de dados)
app.put('/pacientes/:id', (req, res) => {
    return connect.execSQLQuery("update pacientes set nome='"+req.body.nome+"' where id="+req.params.id, res);
})

// Processando a solicitação (POST - Inserção de Dados)
app.post('/pacientes/', (req, res) => {
    return connect.execSQLQuery("insert into pacientes (nome) value('"+req.body.nome+"')", res);
})

// Processando a solicitação (DELETE)
app.delete('/pacientes/:id', (req, res) => {
    return connect.execSQLQuery("delete from pacientes where id="+ req.params.id, res);
})


// Número da porta
const PORT = process.env.PORT || 5000;

// Configuração do Servidor
app.listen(PORT, console.log(
    `Server started on port ${PORT}`));