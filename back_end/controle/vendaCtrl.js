import Venda from "../modelo/venda.js";
export default class VendaCtrl {
    gravar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "POST" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const qtdItens = dados.qtdItens;
            const dataVenda = dados.dataVenda;
            const valorTotal = dados.valorTotal;
            const cliente = dados.cliente;
            const produto = dados.produto;
            if (qtdItens && dataVenda && valorTotal >= 0 && cliente && produto) {
                const venda = new Venda(qtdItens, dataVenda, valorTotal, cliente, produto);
                venda.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Venda cadastrada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: "Houve um erro ao cadastrar venda: " + erro.message
                        })
                    })
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados de venda!"
                })
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: "Por favor, utilize o método POST para inserir uma venda!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type("application/json");
        if ((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const qtdItens = dados.qtdItens;
            const dataVenda = dados.dataVenda;
            const valorTotal = dados.valorTotal;
            const cliente = dados.cliente;
            const produto = dados.produto;
            if (qtdItens && dataVenda && valorTotal >= 0 && cliente && produto) {
                const venda = new Venda(qtdItens, dataVenda, valorTotal, cliente, produto);
                venda.atualizar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Venda atualizada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: "Houve um erro ao atualizar venda: " + erro.message
                        });
                    })
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe os atributos de venda corretamente!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar venda!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type("application/json");
        if(requisicao.method === "DELETE" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const dataVenda = dados.dataVenda;
            const cliente = dados.cliente;
            //dataVenda e cliente são as PKs da tabela venda
            if(dataVenda && cliente){
                const venda = new Venda(0, dataVenda, 0, cliente, null);
                venda.excluir().then(()=>{
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Venda excluída com sucesso!"
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao excluir venda: " + erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Por favor, informe a data e cliente da venda para excluí-la!"
                })
            }
        }
        else{
            resposta.status(400).json({
                status: false,
                mensagem: "Utilize o método DELETE para excluir venda!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type("application/json");
        if(requisicao.method === "GET"){
            const venda = new Venda();
            venda.consultar("").then((listaVendas)=>{
                resposta.status(200).json({
                    status:true,
                    listaVendas
                });
            })
            .catch((erro)=>{
                resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao consultar vendas: " + erro.message
                });
            });
        }
        else{
            resposta.status(400).json({
                status: false,
                mensagem: "Utilize o método GET para consultar venda!"
            });
        }
    }
}