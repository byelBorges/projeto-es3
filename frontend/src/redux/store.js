import {configureStore} from '@reduxjs/toolkit';
import clienteSlice from './clienteReducer.js';
import fornecedorSlice from './fornecedorReducer.js';
import produtoSlice from './produtoReducer.js';
import categoriaSlice from './categoriaReducer.js';
import vendaSlice from './vendaReducer.js';

const store = configureStore({
    reducer:{
        cliente: clienteSlice,
        fornecedor: fornecedorSlice,
        produto: produtoSlice,
        categoria: categoriaSlice,
        venda: vendaSlice,
    }
});

export default store;