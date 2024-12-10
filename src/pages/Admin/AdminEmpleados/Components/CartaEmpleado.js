import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";  // Importar Button
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';  // Icono de cerrar

const CartaEmpleado = ({ empleado, onClose }) => {
  return (
    <Card className="mt-4 shadow-lg border-light" style={{ borderRadius: "15px", overflow: "hidden" }}>
      <Card.Body className="p-4">
        {/* Botón de cierre dentro de la carta */}
        <Button 
          variant="link" 
          className="position-absolute top-0 end-0 p-2 text-dark" 
          onClick={onClose}  // Llamada a la función onClose
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </Button>

        {/* Título elegante */}
        <Card.Title className="text-center mb-4" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight: "bold", fontSize: "1.5rem" }}>
          <h3>{empleado.nombre} {empleado.apellido_1} {empleado.apellido_2}</h3>
        </Card.Title>

        <Row className="g-1"> {/* Reducción del espacio entre las columnas */}
          <Col xs={12} md={3}>
            <h5 className="fs-4 mb-1" style={{ color: "#007bff" }}>Email:</h5>
            <p className="mb-1" style={{ fontStyle: "italic" }}>{empleado.email}</p>
          </Col>
          <Col xs={12} md={3}>
            <h5 className="fs-4 mb-1" style={{ color: "#007bff" }}>Teléfono:</h5>
            <p className="mb-1" style={{ fontStyle: "italic" }}>{empleado.telefono}</p>
          </Col>
          <Col xs={12} md={3}>
            <h5 className="fs-4 mb-1" style={{ color: "#007bff" }}>Cargo:</h5>
            <p className="mb-1" style={{ fontStyle: "italic" }}>{empleado.rol?.rol_display || empleado.rol_text}</p>
          </Col>
          <Col xs={12} md={3}>
            <h5 className="fs-4 mb-1" style={{ color: "#007bff" }}>Sede:</h5>
            <p className="mb-1" style={{ fontStyle: "italic" }}>{empleado.sede.nombre}</p>
          </Col>
          <Col xs={12} md={3}>
            <h5 className="fs-4 mb-1" style={{ color: "#007bff" }}>Baja:</h5>
            <p className="mb-1" style={{ fontStyle: "italic" }}>{empleado.baja ? "Sí" : "No"}</p>
          </Col>
          <Col xs={12} md={3}>
            <h5 className="fs-4 mb-1" style={{ color: "#007bff" }}>Excedencia:</h5>
            <p className="mb-1" style={{ fontStyle: "italic" }}>{empleado.excedencia ? "Sí" : "No"}</p>
          </Col>
          <Col xs={12} md={3}>
            <h5 className="fs-4 mb-1" style={{ color: "#007bff" }}>Teletrabajo:</h5>
            <p className="mb-1" style={{ fontStyle: "italic" }}>{empleado.teletrabajo ? "Sí" : "No"}</p>
          </Col>
          <Col xs={12} md={3}>
            <h5 className="fs-4 mb-1" style={{ color: "#007bff" }}>Vacaciones:</h5>
            <p className="mb-1" style={{ fontStyle: "italic" }}>{empleado.vacaciones ? "Sí" : "No"}</p>
          </Col>
          {empleado.foto && (
            <Col xs={12} md={3}>
              <h5 className="fs-4 mb-1" style={{ color: "#007bff" }}>Foto:</h5>
              <img
                src={`http://localhost:8000/media/${empleado.foto}`}
                alt="Foto"
                className="img-fluid rounded"
              />
            </Col>
          )}
          {empleado.qr_code && (
            <Col xs={12} md={3}>
              <h5 className="fs-4 mb-1" style={{ color: "#007bff" }}>Código QR:</h5>
              <img
                src={`http://localhost:8000/media/${empleado.qr_code}`}
                alt="QR"
                width="50"  // Reducido el tamaño del QR
                className="img-fluid rounded"
              />
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CartaEmpleado;




