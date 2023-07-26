import harmonodeParser from "../utils/parseUtil1.js";

// import React, { useEffect } from "react";
// const [harmodevs, setHarmodevs] = useState([]);
const code = `
import React, { useEffect } from "react";

function AsyncCall() {
 const [harmodevs, setHarmodevs] = useState([]);

  useEffect(() => {
    const getDevs = async () => {
      const reply = await fetch("http://localhost:3000/harmodevs");
      const parsedList = await reply.json();
      if (parsedList.length > 0) setHarmodevs(parsedList);
    };

    const getCoolStuff = async () => {
      const reply = await fetch("http://localhost:3000/cool_stuff");
      const parsedList2 = await reply.json();
      if (parsedList2.length > 0) console.log(parsedList2);
    };

    getDevs();
    getCoolStuff();
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/harmodevious")
      .then((res) => res.json())
      .then((list) => setHarmodevs(list));
  }, []);

  return <div>Async Call</div>
}

export default AsyncCall;
`;

const finalReturn = `return <div>Async Call</div>`;
const extraChains = `useEffect(() => {
    fetch("http://localhost:3000/harmodevious")
      .then((res) => res.json())
      .then((list) => setHarmodevs(list));
  }, []);`;

console.log(harmonodeParser(code));
