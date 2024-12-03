import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faFolderOpen, faFileAlt, faBuilding, faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './Admin.css';

const AdminPanel = () => {
  const navigate = useNavigate();

  const sections = [
    { name: "Empleados", path: "/admin/empleados", icon: faUserTie },
    { name: "Proyectos", path: "/admin/proyectos", icon: faFolderOpen },
    { name: "Protocolos", path: "admin/protocolos", icon: faFileAlt },
    { name: "Sedes", path: "admin/sedes", icon: faBuilding },
  ];

  // Función para manejar el logout
  const handleLogout = () => {
    // Eliminar cualquier información de sesión, por ejemplo, tokens
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // Redirigir a la página de inicio o login
    navigate('/');
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Panel de Administración</h1>
      <Row className="g-4">
        {sections.map((section, index) => (
          <Col key={index} xs={6} md={3}>
            <Card className="text-center shadow-sm h-100">
              <Card.Body>
                <div
                  className="display-3 mb-3"
                  style={{ fontSize: "4rem", lineHeight: "1" }}
                >
                  <FontAwesomeIcon icon={section.icon} />
                </div>
                <Card.Title>{section.name}</Card.Title>
                <Link to={section.path} className="stretched-link" />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Sección para redirigir a la página principal */}
      <Row className="mt-4">
        <Col className="text-center">
          <Link to="/" className="btn btn-primary">
            <FontAwesomeIcon icon={faHome} /> Página Principal
          </Link>
        </Col>
      </Row>

      {/* Botón de Logout */}
      <Row className="mt-4">
        <Col className="text-center">
          <Button variant="danger" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPanel;

