import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Row, Col, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const AdminEmpleados = () => {
  const navigate = useNavigate();
  const [empleados, setEmpleados] = useState([]);
  const [filteredEmpleados, setFilteredEmpleados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);  // Estado para mostrar la modal
  const [currentEmployee, setCurrentEmployee] = useState(null); // Estado para almacenar los datos del empleado a editar
  const employeesPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:8000/api/empleados/")
      .then((response) => response.json())
      .then((data) => {
        setEmpleados(data);
        setFilteredEmpleados(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error al obtener los empleados:", error));
  }, []);

  useEffect(() => {
    const filtered = empleados.filter((empleado) =>
      `${empleado.nombre} ${empleado.apellido_1} ${empleado.apellido_2}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredEmpleados(filtered);
  }, [searchTerm, empleados]);

  const handleEdit = (empleado) => {
    setCurrentEmployee(empleado);  // Establecer el empleado que se va a editar
    setShowModal(true);  // Mostrar la modal
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      fetch(`http://localhost:8000/api/empleados/${id}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            setEmpleados((prev) => prev.filter((emp) => emp.id !== id));
          } else if (response.status === 401) {
            return fetch("http://localhost:8000/auth/token/refresh/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refresh: refreshToken }),
            })
              .then((res) => res.json())
              .then((data) => {
                localStorage.setItem("access_token", data.access);
                return fetch(`http://localhost:8000/api/empleados/${id}/`, {
                  method: "DELETE",
                  headers: {
                    "Authorization": `Bearer ${data.access}`,
                    "Content-Type": "application/json",
                  },
                });
              });
          } else {
            throw new Error("Error al eliminar el empleado");
          }
        })
        .catch((error) => console.error("Error al eliminar el empleado:", error));
    }
  };

  // Función para cerrar la modal
  const closeModal = () => {
    setShowModal(false);
    setCurrentEmployee(null); // Limpiar los datos del empleado
  };

  // Función para guardar los cambios
const handleSave = () => {
  // Verifica que el id del empleado esté presente
  if (!currentEmployee.id) {
    alert("El ID del empleado no es válido.");
    return;
  }

  const updatedEmployee = {
    nombre: currentEmployee.nombre,
    apellido_1: currentEmployee.apellido_1,
    apellido_2: currentEmployee.apellido_2,
    email: currentEmployee.email,
    telefono: currentEmployee.telefono,
    rol: currentEmployee.rol,
    sede: currentEmployee.sede,
    baja: currentEmployee.baja,
    excedencia: currentEmployee.excedencia,
    teletrabajo: currentEmployee.teletrabajo,
    vacaciones: currentEmployee.vacaciones,
    foto: currentEmployee.foto,
    qr_code: currentEmployee.qr_code,
  };

  const accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
    alert("No se encontró un token de acceso válido.");
    return;
  }

  fetch(`http://localhost:8000/api/empleados/${currentEmployee.id}/`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEmployee),
  })
    .then((response) => {
      if (response.ok) {
        setEmpleados((prev) =>
          prev.map((emp) =>
            emp.id === currentEmployee.id ? updatedEmployee : emp
          )
        );
        closeModal();
      } else {
        return response.json().then((data) => {
          alert(`Error: ${data.detail || "Hubo un error al actualizar el empleado."}`);
        });
      }
    })
    .catch((error) => console.error("Error al actualizar el empleado:", error));
};


  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmpleados.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Row className="mb-3">
        <Col>
          <h2>Listado de Empleados</h2>
        </Col>
        <Col className="text-end">
          <Form.Control
            type="text"
            placeholder="Buscar empleado..."
            className="me-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ display: 'inline-block', width: 'auto' }}
          />
          <Button variant="primary" className="me-2" onClick={() => navigate('/empleados/nuevo')}>
            Nuevo Empleado
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Volver
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Sede</th>
            <th>Baja</th>
            <th>Excedencia</th>
            <th>Teletrabajo</th>
            <th>Vacaciones</th>
            <th>Foto</th>
            <th>Código QR</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.length > 0 ? (
            currentEmployees.map((empleado) => (
              <tr key={empleado.id}>
                <td>{empleado.id}</td>
                <td>{empleado.nombre}</td>
                <td>{empleado.apellido_1} {empleado.apellido_2}</td>
                <td>{empleado.email}</td>
                <td>{empleado.telefono}</td>
                <td>{empleado.rol?.nombre || "Sin rol"}</td>
                <td>{empleado.sede?.nombre || "Sin sede"}</td>
                <td>{empleado.baja ? "Sí" : "No"}</td>
                <td>{empleado.excedencia ? "Sí" : "No"}</td>
                <td>{empleado.teletrabajo ? "Sí" : "No"}</td>
                <td>{empleado.vacaciones ? "Sí" : "No"}</td>
                <td>
                  <img
                    src={empleado.foto}
                    alt={`Foto de ${empleado.nombre}`}
                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }}
                  />
                </td>
                <td>
                  <img
                    src={empleado.qr_code}
                    alt={`QR de ${empleado.nombre}`}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(empleado)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(empleado.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="14" className="text-center">
                No hay empleados que coincidan con la búsqueda.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Paginación */}
      <div className="d-flex justify-content-center mt-4">
        <Button
          variant="secondary"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="me-2"
        >
          Anterior
        </Button>
        <Button
          variant="secondary"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastEmployee >= filteredEmpleados.length}
        >
          Siguiente
        </Button>
      </div>

      {/* Modal de edición */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentEmployee && (
            <Form>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={currentEmployee.nombre}
                  onChange={(e) =>
                    setCurrentEmployee({ ...currentEmployee, nombre: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formApellido1">
                <Form.Label>Primer Apellido</Form.Label>
                <Form.Control
                  type="text"
                  value={currentEmployee.apellido_1}
                  onChange={(e) =>
                    setCurrentEmployee({ ...currentEmployee, apellido_1: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formApellido2">
                <Form.Label>Segundo Apellido</Form.Label>
                <Form.Control
                  type="text"
                  value={currentEmployee.apellido_2}
                  onChange={(e) =>
                    setCurrentEmployee({ ...currentEmployee, apellido_2: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={currentEmployee.email}
                  onChange={(e) =>
                    setCurrentEmployee({ ...currentEmployee, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  value={currentEmployee.telefono}
                  onChange={(e) =>
                    setCurrentEmployee({ ...currentEmployee, telefono: e.target.value })
                  }
                />
              </Form.Group>
              {/* Agrega más campos según sea necesario */}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminEmpleados;
