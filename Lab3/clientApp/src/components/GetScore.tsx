import { ReactElement, useState } from "react";

export const GetScore = (): ReactElement => {
  const [response, setResponse] = useState();
  const getJson = (): void => {
    fetch(`http://localhost:3000/score/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setResponse(data));
  };
  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", gap: "8px" }}
    >
      <button onClick={getJson}>Get Score</button>
      {response && <span> {JSON.stringify(response, null, 2)} </span>}
    </div>
  );
};

export default GetScore;
