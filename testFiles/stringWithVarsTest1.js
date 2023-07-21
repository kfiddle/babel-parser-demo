import harmonodeParser from "../utils/parseUtil1.js";

const code = `useEffect(() => {
    const getEngineersByJobSpeak = async () => {
        const job = "by_job";
        if (!jsToSend.engineer_id) {
            let reply = await fetch("http://localhost:3000/players/" + job)
            const parsedList = await reply.json();
            dispatch({ type: 'engineersBySpeak', engineers: parsedList.engineers });
        }
     }
     if (dash.clickedSpeak) getEngineersByJobSpeak();

}, [dash.clickedSpeak])`;


console.log(harmonodeParser(code));
