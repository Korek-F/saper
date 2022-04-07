import React, { useEffect, useState } from "react";
import { GameStartWindow } from "./components/GameStartWindow";
import { Saper } from "./components/Saper";
function App() {
  const [boxSize, setBoxSize] = useState()
  const [rowNumber, setRowNumber] = useState(10)
  const [columnNumber, setColumnNumber] = useState(10)
  const [bombPercent, setBombPercent] = useState(15)
  const [gameStart, setGameStart] = useState(false)
  const [alcomode, setAlcomode] = useState(false)
  //Change the widht and height of game box
  useEffect(() => {
    const height = document.documentElement.clientHeight
    const width = document.documentElement.clientWidth
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
          bombPercent={bombPercent}
          alcomode={alcomode}
        />
        :
        <GameStartWindow boxSize={boxSize} rowNumber={rowNumber}
          setRowNumber={setRowNumber} columnNumber={columnNumber}
          setColumnNumber={setColumnNumber} bombPercent={bombPercent}
          setBombPercent={setBombPercent} setGameStart={setGameStart}
          alcomode={alcomode} setAlcomode={setAlcomode} />
      }
    </>
  );
}

export default App;
