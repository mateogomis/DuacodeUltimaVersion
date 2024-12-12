import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const buttons = [
    { path: "/", label: "Inicio" },
    { path: "/organigrama", label: "Organigrama" },
    { path: "/protocolos", label: "Protocolos" },
    { path: "/proyectos", label: "Proyectos" },
    { path: "/calendario", label: "Calendario" },
    { path: "/salas", label: "Salas" },
  ];

  const excludeHeaderRoutes = ["/login", "/admin", "/admin/empleados"];
  const showHeader = !excludeHeaderRoutes.includes(location.pathname);

  return (
    <div className="layout-container">
      {showHeader && (
        <header className="home-header">
          <div className="header-logo"></div>
          <nav className="header-nav">
            {buttons
              .filter((button) => button.path !== location.pathname) 
              .map((button) => (
                <button
                  key={button.path}
                  onClick={() => navigate(button.path)}
                >
                  {button.label}
                </button>
              ))}
          </nav>
          <button
            className="login-button-unique"
            onClick={() => navigate("/login")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-door-open-fill"
              viewBox="0 0 16 16"
            >
              <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15zM11 2h.5a.5.5 0 0 1 .5.5V15h-1zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
            </svg>
          </button>
        </header>
      )}
      <Outlet />
    </div>
  );
};

export default Layout;
