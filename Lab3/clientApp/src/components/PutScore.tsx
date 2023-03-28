import { ReactElement, useState } from "react";

export const PutScore = (): ReactElement => {
  const [wins, setWins] = useState<number>();
  const [losses, setLosses] = useState<number>();
  const [ties, setTies] = useState<number>();
  const [response, setResponse] = useState();
  const [error, setError] = useState("");
  const getJson = (): void => {
    if (wins && losses && ties) {
      setError("");
      fetch(`http://localhost:3000/score/${wins}&${losses}&${ties}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setResponse(data));
    } else {
      setError("You have to fill all inputs");
    }
  };
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
        <input
          type="number"
          name="wins"
          value={wins}
          onChange={(value) => setWins(Number(value.target.value))}
        ></input>
        <input
          type="number"
          name="losses"
          value={losses}
          onChange={(value) => setLosses(Number(value.target.value))}
        ></input>
        <input
          type="number"
          name="ties"
          value={ties}
          onChange={(value) => setTies(Number(value.target.value))}
        ></input>
      </div>
      <button onClick={getJson}>Update Score</button>
      {response && <span> {JSON.stringify(response, null, 2)} </span>}
      {error && <span style={{ color: "red" }}>{error}</span>}
    </div>
  );
};

export default PutScore;
