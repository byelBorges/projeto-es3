import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TelaCadastroCliente from './telasCadastro/TelaCadastroCliente.jsx';
import TelaCadastroCategoria from './telasCadastro/TelaCadastroCategoria.jsx';
import TelaCadastroProduto from './telasCadastro/TelaCadastroProduto.jsx';
import TelaCadastroFornecedor from './telasCadastro/TelaCadastroFornecedor.jsx'
import TelaCadastroVenda from './telasCadastro/TelaCadastroVenda.jsx';
import TelaMenu from './telasCadastro/TelaMenu.jsx';
import Tela404 from './telasCadastro/Tela404.jsx';
import store from './redux/store';
import { Provider } from 'react-redux';//componente
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            {
              //Os caminhos(path) devem ser organizados do mais específico para o mais geral
            }
            <Route path='/clientes' element={<TelaCadastroCliente />} />
            <Route path='/produtos' element={<TelaCadastroProduto />} />
            <Route path='/fornecedores' element={<TelaCadastroFornecedor />} />
            <Route path='/categorias' element={<TelaCadastroCategoria />} />
            <Route path='/vendas' element={<TelaCadastroVenda/>}/>
            <Route path='/' element={<TelaMenu />} />

            <Route path='*' element={<Tela404 />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;