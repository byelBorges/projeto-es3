import Fornecedor from '../modelo/fornecedor.js'

export default class FornecedorCtrl {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cnpj = dados.cnpj;
            const nome= dados.nome;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const email = dados.email;
            const numero = dados.numero;
            const complemento = dados.complemento;
            const cep = dados.cep;
            const telefone = dados.telefone;
            if (cnpj && nome && endereco && bairro && email && numero && complemento && cep && telefone) {
                const fornecedor = new Fornecedor(0, cnpj, nome, endereco, bairro, email, numero, complemento, cep, telefone);
                fornecedor.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": fornecedor.codigo,
                        "mensagem": "Fornecedor cadastrado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao cadastrar um fornecedor: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe todos os atributos de um fornecedor para cadastrá-lo"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Para inserir um fornecedor utilize o método POST!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const cnpj = dados.cnpj;
            const nome= dados.nome;
            const endereco = dados.endereco;
            const email = dados.email;
            const numero = dados.numero;
            const bairro = dados.bairro;
            const complemento = dados.complemento;
            const cep = dados.cep;
            const telefone = dados.telefone;
            if (codigo && cnpj && nome && endereco && bairro && email && numero && complemento && cep && telefone) {
                const fornecedor = new Fornecedor(codigo, cnpj, nome, endereco, bairro, email, numero, complemento, cep, telefone);
                fornecedor.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Fornecedor alterado com sucesso!"
                    })
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao alterar um fornecedor: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe os todos os atributos necessários de um fornecedor!"
                })
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Para alterar um fornecedor utilize o método !"
            })
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const fornecedor = new Fornecedor(codigo);
                fornecedor.excluir()
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe o codigo de um fornecedor para excluir!"
                })
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Para excluir um fornecedor utilize o método !"
            })
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        let termo = requisicao.params.termo;
        if(!termo){
            termo="";
        }
        if (requisicao.method === "GET") {
            const fornecedor = new Fornecedor();
            fornecedor.consultar(termo).then((listaFornecedores) => {
                resposta.status(200).json({
                    status: true,
                    listaFornecedores
                });
            })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao consultar fornecedores: " + erro.message
                    })
                })
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Para consultar um fornecedor utilize o método !"
            });
        }
    }
}