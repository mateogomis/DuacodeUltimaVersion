import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as d3 from "d3";
import "./Organigrama.css";

const Organigrama = () => {
  const [data, setData] = useState(null);
  const svgRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/organigrama");
        const rootData = response.data[0];
        const formattedData = transformData(rootData);
        setData(formattedData);
      } catch (error) {
        console.error("Error al cargar el organigrama:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      renderChart(data);
    }
  }, [data]);

  const transformData = (node) => ({
    name: `${node.nombre} ${node.apellido_1} ${node.apellido_2}`,
    title: node.rol.rol_display,
    foto: node.foto,
    children: node.children ? node.children.map(transformData) : [],
  });

  const renderChart = (data) => {
    const width = 1800; // Incrementar ancho del organigrama
    const height = 1600; // Incrementar altura para más espacio vertical
  
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Limpiar el SVG antes de renderizar
  
    const g = svg
      .attr("viewBox", `0 0 ${width} ${height}`) // Ajustar para ser responsive
      .attr("preserveAspectRatio", "xMidYMid meet") // Mantener proporciones
      .append("g")
      .attr("transform", `translate(100, 100)`); // Margen superior e izquierdo
  
    // Layout del árbol con separación mayor
    const treeLayout = d3.tree()
      .size([height - 300, width - 400]) // Ajustar dimensiones del árbol
      .separation((a, b) => {
        if (a.depth === b.depth) {
          return a.children || b.children ? 2 : 4; // Más separación para nodos hoja
        }
        return 2; // Separación normal para otros nodos
      });
  
    const root = d3.hierarchy(data);
    treeLayout(root);
  
    // Dibujar enlaces
    g.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", d3
        .linkHorizontal()
        .x((d) => d.y)
        .y((d) => d.x)
      );
  
    // Dibujar nodos
    const node = g
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.y},${d.x})`);
  
    // Círculo del nodo
    node.append("circle")
      .attr("r", 30) // Tamaño del círculo
      .attr("fill", "#2d2f36")
      .attr("stroke", "#4ecca3")
      .attr("stroke-width", 3);
  
    // Imagen dentro del círculo
    node.append("image")
      .attr("xlink:href", (d) => `http://localhost:8000${d.data.foto}`)
      .attr("x", -25) // Centrar la imagen dentro del círculo
      .attr("y", -25)
      .attr("width", 50)
      .attr("height", 50)
      .attr("clip-path", "circle(25px at 25px 25px)");
  
    // Nombre del nodo
    node.append("text")
      .attr("dy", 50) // Debajo del círculo
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("fill", "#f5f5f5")
      .text((d) => d.data.name);
  
    // Rol del nodo
    node.append("text")
      .attr("dy", 70) // Más espacio debajo del nombre
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#a9a9a9")
      .text((d) => d.data.title);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <nav className="header-nav">
          <button onClick={() => (window.location.href = "/Proyectos")}>Proyectos</button>
          <button onClick={() => (window.location.href = "/Protocolos")}>Protocolos</button>
          <button onClick={() => (window.location.href = "/Salas")}>Salas</button>
          <button onClick={() => (window.location.href = "/")}>Inicio</button>
        </nav>
      </header>

      <div className="org-chart-container">
        {!data ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <svg ref={svgRef}></svg>
        )}
      </div>
    </div>
  );
};

export default Organigrama;
