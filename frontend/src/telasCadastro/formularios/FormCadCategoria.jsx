import { Container, Button, Row, Col, FloatingLabel, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incluirCategoria, atualizarCategoria } from "../../redux/categoriaReducer.js";
import ESTADO from "../../redux/recursos/estado.js";
export default function FormCadCategoria(props) {

    const categoriaVazia = {
        codigo: 0,
        descricao: ''
    };
    const estadoInicialCategoria = props.categoriaParaEdicao;
    const [categoria, setCategoria] = useState(estadoInicialCategoria);
    const [formValidado, setFormValidado] = useState(false);
    const { estado, mensagem, categorias } = useSelector((state) => state.categoria);
    const dispatch = useDispatch();

    function manipularMudancas(e) {
        const comp = e.currentTarget;
        setCategoria({ ...categoria, [comp.name]: comp.value });
    }

    function manipularSubmissao(e) {
        const formulario = e.currentTarget;
        if (formulario.checkValidity()) {
            if (!props.modoEdicao) {
                dispatch(incluirCategoria(categoria));
                props.setMensagem('Categoria incluída com sucesso');
            }
            else {
                dispatch(atualizarCategoria(categoria));
                props.setModoEdicao(false);
                props.setCategoriaParaEdicao(categoriaVazia);
                props.setMensagem('Categoria alterada com sucesso');
            }
            props.setTipoMensagem('success');
            props.setMostrarMensagem(true);
            setCategoria(categoriaVazia);
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
                        <Form.Group>
                            <FloatingLabel

                                label="Categoria:"
                                className="mb-3"
                            >

                                <Form.Control
                                    type="text"
                                    placeholder="Eletrodomésticos"
                                    id="descricao"
                                    name="descricao" onChange={manipularMudancas}
                                    value={categoria.descricao}
                                    required />

                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a descrição da categoria!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6} offset={5}>
                        <Button type="submit" variant={"primary"}>Cadastrar</Button>
                    </Col>
                    <Col md={6} offset={5}>

                        <Button type="submit" variant={"secondary"} onClick={() => {
                            props.exibirFormulario(false);
                        }}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}