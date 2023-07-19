import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
const trav = traverse.default;

const code = `app.use('/players', middleWareFunc)`;

const ast = parse(code);
console.log(ast.program.body);

const serverEndPoints = [];

trav(ast, {
  enter(path) {
    let current = path.node;
    if (
      current.type === "CallExpression" &&
      current.callee.type === "MemberExpression" &&
      current.callee.object.name === "app" &&
      current.callee.property.name === "use"
    ) {
      serverEndPoints.push(current.arguments[0].value);
    }
  },
});

console.log(serverEndPoints)
