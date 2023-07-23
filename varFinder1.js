import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
const trav = traverse.default;

// const hotdog = 12;
// const jellyroll = 17;
// const donut = num;

const code = `
const num = 4 + 2;
const jellyroll = 17 + 8;
const pizza = 'pepperoniiiii';
`;

const ast = parse(code);

console.log(ast.program.body);

const allVarsAndAssings = [];

trav(ast, {
  enter(path) {
    if (path.node.type === "VariableDeclarator") {
      if (path.node.init.type === "BinaryExpression") {
        allVarsAndAssings.push([
          path.node.id.name,
          path.node.init.left.value,
          path.node.init.right.value,
        ]);
        console.log(typeof path.node.init.left.value); // value of 4
        console.log(path.node.init.right.value); // value of 2
        // console.log(path.node.id.name)
      } else {
        allVarsAndAssings.push([path.node.id.name, path.node.init.value])
      }
    }
  },
});

console.log(allVarsAndAssings);
