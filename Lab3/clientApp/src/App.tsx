import { useState } from 'react'
import './App.css'


function App() {
  const [firstName, setFirstName] = useState("")
  const [response, setResponse] = useState();
  const getJson = ():void => {
    const data = {name: firstName};
    fetch("http://localhost:3000/webresources/RestService/", 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }
    ).then((response) => {
      setResponse(response);
    })
  }

  return (
    <div className="App">
      <input type="text" name="name" value={firstName} onChange={() => setFirstName}></input>
      <button onClick={getJson}>Get Json</button>
      {response && (<span> {response} </span>)}
    </div>
  )
}

export default App
