import harmonodeParser from "./utils/parseUtil1.js";

const code = `
fetch('pizzaendpoint').then(data => data.json())
`;

console.log(harmonodeParser(code));
