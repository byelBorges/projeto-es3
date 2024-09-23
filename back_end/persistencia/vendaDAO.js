import Produto from "../modelo/produto.js";
import conectar from "./conexao.js";
import Cliente from "../modelo/cliente.js";
import Categoria from "../modelo/categoria.js";
import Venda from "../modelo/venda.js";

export default class VendaDAO {
    async gravar(venda) {
        if (venda instanceof Venda) {
            const sql = "INSERT INTO venda (ven_qtdItens, ven_dataVenda, ven_valorTotal, ven_prod_cod, ven_cli_cod) VALUES(?,?,?,?,?)";
            const parametros = [venda.qtdItens, venda.dataVenda, venda.valorTotal, venda.produto.codigo, venda.cliente.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(venda) {
        if (venda instanceof Venda) {
            const sql = "UPDATE venda SET ven_qtdItens= ?, ven_valorTotal= ?, ven_prod_cod= ? WHERE ven_dataVenda= ? AND ven_cli_cod= ?";
            const parametros = [venda.qtdItens, venda.valorTotal, venda.produto.codigo, venda.dataVenda, venda.cliente.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(venda) {
        if (venda instanceof Venda) {
            const sql = "DELETE FROM venda WHERE ven_dataVenda= ? AND ven_cli_cod= ?";
            const parametros = [venda.dataVenda, venda.cliente.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        let sql = "";
        let parametros = [];
        const conexao = await conectar();
        termo = ""; //busca sem filtros
        let listaVendas = [];
        sql = `SELECT p.prod_nome, p.prod_codigo, p.prod_descricao, p.prod_precoCusto, p.prod_precoVenda, p.prod_dataValidade, p.prod_qtdEstoque, 
       cat.cat_codigo, cat.cat_descricao, 
       c.cli_codigo, c.cli_cpf, c.cli_nome, c.cli_endereco, c.cli_bairro, c.cli_num, c.cli_cidade, c.cli_uf, c.cli_cep,
       v.ven_qtdItens, v.ven_dataVenda, v.ven_valorTotal, v.ven_prod_cod, v.ven_cli_cod 
       FROM venda v INNER JOIN cliente c ON c.cli_codigo = v.ven_cli_cod 
       INNER JOIN produto p ON v.ven_prod_cod = p.prod_codigo 
       INNER JOIN categoria cat ON cat.cat_codigo = p.prod_cat_cod
       ORDER BY v.ven_dataVenda;`;
        parametros = ['%' + termo + '%'];
        const [registros, campos] = await conexao.execute(sql, parametros);
        for (const registro of registros) {
            const categoria = new Categoria(registro.cat_codigo, registro.cat_descricao);
            const produto = new Produto(registro.prod_codigo, registro.prod_nome, registro.prod_descricao, registro.prod_precoCusto, registro.prod_precoVenda, registro.prod_dataValidade, registro.prod_qtdEstoque, categoria);
            const cliente = new Cliente(registro.cli_codigo, registro.cli_cpf, registro.cli_nome, registro.cli_endereco, registro.cli_bairro, registro.cli_num, registro.cli_cidade, registro.cli_uf, registro.cli_cep);
            const venda = new Venda(registro.ven_qtdItens, registro.ven_dataVenda, registro.ven_valorTotal, cliente, produto);
            listaVendas.push(venda);
        }
        global.poolConexoes.releaseConnection(conexao);
        return listaVendas;
    }
}