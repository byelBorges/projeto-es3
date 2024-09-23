import Fornecedor from "../modelo/fornecedor.js"
import conectar from "./conexao.js";
export default class FornecedorDAO {
    async gravar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const sql = "INSERT INTO fornecedor(forn_CNPJ, forn_nome, forn_endereco, forn_bairro, forn_email, forn_num, forn_complemento, forn_cep, forn_tel) VALUES (?,?,?,?,?,?,?,?,?)";
            const parametros = [fornecedor.cnpj, fornecedor.nome, fornecedor.endereco, fornecedor.bairro, fornecedor.email, fornecedor.numero, fornecedor.complemento, fornecedor.cep, fornecedor.telefone];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            fornecedor.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const sql = "UPDATE fornecedor SET forn_CNPJ= ?, forn_nome= ?, forn_endereco= ?, forn_bairro= ?, forn_email= ?, forn_num= ?, forn_complemento= ?, forn_cep= ?, forn_tel = ? WHERE forn_codigo = ?";
            const parametros = [fornecedor.cnpj, fornecedor.nome, fornecedor.endereco, fornecedor.bairro, fornecedor.email, fornecedor.numero, fornecedor.complemento, fornecedor.cep, fornecedor.telefone, fornecedor.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const sql = "DELETE FROM fornecedor WHERE forn_codigo = ?";
            const parametros = [fornecedor.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];
        //Poderia utilizar esse if  no lugar no isNaN
        if (!isNaN(parseInt(parametroConsulta))) {
            sql = 'SELECT * FROM fornecedor where forn_codigo = ?';//Pesquisa por id
            parametros = [parametroConsulta];
        }
        else {
            //Consultar por nome?
            if (!parametroConsulta) {
                parametroConsulta = '';
            }
            sql = 'SELECT * FROM fornecedor where forn_nome like ?';
            parametros = ['%' + parametroConsulta + '%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaFornecedores = [];
        for (const registro of registros) {
            const fornecedor = new Fornecedor(registro.forn_codigo, registro.forn_CNPJ, registro.forn_nome, registro.forn_endereco, registro.forn_bairro, registro.forn_email, registro.forn_num, registro.forn_complemento, registro.forn_cep, registro.forn_tel);
            listaFornecedores.push(fornecedor);
        }
        global.poolConexoes.releaseConnection(conexao);
        return listaFornecedores;
    }
}