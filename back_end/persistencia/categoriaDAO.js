import conectar from "./conexao.js";
import Categoria from "../modelo/categoria.js";

//DAO = Data access object -> Objeto de acesso aos dados
export default class CategoriaDAO {
    async gravar(categoria) {
        if (categoria instanceof Categoria) {
            const sql = "INSERT INTO categoria(cat_descricao) VALUES(?)";
            const parametros = [categoria.descricao];
            const conexao = await conectar();//Retorna uma conexão
            const retorno = await conexao.execute(sql, parametros);
            categoria.codigo = retorno[0].insertId;//SQL vai gerar um id e aqui atribuimos esse id gerado ao objeto categoria//retorno é um 'objeto lista'(depurar para entender)
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(categoria) {
        if (categoria instanceof Categoria) {
            const sql = "UPDATE categoria SET cat_descricao=? WHERE cat_codigo = ?";
            const parametros = [categoria.descricao, categoria.codigo];
            const conexao = await conectar();//Retorna uma conexão
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(categoria) {
        if (categoria instanceof Categoria) {
            const sql = "DELETE FROM categoria WHERE cat_codigo = ?";
            const parametros = [categoria.codigo];
            const conexao = await conectar();//Retorna uma conexão
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];
        if (!isNaN(parseInt(parametroConsulta))) {
            //Consultar pelo código da categoria
            sql = "SELECT * FROM categoria WHERE cat_codigo = ? order by cat_descricao";
            parametros = [parametroConsulta];
        }
        else {
            //Consultar pela descricao
            if (!parametroConsulta) {
                parametroConsulta = '';
            }
            sql = "SELECT * FROM  categoria WHERE cat_descricao like ? order by cat_descricao";
            parametros = ['%' + parametroConsulta + '%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaCategorias = [];
        for (const registro of registros) {
            const categoria = new Categoria(registro.cat_codigo, registro.cat_descricao);
            listaCategorias.push(categoria);
        }
        global.poolConexoes.releaseConnection(conexao);
        return listaCategorias;
    }
}