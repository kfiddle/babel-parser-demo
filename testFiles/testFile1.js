import harmonodeParser from "../utils/parseUtil1.js";
// import fetchParser from "../utils/clientParserChatGpt.js";

const code = `
    const getPlayers = async () => {
    const reply = await fetch('someurl/xingineers');
    const parsedReply = await reply.json();
    setSomething(parsedReply);
}`;

console.log(harmonodeParser(code));
// console.log(fetchParser(code))
