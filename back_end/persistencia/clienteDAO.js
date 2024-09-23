import Cliente from "../modelo/cliente.js"
import conectar from "./conexao.js";
export default class ClienteDAO {
    async gravar(cliente) {
        if (cliente instanceof Cliente) {
            const sql = "INSERT INTO cliente(cli_cpf, cli_nome, cli_endereco, cli_bairro, cli_num, cli_cidade, cli_uf, cli_cep) VALUES (?,?,?,?,?,?,?,?)";
            const parametros = [cliente.cpf, cliente.nome, cliente.endereco, cliente.bairro, cliente.numero, cliente.cidade, cliente.uf, cliente.cep];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            cliente.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(cliente) {
        if (cliente instanceof Cliente) {
            const sql = "UPDATE cliente SET cli_cpf= ?, cli_nome= ?, cli_endereco= ?, cli_bairro= ?, cli_num= ?, cli_cidade= ?, cli_uf= ?, cli_cep= ? WHERE cli_codigo = ?";
            const parametros = [cliente.cpf, cliente.nome, cliente.endereco, cliente.bairro, cliente.numero, cliente.cidade, cliente.uf, cliente.cep, cliente.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(cliente) {
        if (cliente instanceof Cliente) {
            const sql = "DELETE FROM cliente WHERE cli_codigo = ?";
            const parametros = [cliente.codigo];
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
            sql = 'SELECT * FROM cliente where cli_codigo = ?';//Pesquisa por id
            parametros = [parametroConsulta];
        }
        else {
            //Consultar por nome?
            if (!parametroConsulta) {
                parametroConsulta = '';
            }
            sql = 'SELECT * FROM cliente where cli_nome like ? ORDER BY cli_nome';
            parametros = ['%' + parametroConsulta + '%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaClientes = [];
        for (const registro of registros) {
            const cliente = new Cliente(registro.cli_codigo, registro.cli_cpf, registro.cli_nome, registro.cli_endereco, registro.cli_bairro, registro.cli_num, registro.cli_cidade, registro.cli_uf, registro.cli_cep);
            listaClientes.push(cliente);
        }
        global.poolConexoes.releaseConnection(conexao);
        return listaClientes;
    }
}