import ProdutoDAO from "../persistencia/produtoDAO.js";
import InterfaceSubject from "./interfaceSubject.js";

export default class Produto extends InterfaceSubject{
    #codigo;
    #nome;
    #descricao;
    #precoCusto;
    #precoVenda;
    #dataValidade;
    #qtdEstoque;
    #categoria;
    #listaObserver;//lista de clientes observadores

    async registerObserver(codCliente){
        //adicionar na lista
        const prodDAO = new ProdutoDAO();
        await prodDAO.gravarObserver(this, codCliente);
    }

    async removeObserver(codCliente){
        //remover da lista
        const prodDAO = new ProdutoDAO();
        await prodDAO.excluirObserver(this, codCliente);
    }

    async notifyObserver(){
        //notificar puxa a lista
        const prodDAO = new ProdutoDAO();
        this.#listaObserver = await prodDAO.getListaEspera(this);
        //repeticao na lista pra notificar observadores quando estoque alterar
        for(let observer of this.#listaObserver){
            observer.update();
        }
    }

    constructor(codigo=0, nome='', descricao='', precoCusto=0, precoVenda=0, dataValidade='', qtdEstoque=0, categoria={}){
        super();
        this.#codigo = codigo;
        this.#nome= nome;
        this.#descricao = descricao;
        this.#precoCusto = precoCusto;
        this.#precoVenda = precoVenda;
        this.#dataValidade = dataValidade;
        this.#qtdEstoque = qtdEstoque;
        this.#categoria = categoria;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo= novoCodigo;
    }

    get nome(){
        return this.#nome;
    }
    set nome(novoNome){
        this.#nome = novoNome;
    }

    get descricao(){
        return this.#descricao;
    }
    set descricao(novaDescricao){
        this.#descricao= novaDescricao;
    }

    get precoCusto(){
        return this.#precoCusto;
    }
    set precoCusto(novoPrecoCusto){
        this.#precoCusto = novoPrecoCusto;
    }

    get precoVenda(){
        return this.#precoVenda;
    }
    set precoVenda(novoPrecoVenda){
        this.#precoVenda = novoPrecoVenda;
    }

    get dataValidade(){
        return this.#dataValidade;
    }
    set dataValidade(novaDataValidade){
        this.#dataValidade = novaDataValidade;
    }

    get qtdEstoque(){
        return this.#qtdEstoque;
    }
    set qtdEstoque(novaQtdEstoque){
        this.#qtdEstoque = novaQtdEstoque;
    }

    get categoria(){
        return this.#categoria;
    }
    set categoria(novaCategoria){
        this.#categoria = novaCategoria;
    }

    toJSON(){
        return {
            codigo: this.#codigo,
            nome: this.#nome,
            descricao: this.#descricao,
            precoCusto: this.#precoCusto,
            precoVenda: this.#precoVenda,
            dataValidade: this.#dataValidade.toISOString().split('T')[0],
            qtdEstoque: this.#qtdEstoque,
            categoria: this.#categoria.toJSON()
        }
    }

    toString(){

    }

    async gravar(){
        const prodDAO= new ProdutoDAO();
        await prodDAO.gravar(this);
    }

    async atualizar(){
        const prodDAO= new ProdutoDAO();
        await prodDAO.atualizar(this);
        if(parseInt(this.#qtdEstoque) > 0){
            this.notifyObserver();
        }
    }

    async excluir(){
        const prodDAO= new ProdutoDAO();
        await prodDAO.excluir(this)
    }

    async consultar(termo){
        const prodDAO= new ProdutoDAO();
        return await prodDAO.consultar(termo);
    }

    async consultaListaEspera(){
        const prodDAO = new ProdutoDAO();
        this.#listaObserver = await prodDAO.getListaEspera(this);
    }
}
//Codeium