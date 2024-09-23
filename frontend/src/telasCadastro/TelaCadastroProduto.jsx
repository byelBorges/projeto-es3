import { useState } from "react";
import Pagina from "../templates/Pagina.jsx";
import TelaMensagem from "./TelaMensagem.jsx";
import TabelaProdutos from "./tabelas/TabelaProdutos.jsx";
import FormCadProduto from "./formularios/FormCadProduto.jsx";
import { Container } from "react-bootstrap";

export default function TelaCadastroProduto(props) {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [mostrarMensagem, setMostrarMensagem] = useState(false);
    const [mensagem, setMensagem]= useState('');
    const [tipoMensagem, setTipoMensagem] = useState('');
    const [modoEdicao, setModoEdicao]= useState(false);
    const [produtoParaEdicao, setProdutoParaEdicao]= useState({
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
        },
    });
    

    if (mostrarMensagem) {
        return(
            <TelaMensagem mensagem={mensagem} tipo={tipoMensagem} setMostrarMensagem={setMostrarMensagem}/>
        );
    }
    else {
        return (
            <Container>
                <Pagina>
                    {
                        exibirFormulario ? <FormCadProduto exibirFormulario={setExibirFormulario}
                        produtoParaEdicao={produtoParaEdicao}
                        setProdutoParaEdicao={setProdutoParaEdicao}
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                        setMostrarMensagem={setMostrarMensagem}
                        setMensagem={setMensagem}
                        setTipoMensagem={setTipoMensagem}
                        /> 
                        : 
                        <TabelaProdutos exibirFormulario={setExibirFormulario}
                        produtoParaEdicao={produtoParaEdicao}
                        setProdutoParaEdicao={setProdutoParaEdicao}
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                        
                        />
                        //If else só funciona fora do return
                    }
                </Pagina>
            </Container>
        );
    }
}