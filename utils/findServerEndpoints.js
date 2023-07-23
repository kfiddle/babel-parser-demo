import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
const trav = traverse.default;

// * below is DIFFERENT from version in harmonode as of sunday, 23

const endPoints = (codeString) => {
  const ast = parse(codeString);
  const serverEndPoints = [];
  const routesObj = {};
  const importedRoutes = {};

  trav(ast, {
    enter(path) {
      if (path.node.type === "VariableDeclarator") {
        if (
          path.node.init.type === "CallExpression" &&
          path.node.init.callee.name === "require"
        ) {
          importedRoutes[path.node.id.name] = path.node.init.arguments[0].value;
        }
      }
    },
  });


  const findOriginalVal = (variable) => {
    if (
      variable in importedRoutes &&
      typeof importedRoutes[variable] === "string"
    )
      return importedRoutes[variable];
    return 'deadEnd';
  };

  trav(ast, {
    enter(path) {
      let current = path.node;
      if (
        current.type === "CallExpression" &&
        current.callee.type === "MemberExpression" &&
        current.callee.object.name === "app" &&
        current.callee.property.name === "use"
      ) {
        if (current.arguments[0].value) {
          serverEndPoints.push(current.arguments[0].value);
          if (
            current.arguments[1] &&
            current.arguments[1].type === "Identifier"
          ) {
            const nextInLine = current.arguments[1];
            serverEndPoints.push(findOriginalVal(current.arguments[1].name));
            routesObj[nextInLine.name] = findOriginalVal(nextInLine.name)
          }
        }
      }
    },
  });

  // return serverEndPoints;
  return routesObj;
};

export default endPoints;
