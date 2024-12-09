import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import "./Organigrama.css";
import "orgchart/dist/css/jquery.orgchart.css";

const Organigrama = () => {
  const [datasource, setDatasource] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/organigrama"
        );
        const rootData = response.data[0];
        const formattedData = transformData(rootData);
        setDatasource(formattedData);
      } catch (error) {
        console.error("Error al cargar el organigrama:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (
      datasource &&
      typeof $ !== "undefined" &&
      typeof $.fn.orgchart !== "undefined"
    ) {
      const container = $("#chart-container");
      container.empty();

      const adjustZoom = () => {
        const width = window.innerWidth;
        const zoomLevel =
          width <= 480 ? 0.6 : width <= 768 ? 0.8 : width <= 1024 ? 0.9 : 1;

        container.css("zoom", zoomLevel);
      };

      // Ajustar zoom inicial y al redimensionar
      adjustZoom();
      window.addEventListener("resize", adjustZoom);

      // Inicializar el organigrama
      container.orgchart({
        data: datasource,
        nodeContent: "title",
        createNode: function ($node, data) {
          $node.addClass("org-chart-node");
          $node.css({
            borderColor: "#4ECCA3",
            backgroundColor: "#2D2F36",
            color: "#F5F5F5",
            maxWidth: "150px",
            whiteSpace: "normal",
            wordWrap: "break-word",
          });

          // Hover
          $node.hover(
            function () {
              $(this).css({
                backgroundColor: "#4ECCA3",
                color: "#1C1E26",
              });
            },
            function () {
              $(this).css({
                backgroundColor: "#2D2F36",
                color: "#F5F5F5",
              });
            }
          );

          // Imagen de perfil
          if (data.foto) {
            $node.prepend(
              `<img src="http://localhost:8000${data.foto}" class="node-photo" alt="${data.name}" style="width: 70px; height: 70px; border-radius: 50%; margin-bottom: 5px;" />`
            );
          }
        },
        render: function () {
          $(".orgchart .lines").css("border-color", "#4ECCA3");
          $(
            ".orgchart .topEdge, .orgchart .bottomEdge, .orgchart .rightEdge, .orgchart .leftEdge"
          ).css({
            borderColor: "#4ECCA3",
            backgroundColor: "#4ECCA3",
          });
          $("path").css("stroke", "#4ECCA3");

          container.find(".node").click(function (event) {
            const $node = $(this);
            const $children = $node.find(".children");

            if ($children.length > 0) {
              $children.toggle();
            }
            event.stopPropagation();
          });

          // Ocultar nodos hijos por defecto
          container.find(".node").first().find(".children").hide();
        },
      });

      // Limpieza del event listener al desmontar
      return () => {
        window.removeEventListener("resize", adjustZoom);
      };
    }
  }, [datasource]);
  const truncateText = (text, maxLength = 20) =>
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  const transformData = (data) => ({
    name: `${data.nombre} ${data.apellido_1} ${data.apellido_2}`,
    title: truncateText(data.rol.rol_display),
    foto: data.foto,
    children: data.children ? data.children.map(transformData) : [],
    collapsed: true,
  });

  return (
    <div id="chart-container" className="org-chart-container">
      {!datasource && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default Organigrama;
