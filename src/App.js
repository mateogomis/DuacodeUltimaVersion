import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
// import About from "./pages/About/About";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Organigrama from "./pages/Organigrama/Organigrama"
import Proyectos from "./pages/Proyectos/Proyectos";

// App component
const App = () => {
  const location = useLocation(); // Obtén la ruta actual

  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/organigrama" element={<Organigrama />} />
          <Route path="/login" element={<Login />} />
          <Route path="/proyectos" element={<Proyectos />} />
        </Routes>
      </main>
      {/* Renderiza el Footer solo si no estás en la página de login */}
      {location.pathname !== "/login" && <Footer />}
    </div>
  );
};

// AppWrapper for Router
const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;