import Ingredientes from "./ingredientes";
import React, { useState, useEffect } from "react";
import recetasData from "../recetas.json";
import ListaRecetas from "./ListaRecetas";
import { Outlet, useNavigate } from "react-router-dom";
import ingredientesData from "../ingredientes.json";

export default function Root() {
  const [ingredientes, setIngredientes] = useState([]);
  const [nuevoIngrediente, setNuevoIngrediente] = useState("");
  const [recetasPosibles, setRecetasPosibles] = useState([]);
  const navigate = useNavigate();

  const addNuevoIngrediente = (value) => {
    if (value.trim() !== "") {
      if (!ingredientes.find((ingrediente) => ingrediente === value)) {
        const nuevosIngredientes = [...ingredientes, value];
        setIngredientes(nuevosIngredientes);
        setNuevoIngrediente("");
      } else alert("El ingrediente ya existe");
    }
  };

  useEffect(() => {
    setIngredientes(ingredientesData);
    setRecetasPosibles(recetasData);
  }, []);

  const resetData = () => {
    setIngredientes([]);
    setRecetasPosibles([]);
    navigate("/");
  };

  const handleVerIdeasClick = () => {
    const recetasFiltradas = recetasData.filter((receta) =>
      receta.ingredients.every((ingredienteReceta) =>
        ingredientes.includes(ingredienteReceta)
      )
    );
    setRecetasPosibles(recetasFiltradas);
  };

  return (
    <>
      <div id="sidebar">
        <h1>Recipes</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search recipes"
              placeholder="Buscar"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">Recetas!</button>
          </form>
        </div>
        <nav>
          <h3>Selecciona los ingredientes:</h3>
          <Ingredientes
            ingredientes={ingredientes}
            onIngredientesChange={setIngredientes}
          />
          <div className="input-caption">
            <input
              className="input-new"
              type="text"
              value={nuevoIngrediente}
              placeholder="Nuevo Ingrediente"
              onChange={(e) => setNuevoIngrediente(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addNuevoIngrediente(e.target.value);
                }
              }}
            ></input>
            <button
              className="btn-input-new"
              onClick={() => addNuevoIngrediente(nuevoIngrediente)}
            >
              Agregar
            </button>
          </div>
          <br></br>
          <br />
          <button onClick={handleVerIdeasClick}>2- Ver ideas!</button>
        </nav>
        <button onClick={resetData}>Reset todo</button>
      </div>
      <div id="detail">
        <ListaRecetas recetas={recetasPosibles} />
        <Outlet />
      </div>
    </>
  );
}
