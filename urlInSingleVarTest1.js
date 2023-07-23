import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
const trav = traverse.default;

import harmonodeParser from "./utils/parseUtil1.js";

const code = `
const url = "localhost:3000/tim/sebastian/hamza/eric";

useEffect(() => {
    const getEngineersByJobSpeak = async () => {
        const jsToSend = dash.clickedSpeak;
        if (!jsToSend.engineer_id) {
            let reply = await fetch(url)
            const parsedList = await reply.json();
            dispatch({ type: 'engineersBySpeak', engineers: parsedList.engineers });
        }
     }
     if (dash.clickedSpeak) getEngineersByJobSpeak();

}, [dash.clickedSpeak])
`;

console.log(harmonodeParser(code));
