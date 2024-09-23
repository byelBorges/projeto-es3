import CategoriaDAO from "../persistencia/categoriaDAO.js";
//Não esqueça o ".js" ao final da importação

export default class Categoria{
    #codigo;
    #descricao;

    constructor(codigo= 0, descricao=''){
        this.#codigo = codigo;
        this.#descricao = descricao;
    }

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get descricao(){
        return this.#descricao;
    }
    set descricao(novaDescricao){
        this.#descricao = novaDescricao;
    }

    //Override do método toJSON
    toJSON(){
        return {
            codigo: this.#codigo,
            descricao: this.#descricao
        }
    }
    //Override do método toString
    toString(){

    }

    //Camada de modelo acessa a camada de persistencia
    //Limite do sistema---------Controle---------Modelo---------Persistência
    async gravar(){
        const catDAO = new CategoriaDAO();
        await catDAO.gravar(this);
    }

    async excluir(){
        const catDAO = new CategoriaDAO();
        await catDAO.excluir(this);
    }

    async atualizar(){
        const catDAO = new CategoriaDAO();
        await catDAO.atualizar(this);
    
    }

    async consultar(parametro){
        const catDAO = new CategoriaDAO();
        return await catDAO.consultar(parametro);
    }
}