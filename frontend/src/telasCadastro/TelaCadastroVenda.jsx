import { useState } from "react";
import { Container } from "react-bootstrap";
import Pagina from "../templates/Pagina.jsx";
import TelaMensagem from "./TelaMensagem.jsx";
import FormCadVenda from "./formularios/FormCadVenda.jsx";
import TabelaVendas from "./tabelas/TabelaVendas.jsx";

export default function TelaCadastroVenda(props) {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState('');
    const [mostrarMensagem, setMostrarMensagem] = useState(false);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [vendaParaEdicao, setVendaParaEdicao] = useState({
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
            categoria: {
                codigo: 0,
                descricao: '',
            }
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
    });

    if (mostrarMensagem) {
        return (
            <TelaMensagem mensagem={mensagem} tipo={tipoMensagem} setMostrarMensagem={setMostrarMensagem} />
        );
    }
    else {
        return (
            <Container>
                <Pagina>
                    {
                        exibirFormulario ? <FormCadVenda exibirFormulario={setExibirFormulario}
                            vendaParaEdicao={vendaParaEdicao}
                            setVendaParaEdicao={setVendaParaEdicao}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                            setMostrarMensagem={setMostrarMensagem}
                            setTipoMensagem={setTipoMensagem}
                            setMensagem={setMensagem}
                        />
                            :
                            <TabelaVendas exibirFormulario={setExibirFormulario}
                                vendaParaEdicao={vendaParaEdicao}
                                setVendaParaEdicao={setVendaParaEdicao}
                                modoEdicao={modoEdicao}
                                setModoEdicao={setModoEdicao}
                            />
                    }
                </Pagina>
            </Container>
        );
    }
}