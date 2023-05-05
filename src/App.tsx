import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdminisracaoRestaurante from './paginas/Administracao/Restaurantes/AdministracaoRestaurante';
import FormularioRestaurante from './paginas/Administracao/Restaurantes/FormularioRestaurantes';
import AdminPratos from './paginas/Administracao/Pratos/AdmPratos';
import FormularioPratos from './paginas/Administracao/Pratos/FormularioPratos';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdminisracaoRestaurante />} />
      <Route path="/admin/restaurantes/novo" element={<FormularioRestaurante />} />
      <Route path="/admin/restaurantes/:id" element={<FormularioRestaurante />} />
      <Route path="/admin/pratos" element={<AdminPratos/>}></Route>
      <Route path="/admin/pratos/novo" element={<FormularioPratos/>}></Route>
      <Route path="/admin/pratos/:id" element={<FormularioPratos/>}></Route>

    </Routes>
  );
}

export default App;
