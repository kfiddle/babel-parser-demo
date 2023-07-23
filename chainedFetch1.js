import harmonodeParser from "./utils/parseUtil1.js";

const code = `
fetch('pizzaendpoint').then(data => data.json())
`;

const code1 = `
fetch('pizzabeerendpoint').then(data => data.json()).then(res => console.log(res)).catch(err => () => console.log(err));
`;

console.log(harmonodeParser(code1));
