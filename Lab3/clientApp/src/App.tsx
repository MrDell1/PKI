import { useState } from "react";
import "./App.css";
import GetScore from "./components/GetScore";
import PutScore from "./components/PutScore";
import SetScore from "./components/SetScore";

function App() {
  const [firstName, setFirstName] = useState("");
  const [response, setResponse] = useState();
  const getJson = (): void => {
    const data = { name: firstName };
    fetch("http://localhost:3000/webresources/RestService", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => setResponse(data));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          name="name"
          value={firstName}
          onChange={(value) => setFirstName(value.target.value)}
        ></input>
        <button onClick={getJson}>Get Json</button>
        {response && <span> {JSON.stringify(response, null, 2)} </span>}
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "32px" }}>
        <SetScore link="wins" name="Wins" />
        <SetScore link="losses" name="Losses" />
        <SetScore link="ties" name="Ties" />
        <GetScore />
      </div>
      <PutScore />
    </div>
  );
}

export default App;
