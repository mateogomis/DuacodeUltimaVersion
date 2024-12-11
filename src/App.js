import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Organigrama from "./pages/Organigrama/Organigrama";
import Proyectos from "./pages/Proyectos/Proyectos";
import TestCalendario from "./pages/TestCalendario/TestCalendario";
import Salas from "./pages/Salas/Salas";
import Protocolos from "./pages/Protocolos/Protocolos";
// Componentes panel de administración
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import Admin from "./pages/Admin/Admin";
import AdminEmpleados from "./pages/Admin/AdminEmpleados/AdminEmpleados";
import "bootstrap/dist/css/bootstrap.min.css";
import ProtocolosView from './pages/Protocolos/ProtocolosView';


const App = () => {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/organigrama" element={<Organigrama />} />
          <Route path="/testcalendario" element={<TestCalendario />} />
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
