import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
const trav = traverse.default;

const harmonodeParser = (codeString) => {
  const ast = parse(codeString);
  const urlsList = [];

  // * if in trouble, allScopedVars should be object, NOT array
  const allScopedVars = [];

  trav(ast, {
    enter(path) {
      if (path.node.type === "VariableDeclarator") {
        if (path.node.init.type === "Identifier") {
          allScopedVars[path.node.id.name] = {
            assignedVar: path.node.init.name,
          };
        } else allScopedVars[path.node.id.name] = path.node.init.value;
      }
    },
  });

  // Identifier vs StringLiteral

  const findOriginalVal = (variable) => {
    if (
      variable in allScopedVars &&
      typeof allScopedVars[variable] === "string"
    )
      return allScopedVars[variable];
    return findOriginalVal(allScopedVars[variable].assignedVar);
  };

  trav(ast, {
    enter(path) {
      if (
        path.node.type === "CallExpression" &&
        path.node.callee.name === "fetch"
      ) {
        const fetchArg = path.node.arguments[0];
        if (fetchArg.type === "StringLiteral") {
          urlsList.push(fetchArg.value);
        } else if (fetchArg.type === "TemplateLiteral") {
          urlsList.push(fetchArg.quasis[0].value.raw);
        } 
        else urlsList.push(findOriginalVal(fetchArg.name));
      }
    },
  });

  return urlsList;
};

export default harmonodeParser;

// fetch arguments[0] can be of types:
//    StringLiteral -> good, this one's easier
//    node of type Identifier
//    BinaryExpression ->
// will have operator of '+'

//    TemplateLiteral

// look into below exiting each node if necessary
