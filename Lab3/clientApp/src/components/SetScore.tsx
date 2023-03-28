import { ReactElement, useState } from "react";

type Props = {
  link: string;
  name: string;
};

export const SetScore = ({ link, name }: Props): ReactElement => {
  const [response, setResponse] = useState();
  const getJson = (): void => {
    fetch(`http://localhost:3000/score/${link}`, {
      method: "POST",
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
      <button onClick={getJson}>Increment {name}</button>
      {response && <span> {JSON.stringify(response, null, 2)} </span>}
    </div>
  );
};

export default SetScore;
