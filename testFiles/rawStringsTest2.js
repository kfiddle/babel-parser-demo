import harmonodeParser from "../utils/parseUtil.js";

const code = `() => {
    const [dash, dispatch] = useReducer(dashReducer, initialState);

    useEffect(() => {
        const getEngineersByJobSpeak = async () => {
            const jsToSend = dash.clickedSpeak;
            if (!jsToSend.engineer_id) {
                let reply = await fetch("http://localhost:3000/players/by_job/otherendpoint")
                const parsedList = await reply.json();
                dispatch({ type: 'engineersBySpeak', engineers: parsedList.engineers });
            }
         }

         const getPeepsTestFunc = async () => {
            const jsToSend = dash.clickedSpeak;
            if (!jsToSend.engineer_id) {
                let reply = await fetch("http://localhost:3000/players/randomendpoint/")
                const parsedList = await reply.json();
                dispatch({ type: 'engineersBySpeak', engineers: parsedList.engineers });
            }
         }

         const getJobsTestFunc = async () => {
            const jsToSend = dash.clickedSpeak;
            if (!jsToSend.engineer_id) {
                let reply = await fetch("http://localhost:3000/jobs/jobid/", {headers: "headers", method: "POST" })
                const parsedList = await reply.json();
                dispatch({ type: 'engineersBySpeak', engineers: parsedList.engineers });
            }
         }
         if (dash.clickedSpeak) getEngineersByJobSpeak();

    }, [dash.clickedSpeak]);

};`

console.log(harmonodeParser(code));