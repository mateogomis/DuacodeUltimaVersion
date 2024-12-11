import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Organigrama from "./pages/Organigrama/Organigrama";
import Proyectos from "./pages/Proyectos/Proyectos";
import Calendario from "./pages/Calendario/Calendario";
import Salas from "./pages/Salas/Salas";
import ProtocolosView from './pages/Protocolos/ProtocolosView';
// Componentes panel de administración
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import Admin from "./pages/Admin/Admin";
import AdminEmpleados from "./pages/Admin/AdminEmpleados/AdminEmpleados";
import "bootstrap/dist/css/bootstrap.min.css";



const App = () => {
  return (
    <div className="app-container">
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/organigrama" element={<Organigrama />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/login" element={<Login />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/salas" element={<Salas />} />
          <Route path="/protocolos" element={<ProtocolosView />} />


          {/*  Rutas panel de administración PROTEGIDAS */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/empleados"
            element={
              <ProtectedRoute>
                <AdminEmpleados />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
