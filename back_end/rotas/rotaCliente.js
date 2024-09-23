import { Router } from "express";
import ClienteCtrl from "../controle/clienteCtrl.js"

const cliCtrl = new ClienteCtrl();
const rotaCliente = new Router();

rotaCliente.get("/", cliCtrl.consultar)
.get("/:termo", cliCtrl.consultar)
.post("/", cliCtrl.gravar)
.put("/", cliCtrl.atualizar)
.patch("/", cliCtrl.atualizar)
.delete("/", cliCtrl.excluir);

export default rotaCliente;