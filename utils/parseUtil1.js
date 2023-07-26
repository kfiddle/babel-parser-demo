import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
const trav = traverse.default;

const harmonodeParser = (codeString) => {
  // const ast = parse(codeString);

  const ast = parse(codeString, {
    sourceType: 'module',
    plugins: ['jsx'],
  });
  const urlsList = [];

  // * if in trouble, allScopedVars should be object, NOT array
  const allScopedVars = [];

  trav(ast, {
    enter(path) {
      // If node is a variable declarator and has an identifier and initializer
      if (
        path.node.type === 'VariableDeclarator' &&
        path.node.id &&
        path.node.init
      ) {
        // If the init node is an identifier
        if (path.node.init.type === 'Identifier') {
          if (path.node.id.name)
            // Store the name and value of the scoped variable
            allScopedVars[path.node.id.name] = {
              assignedVar: path.node.init.name,
            };
        } else if (path.node.id.name)
          // Else, directly store the value of the variable
          allScopedVars[path.node.id.name] = path.node.init.value;
      }
    },
    // enter(path) {
    //   if (path.node.type === "VariableDeclarator") {
    //     if (path.node.init.type === "Identifier") {
    //       allScopedVars[path.node.id.name] = {
    //         assignedVar: path.node.init.name,
    //       };
    //     } else allScopedVars[path.node.id.name] = path.node.init.value;
    //   }
    // },
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
