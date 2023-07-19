import harmonodeParser from "../utils/parseUtil.js";

const code = `
    const getPlayers = async () => {
    const reply = await fetch('someurl/xingineers');
    const parsedReply = await reply.json();
    setSomething(parsedReply);
}`;

console.log(harmonodeParser(code));
