export const getComponent = (componentList: any[]) => {
  return componentList.length
    ? [componentList[0], componentList.slice(1)]
    : [componentList, componentList];
};
