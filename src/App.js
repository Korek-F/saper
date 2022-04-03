import React, { useEffect, useState } from "react";
import { Saper } from "./components/Saper";

function App() {
  const [boxSize, setBoxSize] = useState()
  const [rowNumber, setRowNumber] = useState(10)
  const [columnNumber, setColumnNumber] = useState(10)
  const [bombPercent, setBombPercent] = useState(8)
  const [gameStart, setGameStart] = useState(false)

  //Change the widht and height of game box
  useEffect(() => {
    const height = document.documentElement.clientHeight
    const width = document.documentElement.clientWidth
    console.log(height, width)
    if (width >= height) {
      setBoxSize(height - 100)
    } else {
      setBoxSize(width - 100)
    }

  }, [])

  return (
    <>
      {gameStart ?
        <Saper boxSize={boxSize}
          rowNumber={rowNumber}
          columnNumber={columnNumber}
          bombPercent={bombPercent} />
        :
        <div className="game-modal"
          style={{ width: boxSize, height: boxSize }}>
          <label>Rows Number</label>
          <input type="range"
            min={5} max={20}
            value={rowNumber}
            onChange={(e) => setRowNumber(Number(e.target.value))} />
          {rowNumber}
          <br />
          <label>Columns Number</label>
          <input type="range"
            min={5} max={20}
            value={columnNumber}
            onChange={(e) => setColumnNumber(Number(e.target.value))} />
          {columnNumber}
          <br />
          <button onClick={() => setGameStart(true)}>
            Start Game
          </button>
        </div>
      }
    </>
  );
}

export default App;
