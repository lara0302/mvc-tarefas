const express = require("express");
const router = express.Router();
const moment = require("moment");
moment.locale("pt-br");
//requisição do Model
// usar a chave e o mesmo nome do objeto exportado
const {tarefasModel} = require("../models/tarefasModel"); //sempre usar o {}

router.get("/", async function (req, res) {
    res.locals.moment = moment;
    try{
        const linhas = await tarefasModel.findAll();
        res.render("pages/index", {listaTarefas:linhas});
    }catch(erro){
        console.log(erro);
    }
});


router.get("/cadastro", (req, res)=>{
    res.render("pages/cadastro");
});

router.post("/cadastro", async(req, res)=>{
    const dados = {
        nome: req.body.tarefa,
        prazo: req.body.prazo,
        situacao: req.body.situacao
    }

    try{
        const insert = await tarefasModel.create(dados);
        console.log(insert);
        res.redirect("/");
    }catch(erro){
        console.log(erro)
    }
})

router.get("/teste-insert", async (req, res)=>{
    
    const dados = {
        nome:"instalar o MySQL no lab 3 e lab 4",
        prazo:"2026-03-18"
    }
    try{
        const resultado = await tarefasModel.create(dados);
        res.send(resultado);
    }catch(erro){
        console.log(erro);
    }

});

router.get("/teste-delete", async (req, res) => {

})

router.get("/teste-delete-logico", async (req, res) => {

});

module.exports = router;