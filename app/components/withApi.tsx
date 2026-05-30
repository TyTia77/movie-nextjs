import { authenticatedFetch } from "../api/fetch";
import { getComponent } from "../util/util";

export default async function ({ api, component, ...rest }) {
  const data = await authenticatedFetch(api);
  const [Component, componentList] = getComponent(component);

  return <Component {...{ ...rest, data, component: componentList }} />;
}
