//const fs = require("fs");

const INGREDIENTES_FROM_JSON = "./ingredientes.json";

export const actualizarIngsJSON = (nuevosIngredientes) => {
  try {
    //leer el archivo
    const ingredientesJSON = JSON.parse(
      localStorage.getItem(INGREDIENTES_FROM_JSON) || "[]"
    );
    //agrego los nuevos
    ingredientesJSON.push(...nuevosIngredientes);
    localStorage.setItem(
      INGREDIENTES_FROM_JSON,
      JSON.stringify(ingredientesJSON)
    );
    console.log("ingredientes actualizados en local");
    console.log(ingredientesJSON);
  } catch (error) {
    console.error("Hubo un error en la escritura del archivo. ", error);
  }
};
