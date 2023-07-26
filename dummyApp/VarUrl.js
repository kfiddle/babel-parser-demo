import harmonodeParser from "../utils/parseUtil1.js";

const code = `
import React, { useEffect } from "react";

function VarUrl() {
  const [users, setUsers] = useState([]);
  const url = "http://localhost:3000/users";

  useEffect(() => {
    fetch("http://localhost:3000/cool_stuff")
      .then((res) => res.json())
      .then((list) => setHarmodevs(list));
  }, []);

  return <div>VarUrl</div>;
}

export default VarUrl;

`;

console.log(harmonodeParser(code));
