import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "./recursos/estado.js";
const urlBase = "http://localhost:4000/fornecedor";
//Thunks
export const buscarFornecedores = createAsyncThunk('buscarFornecedores', async () => {
    try {
        const resposta = await fetch(urlBase, { method: "GET" });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: dados.status,
                mensagem: "",
                listaFornecedores: dados.listaFornecedores
            }
        }
        else {
            return {
                status: dados.status,
                mensagem: dados.mensagem,
                listaFornecedores: []
            }
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: "Erro ao recuperar fornecedores:" + erro.message,
            listaFornecedores: []
        }
    }
});

export const incluirFornecedor = createAsyncThunk('incluirFornecedor', async (fornecedor) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fornecedor)
        });
        const dados = await resposta.json();
        if (dados.status){
            fornecedor.codigo = dados.codigoGerado;
            return {
                status: dados.status,
                fornecedor,
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
            mensagem: "Não foi possível cadastrar o fornecedor: " + erro.message
        }
    }
});

export const atualizarFornecedor = createAsyncThunk('atualizarFornecedor', async (fornecedor) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fornecedor)
        });
        const dados = await resposta.json();
        if (dados.status){
            return {
                status: dados.status,
                fornecedor,
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
            mensagem: "Não foi possível atualizar a fornecedor: " + erro.message
        }
    }
});

export const excluirFornecedor = createAsyncThunk('excluirFornecedor', async (fornecedor) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fornecedor)
        });
        const dados = await resposta.json();
        if (dados.status){
            return {
                status: dados.status,
                fornecedor,
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
            mensagem: "Não foi possível excluir o fornecedor: " + erro.message
        }
    }
});

const estadoInicial = {
    estado: ESTADO.OCIOSO,
    mensagem: "",
    fornecedores: []
}

const fornecedorSlice = createSlice({
    name: 'fornecedor',
    initialState: estadoInicial,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(buscarFornecedores.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Buscando fornecedores...';
            })
            .addCase(buscarFornecedores.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = "fornecedores recuperados do backend!";
                    state.fornecedores = action.payload.listaFornecedores;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.fornecedores = [];
                }
            })
            .addCase(buscarFornecedores.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.fornecedores = [];
            })
            .addCase(incluirFornecedor.pending, (state, action) =>{
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Processando a requisição...'
            })
            .addCase(incluirFornecedor.fulfilled, (state, action) =>{
                if (action.payload.status){
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    //É preciso também atualizar o estado da aplicação e não somente o backend
                    state.fornecedores.push(action.payload.fornecedor);
                }
                else{
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirFornecedor.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(atualizarFornecedor.pending, (state, action) =>{
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Processando a requisição...'
            })
            .addCase(atualizarFornecedor.fulfilled, (state, action) =>{
                if (action.payload.status){
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    //É preciso também atualizar o estado da aplicação e não somente o backend
                    const indice = state.fornecedores.findIndex((fornecedor) => fornecedor.codigo === action.payload.fornecedor.codigo);
                    state.fornecedores[indice]=action.payload.fornecedor;
                }
                else{
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarFornecedor.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(excluirFornecedor.pending, (state, action) =>{
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Processando a requisição...';
            })
            .addCase(excluirFornecedor.fulfilled, (state, action) =>{
                if (action.payload.status){
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    //É preciso também atualizar o estado da aplicação e não somente o backend
                    state.fornecedores = state.fornecedores.filter((fornecedor) => fornecedor.codigo !== action.payload.fornecedor.codigo);
                }
                else{
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(excluirFornecedor.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
    }
});

export default fornecedorSlice.reducer;