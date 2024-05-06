import React from "react";
import { Link } from "react-router-dom";

export default function ListaRecetas({ recetas }) {
  return (
    <div>
      <p>Recetas posibles:</p>
      <ul>
        {recetas.map((receta) => (
          <li key={receta.id}>
            <Link to={`receta/${receta.id}`}> ✔ {receta.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
