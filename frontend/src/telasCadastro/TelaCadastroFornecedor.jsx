import { useState } from "react";
import Pagina from "../templates/Pagina";
import FormCadFornecedor from "./formularios/FormCadFornecedor.jsx";
import TabelaFornecedores from "./tabelas/TabelaFornecedores.jsx";
import { Container } from "react-bootstrap";
import TelaMensagem from "./TelaMensagem.jsx";

export default function TelaCadastroFornecedor(props) {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [mostrarMensagem, setMostrarMensagem] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState("");
    const [modoEdicao, setModoEdicao] = useState(false);
    const [fornecedorParaEdicao, setFornecedorParaEdicao] = useState({
        codigo: '0',
        cnpj: '',
        nome: '',
        endereco: '',
        email: '',
        numero: '',
        cep: '',
        telefone: '',
        bairro: '',
        complemento: ''
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
                        exibirFormulario ? <FormCadFornecedor exibirFormulario={setExibirFormulario}
                            fornecedorParaEdicao={fornecedorParaEdicao}
                            setFornecedorParaEdicao={setFornecedorParaEdicao}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                            setMostrarMensagem={setMostrarMensagem}
                            setMensagem={setMensagem}
                            setTipoMensagem={setTipoMensagem}
                        />
                            :
                            <TabelaFornecedores exibirFormulario={setExibirFormulario}
                                fornecedorParaEdicao={fornecedorParaEdicao}
                                setFornecedorParaEdicao={setFornecedorParaEdicao}
                                modoEdicao={modoEdicao}
                                setModoEdicao={setModoEdicao}
                            />
                    }
                </Pagina>
            </Container>

        );
    }

}