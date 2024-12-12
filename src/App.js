import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Organigrama from "./pages/Organigrama/Organigrama";
import Proyectos from "./pages/Proyectos/Proyectos";
import Calendario from "./pages/Calendario/Calendario";
import Salas from "./pages/Salas/Salas";
import Protocolos from "./pages/Protocolos/Protocolos";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import Admin from "./pages/Admin/Admin";
import AdminEmpleados from "./pages/Admin/AdminEmpleados/AdminEmpleados";
import Layout from "./pages/Layout/Layout";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/organigrama" element={<Organigrama />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/salas" element={<Salas />} />
        <Route path="/protocolos" element={<Protocolos />} />
      </Route>

      <Route path="/login" element={<Login />} />
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

      <Route path="*" element={<NotFound />} />
    </Routes>
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
