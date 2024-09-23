import VendaDAO from "../persistencia/vendaDAO.js";

export default class Venda {
    #qtdItens;
    #dataVenda;
    #valorTotal;
    #cliente;
    #produto;

    constructor(qtdItens = 0, dataVenda = '', valorTotal = 0, cliente = {}, produto = {}) {
        this.#qtdItens = qtdItens;
        this.#dataVenda = dataVenda;
        this.#valorTotal = valorTotal;
        this.#cliente = cliente;
        this.#produto = produto;
    }

    get qtdItens(){
        return this.#qtdItens;
    }
    set qtdItens(novoQtdItens){
        this.#qtdItens= novoQtdItens;
    }

    get dataVenda(){
        return this.#dataVenda;
    }
    set dataVenda(novaDataVenda){
        this.#dataVenda= novaDataVenda;
    }

    get valorTotal(){
        return this.#valorTotal;
    }
    set valorTotal(novoValorTotal){
        this.#valorTotal= novoValorTotal;
    }

    get cliente(){
        return this.#cliente;
    }
    set cliente(novoCliente){
        this.#cliente= novoCliente;
    }

    get produto(){
        return this.#produto;
    }
    set produto(novoProduto){
        this.#produto= novoProduto;
    }

    toJSON(){
        return {
            qtdItens: this.#qtdItens,
            dataVenda: formatarData(this.#dataVenda),
            valorTotal: this.#valorTotal,
            cliente: this.#cliente.toJSON(),
            produto: this.#produto.toJSON()
        };
    }

    toString(){
        
    }

    async gravar(){
        const venDAO = new VendaDAO();
        await venDAO.gravar(this);
    }

    async atualizar(){
        const venDAO = new VendaDAO();
        await venDAO.atualizar(this);
    }

    async excluir(){
        const venDAO = new VendaDAO();
        await venDAO.excluir(this);
    }

    async consultar(termo){
        const venDAO = new VendaDAO();
        return await venDAO.consultar(termo);
    }
}

function padZero(valor) {
    return valor < 10 ? '0' + valor : valor;
}

function formatarData(data) {
    const dataObj = new Date(data);

    const ano = dataObj.getFullYear();
    const mes = padZero(dataObj.getMonth() + 1);// Adiciona 1 porque os meses são indexados de 0 a 11
    const dia = padZero(dataObj.getDate());
    const horas = padZero(dataObj.getHours());
    const minutos = padZero(dataObj.getMinutes());
    const segundos = padZero(dataObj.getSeconds());

    return `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
}
