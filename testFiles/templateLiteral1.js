import harmonodeParser from "../utils/parseUtil1.js";

const code = "const func = async() => reply = await fetch(`lotsobeer`)"
const code2 = `
const reply = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: 20,
      title: currentVals[0],
      company: currentVals[1],
      salary: currentVals[2],
    }),
  });
`

console.log(harmonodeParser(code));