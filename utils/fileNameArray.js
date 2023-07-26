import * as path from "path";

const getPathArray = (routeString) => {
  const pathParts = routeString.split(path.sep);
  const last = pathParts[pathParts.length - 1];
  if (last.includes("."))
    pathParts[pathParts.length - 1] = last.slice(0, last.indexOf("."));
  return pathParts;
};

const paths = [
  ["asynFetch", "server", "server"],
  ["asynFetch", "server", "routes", "devsRoutes"],
  ["asynFetch", "server", "routes", "usersRoutes"],
  ["asynFetch", "server", "controllers", "devsController"],
  ["asynFetch", "client", "components", "app"],
  ["asynFetch", "client", "components", "header"],
];

// './routes/usersRoutes'
const fullBackEndCreator = (originArr, destString) => {
  const destPathArray = destString.split("/");
  let pathToNewFile = [];
  let dots = 0;

  // if (destPathArray[0] === "..") dots = -2;
  // else if (destPathArray[0] === ".") dots = -1;
  // else dots = 0;

  for (let el of destPathArray) {
    if (el === '..') dots -= 2;
    else if (el === '.') dots -= 1;
  }

  pathToNewFile = [...originArr.slice(0, dots), ...destPathArray.slice(1)];
  for (let arr of paths) {
    if (path.join(...arr) === path.join(...pathToNewFile)) return arr;
  }
  return 'no such file';
};

// export default fullBackEndCreator;
console.log(fullBackEndCreator(paths[5], '.././client/components/app' ));
