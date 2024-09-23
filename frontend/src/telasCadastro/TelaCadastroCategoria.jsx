import { useState } from "react";
import TabelaCategorias from "./tabelas/TabelaCategorias.jsx";
import FormCadCategoria from "./formularios/FormCadCategoria.jsx";
import Pagina from "../templates/Pagina.jsx";
import { Container } from "react-bootstrap";
import TelaMensagem from "./TelaMensagem.jsx";
export default function TelaCadastroCategoria(props) {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState('');
    const [mostrarMensagem, setMostrarMensagem] = useState(false);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [categoriaParaEdicao, setCategoriaParaEdicao] = useState({
        codigo: '0',
        descricao: ""
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
                        exibirFormulario ? <FormCadCategoria exibirFormulario={setExibirFormulario}
                            categoriaParaEdicao={categoriaParaEdicao}
                            setCategoriaParaEdicao={setCategoriaParaEdicao}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                            setMostrarMensagem={setMostrarMensagem}
                            setTipoMensagem={setTipoMensagem}
                            setMensagem={setMensagem}
                        />
                            :
                            <TabelaCategorias exibirFormulario={setExibirFormulario}
                                categoriaParaEdicao={categoriaParaEdicao}
                                setCategoriaParaEdicao={setCategoriaParaEdicao}
                                modoEdicao={modoEdicao}
                                setModoEdicao={setModoEdicao}
                            />
                    }
                </Pagina>
            </Container>
        );
    }
}