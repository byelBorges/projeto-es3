//Camada de interface da API que traduz HTTP
import Categoria from "../modelo/categoria.js";
export default class CategoriaCtrl {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const descricao = dados.descricao;
            if (descricao) {
                const categoria = new Categoria(0, descricao);
                categoria.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": categoria.codigo,
                        "mensagem": "Categoria incluída com exito!"
                    });
                }).catch((erro) => {//Quando cai na excessão, JS retorna um objeto, nomeamos esse objeto de "erro" e acessamos seu atributo message
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao inserir categoria:" + erro.message
                    });
                });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor informe a descricao da categoria!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor utilize o método POST para cadastrar uma categoria!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is("application/json")) {
            //Put "troca" o recurso, patch altera um pedaço do recurso
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const descricao = dados.descricao;
            if (codigo && descricao) {
                const categoria = new Categoria(codigo, descricao);
                categoria.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Categoria atualizada com exito!"
                    });
                }).catch((erro) => {//Quando cai na excessão, JS retorna um objeto, nomeamos esse objeto de "erro" e acessamos seu atributo message
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar categoria:" + erro.message
                    });
                });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor informe o codigo e a descricao da categoria!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor utilize o método PUT ou PATCH para atualizar uma categoria!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const categoria = new Categoria(codigo);
                //Resolver a promise
                categoria.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Categoria excluida com exito!"
                    });
                }).catch((erro) => {//Quando cai na excessão, JS retorna um objeto, nomeamos esse objeto de "erro" e acessamos seu atributo message
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir categoria:" + erro.message
                    });
                });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor informe o codigo da categoria!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor utilize o método DELETE para excluir uma categoria!"
            });
        }
    }
    //Para segunda-feira, implementar o control para produto(fazer o produtoCtrl)
    /*consultarMeu(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET" && requisicao.is("application/json")) {
            let termo = requisicao.params.termo;
            if(!termo){
                termo="";
            }
            const cat = new Categoria();
            cat.consultar(termo).then((listaCategorias) => {
                resposta.status(200).json(listaCategorias);
            })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao consultar categoria: " + erro.message
                    });
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar uma categoria!"
            });
        }
    }
    */

    consultar(requisicao, resposta) {
        resposta.type("application/json");
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const categoria = new Categoria();
            categoria.consultar(termo).then((listaCategorias) => {
                resposta.status(200).json({
                    status: true,
                    listaCategorias,//Igual a "listaCategorias": listaCategorias,
                    
                });
            })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Não foi possível obter as categorias " + erro.message
                    });
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o metodo GET para consultar uma categoria"
            });
        }
    }
    //
}