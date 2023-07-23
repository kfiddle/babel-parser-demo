import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
const trav = traverse.default;

// const hotdog = 12;
// const jellyroll = 17;
// const donut = num;
// const pizza = jellyroll;

const code = `
const devsRoutes = 'routes/devs';
const newWord = devsRoutes;
const thirdRef = newWord;
const airplane = thirdRef;
`;

const ast = parse(code);

// console.log(ast.program.body);

const allVarsAndAssings = {};

trav(ast, {
  enter(path) {
    if (path.node.type === "VariableDeclarator") {
      if (path.node.init.type === "Identifier") {
        allVarsAndAssings[path.node.id.name] = {
          assignedVar: path.node.init.name,
        };
      } else allVarsAndAssings[path.node.id.name] = path.node.init.value;
    }
  },
});

console.log(allVarsAndAssings);

const findOriginalVal = (variable) => {
  if (
    variable in allVarsAndAssings &&
    typeof allVarsAndAssings[variable] === "string"
  )
    return allVarsAndAssings[variable];
    return findOriginalVal(allVarsAndAssings[variable].assignedVar);
};

console.log(findOriginalVal('airplane'))