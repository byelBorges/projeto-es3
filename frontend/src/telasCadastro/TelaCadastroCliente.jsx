import { Container } from "react-bootstrap";
import Pagina from "../templates/Pagina.jsx";
import FormCadCliente from "./formularios/FormCadCliente.jsx";
import TabelaClientes from "./tabelas/TabelaClientes.jsx";
import { useState } from "react";
import TelaMensagem from "./TelaMensagem.jsx";

//Redutores/Slices são os unicos capazes de alterar o estado da store

export default function TelaCadastroCliente(props) {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [mostrarMensagem, setMostrarMensagem] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");
    const [modoEdicao, setModoEdicao] = useState(false);
    const [clienteParaEdicao, setClienteParaEdicao] = useState({
        codigo: 0,
        cpf: '',
        nome: '',
        endereco: '',
        bairro: '',
        numero: '',
        cidade: '',
        uf: 'AC',
        cep: ''
    });

    if (mostrarMensagem) {
        return (
            <TelaMensagem mensagem={mensagem} tipo={tipoMensagem} setMostrarMensagem={setMostrarMensagem}/> /*Atributo mensagem recebe estado mensagem*/
        );
    }
    else {
        return (
            <Container>
                <Pagina>
                    {
                        //Dinâmica em que o usuário irá alternar entre o formulario de cadastro e a visualização dos registros já cadastrados.
                        exibirFormulario ? <FormCadCliente exibirFormulario={setExibirFormulario}
                            clienteParaEdicao={clienteParaEdicao}
                            setClienteParaEdicao={setClienteParaEdicao}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                            setMostrarMensagem={setMostrarMensagem}
                            setMensagem={setMensagem}
                            setTipoMensagem={setTipoMensagem}
                        />
                            :
                            <TabelaClientes exibirFormulario={setExibirFormulario}
                                clienteParaEdicao={clienteParaEdicao}
                                setClienteParaEdicao={setClienteParaEdicao}
                                modoEdicao={modoEdicao}
                                setModoEdicao={setModoEdicao}
                            />
                        /*
                            <FormCadCliente listaClientes={listaClientes} //minha resolução: inserirCliente={inserirCliente} setListaClientes = {setListaClientes}/> : <TabelaClientes listaClientes={listaClientes} setListaClientes = {setListaClientes}/>//setListaClientes precisa ser colocado, pois precisamos alterar o estado da lista
                        */
                    }

                </Pagina>
            </Container>
        );
    }
    /*
    function inserirCliente(novoCliente){
        setListaClientes([...listaClientes, novoCliente]);
    }
    */

}