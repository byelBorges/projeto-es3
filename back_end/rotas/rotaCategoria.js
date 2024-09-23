import { Router } from "express";
import CategoriaCtrl from "../controle/categoriaCtrl.js";

//Rotas é o mapeamento das requisições da web para um determinado endpoint da aplicação

const catCtrl = new CategoriaCtrl()
const rotaCategoria = new Router();

rotaCategoria.get("/", catCtrl.consultar)
.get('/:termo', catCtrl.consultar)//termo é o nome do parametro que obteremos no Ctrl(Ex: params.termo)
.post('/', catCtrl.gravar)
.patch('/', catCtrl.atualizar)
.put('/', catCtrl.atualizar)
.delete('/', catCtrl.excluir);
//A rota aqui dentro é como se fosse uma microaplicação

export default rotaCategoria;