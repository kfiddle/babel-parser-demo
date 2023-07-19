const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const code =
  "const someFunc = (num) => num + 2; let donut = someFunc(4); console.log(donuzz); let dog = 'sheep';";

const ast = parse(code);
// console.log(ast.program.body[2]);
// console.log(ast.program.body[2]);

const varsList = [];

traverse(ast, {
  enter(path) {
    if (path.node.type === 'Identifier') varsList.push(path.node.name)
    if (path.node.name !== undefined) console.log(path.node.name)
  },
  exit(path) {
    if (path.node.value !== undefined) console.log(`Exited ${path.node.value}`);
  },
});

console.log(varsList)