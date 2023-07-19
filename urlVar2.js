import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
const trav = traverse.default;

import harmonodeParser from "./utils/parseUtil.js";

const code = `
const originalUrl = "http://localhost:3000/players";
const url = originalUrl;

useEffect(() => {
    const getEngineersByJobSpeak = async () => {
        const jsToSend = dash.clickedSpeak;
        if (!jsToSend.engineer_id) {
            let reply = await fetch(url)
            const parsedList = await reply.json();
            dispatch({ type: 'engineersBySpeak', engineers: parsedList.engineers });

            let secondReply = await fetch("http://localhost:3000/jobs")
            const parsedList2 = await secondReply.json();
        }
     }
     if (dash.clickedSpeak) getEngineersByJobSpeak();

}, [dash.clickedSpeak])

`;

console.log(harmonodeParser(code));
