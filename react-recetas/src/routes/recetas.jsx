import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getReceta, updateReceta } from "../receta";

export async function loader({ params }) {
  const receta = await getReceta(params.recetaId);
  return { receta };
}

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateReceta(params.recetaId, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function Recetas() {
  const { receta } = useLoaderData();

  return (
    <div id="receta">
      <h1>
        {receta.first || receta.last ? (
          <>
            {receta.first} {receta.last}
          </>
        ) : (
          <i>No name</i>
        )}{" "}
        <Favorite receta={receta} />
      </h1>
      {receta.notes && <p>{receta.notes}</p>}
      <div>
        <Form action="edit">
          <button type="submit">Edit</button>
        </Form>
        <Form
          method="post"
          action="destroy"
          onSubmit={(e) => {
            if (!confirm("Please confirm you want to delete this record.")) {
              e.preventDefault();
            }
          }}
        >
          <button type="submit">Delete</button>
        </Form>
      </div>
    </div>
  );
}

function Favorite({ receta }) {
  const fetcher = useFetcher();
  let favorite = receta.favorite;
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
