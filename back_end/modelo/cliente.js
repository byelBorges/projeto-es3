import ClienteDAO from "../persistencia/clienteDAO.js";

export default class Cliente {
    #codigo;
    #cpf;
    #nome;
    #endereco;
    #bairro;
    #numero;
    #cidade;
    #uf;
    #cep;

    constructor(codigo = 0, cpf = '', nome = '', endereco = '', bairro = '', numero = '', cidade = '', uf = '', cep = '') {
        this.#codigo = codigo;
        this.#cpf = cpf;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#numero = numero;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#cep = cep;
    }

    get codigo() {
        return this.#codigo;
    }
    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get cpf() {
        return this.#cpf;
    }
    set cpf(novoCPF) {
        this.#cpf = novoCPF;
    }

    get nome() {
        return this.#nome;
    }
    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get endereco() {
        return this.#endereco;
    }
    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    get bairro() {
        return this.#bairro;
    }
    set bairro(novoBairro) {
        this.#bairro = novoBairro;
    }

    get numero() {
        return this.#numero;
    }
    set numero(novoNumero) {
        this.#numero = novoNumero;
    }

    get cidade() {
        return this.#cidade;
    }
    set cidade(novaCidade) {
        this.#cidade = novaCidade;
    }

    get uf() {
        return this.#uf;
    }
    set uf(novaUF) {
        this.#uf = novaUF;
    }

    get cep() {
        return this.#cep;
    }
    set cep(novoCEP) {
        this.#cep = novoCEP;
    }

    toString() {

    }

    toJSON() {
        return {
        codigo: this.#codigo,
        cpf: this.#cpf,
        nome: this.#nome,
        endereco: this.#endereco,
        bairro: this.#bairro,
        numero: this.#numero,
        cidade: this.#cidade,
        uf: this.#uf,
        cep: this.#cep
        }
    }

    async gravar() {
        const cliDAO = new ClienteDAO();
        await cliDAO.gravar(this);
    }

    async atualizar() {
        const cliDAO = new ClienteDAO();
        await cliDAO.atualizar(this);
    }

    async excluir() {
        const cliDAO = new ClienteDAO();
        await cliDAO.excluir(this);
    }

    async consultar(termo) {
        const cliDAO = new ClienteDAO();
        return await cliDAO.consultar(termo);
    }
}