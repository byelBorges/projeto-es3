import { Router } from "express";
import ProdutoCtrl from "../controle/produtoCtrl.js";

const prodCtrl = new ProdutoCtrl();
const rotaProduto = new Router();

rotaProduto.get('/', prodCtrl.consultar)
.get('/:termo', prodCtrl.consultar)
.post('/observar', prodCtrl.observarProduto)
.post('/', prodCtrl.gravar)
.patch('/', prodCtrl.atualizar)
.put('/', prodCtrl.atualizar)
.delete('/', prodCtrl.excluir);

export default rotaProduto;