import { authenticatedFetch } from "../api/fetch";

export default async function ({ api, component: Component, ...rest }) {
  const data = await authenticatedFetch(api);

  return <Component {...{ ...rest, data }} />;
}
