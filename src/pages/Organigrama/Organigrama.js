/**
 * Componente Organigrama
 *
 * Este componente renderiza un organigrama jerárquico usando D3.js. Utiliza datos obtenidos de una API para construir un gráfico de árbol donde cada nodo representa un empleado con su nombre, título y foto.
 *
 * Estados:
 * - `data`: Almacena la estructura de datos del organigrama.
 * - `svgRef`: Referencia al elemento SVG donde se renderiza el gráfico.
 *
 * Efectos:
 * - `useEffect(() => { ... })`: Realiza una solicitud GET a la API para obtener los datos del organigrama y formatea la estructura de datos usando `transformData`.
 * - `useEffect(() => { ... })`: Llama a `renderChart` cada vez que los datos cambian para actualizar la visualización del organigrama.
 *
 * Funciones:
 * - `transformData`: Transforma los datos de la estructura del árbol para que coincidan con los requerimientos de la visualización (limitando la profundidad del árbol).
 * - `renderChart`: Dibuja el gráfico del organigrama usando D3.js:
 *   - Configura las dimensiones y separaciones.
 *   - Dibuja enlaces y nodos.
 *   - Muestra imágenes de empleados dentro de los nodos.
 *   - Añade nombres y títulos de los empleados como texto en los nodos.
 *
 * UI:
 * - El gráfico se dibuja dentro de un SVG.
 * - Si los datos no están cargados, se muestra un cargador.
 * - Un botón de inicio está disponible para redirigir al usuario a la página de inicio.
 */

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

  const transformData = (node, depth = 0) => {
    if (depth >= 3) {
      return null; 
    }

    return {
      name: `${node.nombre} ${node.apellido_1} ${node.apellido_2}`,
      title: node.rol.rol_display,
      foto: node.foto,
      children: node.children
        ? node.children
            .map((child) => transformData(child, depth + 1))
            .filter((child) => child !== null) 
        : [],
    };
  };

  const renderChart = (data) => {
    const width = 1800; 
    const height = 1900; 

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); 

    const g = svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet") 
      .append("g")
      .attr("transform", `translate(100, 100)`); 

    const treeLayout = d3.tree()
      .size([height - 300, width - 400]) 
      .separation((a, b) => (a.depth === b.depth ? 2 : 1.5));

    const root = d3.hierarchy(data);
    treeLayout(root);

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

    const node = g
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    node.append("circle")
      .attr("r", 30)
      .attr("fill", "#2d2f36")
      .attr("stroke", "#4ecca3")
      .attr("stroke-width", 3);

    node.append("image")
      .attr("xlink:href", (d) => `http://localhost:8000${d.data.foto}`)
      .attr("x", -25) 
      .attr("y", -25)
      .attr("width", 50)
      .attr("height", 50)
      .attr("clip-path", "circle(25px at 25px 25px)");


    node.append("text")
      .attr("dy", 50) 
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("fill", "#f5f5f5")
      .text((d) => d.data.name);

    node.append("text")
      .attr("dy", 70) 
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#a9a9a9")
      .text((d) => d.data.title);
  };

  return (
    <div className="org-chart-container">
      {!data ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <svg ref={svgRef}></svg>
      )}
    </div>
  );
};

export default Organigrama;
