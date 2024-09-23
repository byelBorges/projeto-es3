import FornecedorDAO from "../persistencia/fornecedorDAO.js";

export default class Fornecedor{
    #codigo;
    #cnpj;
    #nome;
    #endereco;
    #bairro;
    #email;
    #numero;
    #complemento;
    #cep;
    #telefone;

    constructor(codigo= 0, cnpj='', nome='', endereco='', bairro='', email='', numero= 0, complemento='',cep='', telefone='') {
        this.#codigo = codigo;
        this.#cnpj = cnpj;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#bairro=bairro;
        this.#email = email;
        this.#numero = numero;
        this.#complemento = complemento;
        this.#cep = cep;
        this.#telefone = telefone;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo= novoCodigo;
    }

    get cnpj() {
        return this.#cnpj;
    }
    set cnpj(novoCNPJ) {
        this.#cnpj = novoCNPJ;
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

    get email() {
        return this.#email;
    }
    set email(novoEmail) {
        this.#email = novoEmail;
    }

    get numero() {
        return this.#numero;
    }
    set numero(novoNumero) {
        this.#numero = novoNumero;
    }

    get complemento() {
        return this.#complemento;
    }
    set complemento(novoComplemento) {
        this.#complemento = novoComplemento;
    }

    get cep() {
        return this.#cep;
    }
    set cep(novoCEP) {
        this.#cep = novoCEP;
    }

    get telefone() {
        return this.#telefone;
    }
    set telefone(novoTelefone) {
        this.#telefone = novoTelefone;
    }

    toString(){

    }

    toJSON(){
        return{
            codigo: this.#codigo,
            cnpj: this.#cnpj,
            nome: this.#nome,
            endereco: this.#endereco,
            bairro: this.#bairro,
            email: this.#email,
            numero: this.#numero,
            complemento: this.#complemento,
            cep: this.#cep,
            telefone: this.#telefone
        }
    }

    async gravar(){
        const forDAO = new FornecedorDAO();
        await forDAO.gravar(this);
    }

    async atualizar(){
        const forDAO = new FornecedorDAO();
        await forDAO.atualizar(this);
    }

    async excluir(){
        const forDAO = new FornecedorDAO();
        await forDAO.excluir(this);
    }

    async consultar(termo){
        const forDAO = new FornecedorDAO();
        return await forDAO.consultar(termo);
    }
}