import Cliente from "../modelo/cliente.js";

export default class ClienteCtrl {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const numero = dados.numero;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const cep = dados.cep;
            if (cpf && nome && endereco && bairro && numero && cidade && uf && cep) {
                const cliente = new Cliente(0, cpf, nome, endereco, bairro, numero, cidade, uf, cep);
                cliente.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": cliente.codigo,
                        "mensagem": "Cliente cadastrado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao cadastrar um cliente: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe todos os atributos de um cliente para cadastrá-lo"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Para inserir um cliente utilize o método POST!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const numero = dados.numero;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const cep = dados.cep;
            if (codigo && cpf && nome && endereco && bairro && numero && cidade && uf && cep) {
                const cliente = new Cliente(codigo, cpf, nome, endereco, bairro, numero, cidade, uf, cep);
                cliente.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cliente alterado com sucesso!"
                    })
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao alterar um cliente: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe os todos os atributos necessários de um cliente!"
                })
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Para alterar um cliente utilize o método !"
            })
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const cliente = new Cliente(codigo);
                cliente.excluir()
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe o codigo de um cliente para excluir!"
                })
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Para excluir um cliente utilize o método !"
            })
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            let termo = requisicao.params.termo;
            if (!termo) {
                termo = "";
            }
            const cliente = new Cliente();
            cliente.consultar(termo).then((listaClientes) => {
                resposta.status(200).json({
                    status: true,
                    listaClientes
                });
            })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao consultar clientes: " + erro.message
                    })
                })
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Para consultar um cliente utilize o método !"
            })
        }
    }
}