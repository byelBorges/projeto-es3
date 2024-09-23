import { Col, Container, FloatingLabel, Form, Row, Button, Spinner } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incluirVenda, atualizarVenda } from "../../redux/vendaReducer.js";
import { buscarClientes } from "../../redux/clienteReducer.js"
import { buscarProdutos } from "../../redux/produtoReducer.js";
import { toast } from "react-toastify"
import ESTADO from "../../redux/recursos/estado.js";

export default function FormCadVenda(props) {
    const vendaVazia = {
        qtdItens: 0,
        dataVenda: '',
        valorTotal: 0,
        produto: {
            codigo: 0,
            nome: '',
            descricao: '',
            qtdEstoque: '',
            dataValidade: '',
            precoCusto: '',
            precoVenda: '',
        },
        cliente: {
            codigo: 0,
            cpf: '',
            nome: '',
            endereco: '',
            bairro: '',
            numero: '',
            cidade: '',
            uf: 'AC',
            cep: ''
        },
    };

    const estadoInicialVenda = props.vendaParaEdicao;
    const [venda, setVenda] = useState(estadoInicialVenda);
    const [formValidado, setFormValidado] = useState(false);
    const { estado: estadoCliente, mensagem: mensagemCliente, clientes } = useSelector((state) => state.cliente);
    const { estado: estadoProduto, mensagem: mensagemProduto, produtos } = useSelector((state) => state.produto);
    const { estado, mensagem, vendas } = useSelector((state) => state.venda);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(buscarClientes());
        dispatch(buscarProdutos());
        //dispatch(buscarCategorias());//???
    }, [dispatch]);




    function manipularMudancas(e) {
        const componente = e.currentTarget;

        if (componente.name === "dataVenda") {
            setVenda({ ...venda, [componente.name]: pegaDataAtual() });
        }
        else if (componente.name === "valorTotal") {
            setVenda({ ...venda, [componente.name]: calculaValorTotal() });

        }
        else {
            setVenda({ ...venda, [componente.name]: componente.value });
            
        }

    }

    function selecionarCliente(e) {
        const componente = e.currentTarget;
        setVenda({
            ...venda, cliente: {
                "codigo": componente.value,
                "nome": componente.options[componente.selectedIndex].text,
            }
        });
    }

    function selecionarProduto(e) {
        const componente = e.currentTarget;
        setVenda({
            ...venda, produto: {
                "codigo": componente.value,
                "nome": componente.options[componente.selectedIndex].text,
            }
        });
    }

    function pegaDataAtual() {
        let dataAtual = new Date();
        let ano = dataAtual.getFullYear();
        let mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');;
        let dia = dataAtual.getDate().toString().padStart(2, '0');
        let horas = dataAtual.getHours().toString().padStart(2, '0');
        let minutos = dataAtual.getMinutes().toString().padStart(2, '0');
        let segundos = dataAtual.getSeconds().toString().padStart(2, '0');
        let dataFormatada = `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
        return dataFormatada;
    }

    function calculaValorTotal() {
        let codigoProd = parseInt(venda.produto.codigo);
        let qtde = parseFloat(venda.qtdItens);
        let prodEncontrado = produtos.find((prod) => prod.codigo === codigoProd);
        let pVendaProd = parseFloat(prodEncontrado.precoVenda);
        if (!isNaN(qtde) && !isNaN(pVendaProd)) {
            return qtde * pVendaProd;
        }
        else {
            return 0.0;
        }
    }

    function manipularSubmissao(e) {
        const form = e.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                dispatch(incluirVenda(venda));
                props.setMensagem('Venda incluída com sucesso');
            }
            else {
                dispatch(atualizarVenda(venda));
                props.setModoEdicao(false);
                props.setVendaParaEdicao(vendaVazia);
                props.setMensagem('Venda alterada com sucesso');
            }
            props.setTipoMensagem('success');
            props.setMostrarMensagem(true);
            setVenda(vendaVazia);
            setFormValidado(false);
        }
        else {
            setFormValidado(true);
        }
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <Container>
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Row>
                    <Col>
                        <Form.Select
                            type="text"
                            placeholder="Ex: 2"
                            id="cliente"
                            name="cliente"
                            onChange={selecionarCliente}
                            value={venda.cliente.codigo}
                            required >
                            <option value="0" defaultValue>Selecione um cliente</option>
                            {
                                clientes.map((cliente) => {
                                    return (
                                        <option key={cliente.codigo} value={cliente.codigo}>
                                            {cliente.nome}
                                        </option>
                                    );
                                })
                            }
                            {
                                estadoCliente === ESTADO.PENDENTE ?
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Carregando clientes...</span>
                                    </Spinner>
                                    :
                                    null
                            }
                            {
                                estadoCliente === ESTADO.ERRO ?
                                    <p>Erro ao carregar as clientes: {mensagemCliente}</p>
                                    :
                                    null
                            }
                        </Form.Select>
                    </Col>



                    <Col>
                        <Form.Select
                            type="text"
                            placeholder="Ex: 2"
                            id="produto"
                            name="produto"
                            onChange={selecionarProduto}
                            value={venda.produto.codigo}
                            required >
                            <option value="0" defaultValue>Selecione um produto</option>
                            {
                                produtos.map((produto) => {
                                    return (
                                        <option key={produto.codigo} value={produto.codigo}>
                                            {produto.nome}
                                        </option>
                                    );
                                })
                            }
                            {
                                estadoProduto === ESTADO.PENDENTE ?
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Carregando produtos...</span>
                                    </Spinner>
                                    :
                                    null
                            }
                            {
                                estadoProduto === ESTADO.ERRO ?
                                    <p>Erro ao carregar as clientes: {mensagemProduto}</p>
                                    :
                                    null
                            }
                        </Form.Select>
                    </Col>
                </Row>



                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Quantidade Itens:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Ex: 3"
                                    id="qtdItens"
                                    name="qtdItens"
                                    onChange={manipularMudancas}
                                    value={venda.qtdItens}
                                    required />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>


                    <Col>
                        <Form.Group>
                            <FloatingLabel

                                label="Data Venda:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="AAAA-MM-DD"
                                    id="dataVenda"
                                    name="dataVenda"
                                    onChange={manipularMudancas}
                                    value={venda.dataVenda}
                                    required />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>



                    <Col>
                        <Form.Group>
                            <FloatingLabel

                                label="Valor total da compra:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="AAAA-MM-DD"
                                    id="valorTotal"
                                    name="valorTotal"
                                    onChange={manipularMudancas}
                                    value={venda.valorTotal}
                                    required />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>


                <Row>
                    <Col>
                        <Button type="submit" variant={"primary"}>{props.modoEdicao ? "Alterar" : "Cadastrar"}</Button>
                    </Col>
                    <Col>
                        <Button type="submit" variant={"secondary"} onClick={() => {
                            props.exibirFormulario(false);
                        }}>Voltar</Button>
                    </Col>
                </Row>

            </Form>
        </Container >
    );
}