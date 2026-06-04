import { getComponent } from "../util/util";

export default async function <T>({
  api,
  component,
  ...rest
}: {
  api: () => Promise<T>;
  component: any[];
  rest?: any[];
}) {
  // const data = await authenticatedFetch(api);
  const data = await api();
  const [Component, componentList] = getComponent(component);

  return <Component {...{ ...rest, data, component: componentList }} />;
}
