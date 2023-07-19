const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const code = "2 + (4 * 10)";

const ast = parse(code);

// console.log(ast.program.body[0].expression.right.left.value)
// console.log(ast.program.body[0].expression);

let breadthFirstAst = function (ast) {
  let queue = [ast];
  let allVals = [];
  let current = ast;
  while (queue.length > 0) {
    current = queue.shift();
    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
    if (current.type === "BinaryExpression") allVals.push(current.operator);
    console.log(current.type);
  }
  return allVals;
};

// console.log(breadthFirstAst(ast.program.body[0].expression));

traverse(ast, {
  enter(path) {
    console.log(`Entered ${path.node.value}`);
  },
  exit(path) {
    console.log(`Exited ${path.node.value}`);
  },
});
