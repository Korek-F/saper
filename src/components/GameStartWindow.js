import React from 'react'

export const GameStartWindow = ({ boxSize, rowNumber,
    setRowNumber, columnNumber,
    setColumnNumber, bombPercent,
    setBombPercent, setGameStart, alcomode, setAlcomode }) => {

    return (
        <div className="game-modal"
            style={{
                width: boxSize,
                height: boxSize,
                fontSize: boxSize / 22 + "px",
            }}>

            <label>Rows Number</label>
            <input type="range"
                min={5} max={40}
                value={rowNumber}
                onChange={(e) => setRowNumber(Number(e.target.value))} />
            {rowNumber}
            <br />

            <label>Columns Number</label>
            <input type="range"
                min={5} max={40}
                value={columnNumber}
                onChange={(e) => setColumnNumber(Number(e.target.value))} />
            {columnNumber}
            <br />

            <label>Bombs</label>
            <input type="range"
                min={5} max={60}
                value={bombPercent}
                onChange={(e) => setBombPercent(Number(e.target.value))} />
            {bombPercent}
            <br />

            <label>Alcomode</label>
            <input type="checkbox"
                value={alcomode}
                onChange={(e) => setAlcomode(e.target.checked)} />
            <br />

            <button onClick={() => setGameStart(true)} >
                Start Game
            </button>
        </div>
    )
}
