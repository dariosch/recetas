import localforage from "localforage";

const RECETAS_URL = "./recetas.json";

export async function getRecetas() {
  try {
    console.log("entra al try");
    const response = await fetch(RECETAS_URL);
    if (!response.ok) {
      throw new Error("Error al cargar las recetas");
    }
    const recetas = await response.json();
    return recetas;
  } catch (error) {
    // console.log("va por el catch");
    console.error("Error: ", error);
    return [];
  }
}

export async function createReceta() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let receta = { id, createdAt: Date.now() };
  let recetas = await getRecetas();
  contacts.unshift(receta);
  await set(recetas);
  return receta;
}

export async function getReceta(id) {
  await fakeNetwork(`receta:${id}`);
  let recetas = await localforage.getItem("recetas");
  let receta = recetas.find((receta) => receta.id === id);
  return receta ?? null;
}

export async function updateReceta(id, updates) {
  await fakeNetwork();
  let recetas = await localforage.getItem("recetas");
  let receta = recetas.find((receta) => receta.id === id);
  if (!receta) throw new Error("No se encuentra receta para el ", id);
  Object.assign(receta, updates);
  await set(recetas);
  return receta;
}

export async function deleteReceta(id) {
  let recetas = await localforage.getItem("recetas");
  let index = recetas.findIndex((receta) => receta.id === id);
  if (index > -1) {
    recetas.splice(index, 1);
    await set(recetas);
    return true;
  }
  return false;
}

function set(recetas) {
  return localforage.setItem("recetas", recetas);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
