import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
const trav = traverse.default;

// const hotdog = 12;
// const jellyroll = 17;
// const donut = num;
// const pizza = jellyroll;

const code = `
const bike = 'hamza';
const newWord = bike;
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

// for (let key in allVarsAndAssings) {
//   if (typeof allVarsAndAssings[key] === "object") {
//     if (allVarsAndAssings[key].assignedVar in allVarsAndAssings) {
//       const storedVar = allVarsAndAssings[key].assignedVar;
//       console.log(
//         "the original stored value of " +
//           key +
//           " is... " +
//           allVarsAndAssings[storedVar]
//       );
//     }
//   }
// }

const findOriginalVal = (variable) => {
  if (
    variable in allVarsAndAssings &&
    typeof allVarsAndAssings[variable] === "string"
  )
    return allVarsAndAssings[variable];
    return findOriginalVal(allVarsAndAssings[variable].assignedVar);
};

console.log(findOriginalVal('airplane'))