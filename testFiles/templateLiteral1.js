import harmonodeParser from "../utils/parseUtil1.js";

const code = "const func = async() => reply = await fetch(`lotsobeer`)"

console.log(harmonodeParser(code));