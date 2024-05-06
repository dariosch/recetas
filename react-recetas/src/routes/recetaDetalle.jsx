import * as React from "react";
import { useParams } from "react-router-dom";
import recetasData from "../recetas.json";

const RecetaDetalle = () => {
  const { recetaId } = useParams();
  const receta = recetasData.find(
    (receta) => receta.id === parseInt(recetaId, 10)
  );
  if (!receta) {
    return <div>No se encontró la receta</div>;
  }

  return (
    <div>
      <h2>{receta.name}</h2>
      <p>Nombre: {receta.name}</p>
      <p>Facilidad: {receta.easiness}</p>
      <p>Tiempo: {receta.time}</p>
      <p>Ingredientes: {receta.ingredients.join(", ")}</p>
    </div>
  );
};

export default RecetaDetalle;
