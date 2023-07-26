import * as path from "path";

const getPathArray = (routeString) => {
  const pathParts = routeString.split(path.sep);
  const last = pathParts[pathParts.length - 1];
  if (last.includes("."))
    pathParts[pathParts.length - 1] = last.slice(0, last.indexOf("."));
  return pathParts;
};

const paths = [
  ["asyncFetch", "server", "server"],
  ["asyncFetch", "server", "routes", "devsRoutes"],
  ["asyncFetch", "server", "routes", "usersRoutes"],
  ["asyncFetch", "server", "controllers", "devsController"],
  ["asyncFetch", "client", "components", "app"],
  ["asyncFetch", "client", "components", "header"],
];

// './routes/usersRoutes'
const fullBackEndCreator = (originArr, destString) => {
  const destPathArray = destString.split("/");
  let pathToNewFile = [];
  let dots = 0;

  for (let el of destPathArray) {
    if (el === '..') {
      dots === 0 ? dots -= 2 : dots -= 1;
    } else if (el === '.') dots -= 1;
  }

  pathToNewFile = [...originArr.slice(0, dots), ...destPathArray.filter(el => !el.includes('.'))];
  for (let arr of paths) {
    if (path.join(...arr) === path.join(...pathToNewFile)) return arr;
  }
  return 'no such file';
};

// export default fullBackEndCreator;
console.log(fullBackEndCreator(paths[5], '../../../asyncFetch/client/components/app'));
