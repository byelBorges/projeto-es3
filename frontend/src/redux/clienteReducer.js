import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "./recursos/estado.js";
const urlBase = "http://localhost:4000/cliente";
//Thunks
export const buscarClientes = createAsyncThunk('buscarClientes', async () => {
    try {
        const resposta = await fetch(urlBase, { method: "GET" });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: dados.status,
                mensagem: "",
                listaClientes: dados.listaClientes
            }
        }
        else {
            return {
                status: dados.status,
                mensagem: dados.mensagem,
                listaClientes: []
            }
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: "Erro ao recuperar clientes:" + erro.message,
            listaClientes: []
        }
    }
});

export const incluirCliente = createAsyncThunk('incluirCliente', async (cliente) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });
        const dados = await resposta.json();
        if (dados.status){
            cliente.codigo = dados.codigoGerado
            return {
                status: dados.status,
                cliente,
                mensagem: dados.mensagem
            }
        }
        else{
            return {
                status: dados.status,
                mensagem: dados.mensagem
            }
        }
    }
    catch (erro) {
        return {
            status: false,
            mensagem: "Não foi possível cadastrar o cliente: " + erro.message
        }
    }
});

export const atualizarCliente = createAsyncThunk('atualizarCliente', async (cliente) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });
        const dados = await resposta.json();
        if (dados.status){
            return {
                status: dados.status,
                cliente,
                mensagem: dados.mensagem
            }
        }
        else{
            return {
                status: dados.status,
                mensagem: dados.mensagem
            }
        }
    }
    catch (erro) {
        return {
            status: false,
            mensagem: "Não foi possível atualizar a cliente: " + erro.message
        }
    }
});

export const excluirCliente = createAsyncThunk('excluirCliente', async (cliente) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });
        const dados = await resposta.json();
        if (dados.status){
            return {
                status: dados.status,
                cliente,
                mensagem: dados.mensagem
            }
        }
        else{
            return {
                status: dados.status,
                mensagem: dados.mensagem
            }
        }
    }
    catch (erro) {
        return {
            status: false,
            mensagem: "Não foi possível excluir o cliente: " + erro.message
        }
    }
});

const estadoInicial = {
    estado: ESTADO.OCIOSO,
    mensagem: "",
    clientes: []
}

const clienteSlice = createSlice({
    name: 'cliente',
    initialState: estadoInicial,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(buscarClientes.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Buscando clientes...';
            })
            .addCase(buscarClientes.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = "clientes recuperados do backend!";
                    state.clientes = action.payload.listaClientes;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.clientes = [];
                }
            })
            .addCase(buscarClientes.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.clientes = [];
            })
            .addCase(incluirCliente.pending, (state, action) =>{
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Processando a requisição...'
            })
            .addCase(incluirCliente.fulfilled, (state, action) =>{
                if (action.payload.status){
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    //É preciso também atualizar o estado da aplicação e não somente o backend
                    state.clientes.push(action.payload.cliente);
                }
                else{
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirCliente.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(atualizarCliente.pending, (state, action) =>{
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Processando a requisição...'
            })
            .addCase(atualizarCliente.fulfilled, (state, action) =>{
                if (action.payload.status){
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    //É preciso também atualizar o estado da aplicação e não somente o backend
                    const indice = state.clientes.findIndex((cliente) => cliente.codigo === action.payload.cliente.codigo);
                    state.clientes[indice]=action.payload.cliente;
                }
                else{
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarCliente.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(excluirCliente.pending, (state, action) =>{
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Processando a requisição...';
            })
            .addCase(excluirCliente.fulfilled, (state, action) =>{
                if (action.payload.status){
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    //É preciso também atualizar o estado da aplicação e não somente o backend
                    state.clientes = state.clientes.filter((cliente) => cliente.codigo !== action.payload.cliente.codigo);
                }
                else{
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(excluirCliente.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
    }
});

export default clienteSlice.reducer;