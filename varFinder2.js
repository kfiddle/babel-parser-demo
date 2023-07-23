import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
const trav = traverse.default;

const code = `
const num = "money";
const jellyroll = num;
const pizza = jellyroll;
`;

const ast = parse(code);

const findOriginalVal = (variable) => {
  if (variable in allScopedVars && typeof allScopedVars[variable] === "string")
    return allScopedVars[variable];
  if (allScopedVars[variable])
    return findOriginalVal(allScopedVars[variable].assignedVar);
};

const allScopedVars = {};

trav(ast, {
  enter(path) {
    if (path.node.type === "VariableDeclarator") {
      if (
        path.node.init.type === "CallExpression" &&
        path.node.init.callee.name === "require"
      ) {
        allScopedVars[path.node.id.name] = {
          assignedVar: path.node.init.arguments[0].value,
        };
      } else allScopedVars[path.node.id.name] = path.node.init.value;
    }
  },
});

console.log(allScopedVars);
