/**
 * Creates a path with parameters from a template.
 */
const createPath = (template: string, parameters?: { [key: string]: any }) => {
  if (!parameters) {
    return template;
  }

  let path = template;
  Object.keys(parameters).forEach((param) => {
    path = path.replace(`:${param}`, parameters[param]);
  });

  return path;
};

export default createPath;
