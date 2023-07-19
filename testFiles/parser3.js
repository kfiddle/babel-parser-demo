const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const code = `
    const getPlayers = async () => {
    const reply = await fetch('someurl/players');
    const parsedReply = await reply.json();
    setSomething(parsedReply);
}`;

const ast = parse(code);
console.log(ast.program.body[0]);

const urlsList = [];

traverse(ast, {
  enter(path) {
    if (
      path.node.type === "AwaitExpression" &&
      path.node.argument.callee.name === "fetch"
    ) {
      urlsList.push(path.node.argument.arguments[0].value);
    }
  },
  //   exit(path) {
  //     if (path.node.value !== undefined) console.log(`Exited ${path.node.value}`);
  //   },
});

console.log(urlsList);
