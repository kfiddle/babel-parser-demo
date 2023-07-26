import harmonodeParser from "../utils/parseUtil1.js";

const code = `
import React, { useEffect } from "react";

function PushCall() {
  const [harmodevs, setHarmodevs] = useState([]);

  useEffect(() => {
    const randomPush = async () => {
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
    };

    randomPush();
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/harmodevious")
      .then((res) => res.json())
      .then((list) => setHarmodevs(list));
  }, []);

  return <div>AsyncCall</div>;
}

export default PushCall;
`;


console.log(harmonodeParser(code))