import harmonodeParser from "../utils/parseUtil.js";

const code = `useEffect(() => {
    const getEngineersByJobSpeak = async () => {
        const jsToSend = dash.clickedSpeak;
        if (!jsToSend.engineer_id) {
            let reply = await fetch("http://localhost:3000/players/by_speak/")
            const parsedList = await reply.json();
            dispatch({ type: 'engineersBySpeak', engineers: parsedList.engineers });
        }
     }
     if (dash.clickedSpeak) getEngineersByJobSpeak();

}, [dash.clickedSpeak])`;

console.log(harmonodeParser(code));
