import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Upa!</h1>
      <p>Hubo un error!</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
