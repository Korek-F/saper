import React from 'react'

export const SaperCell = ({ columnNumber, rowId, columnId, allCells, openCell }) => {
    const cellWidth = (100 / columnNumber) + "%"
    const id = rowId * columnNumber + columnId + 1;
    const cell = allCells[id - 1]
    const is_bomb = cell?.opened ?
        (cell?.bomb ? "red" : "green")
        : "black";

    return (
        <div className='saper-cell'
            onClick={() => openCell(id)}
            style={{ width: cellWidth, backgroundColor: is_bomb }}
        >
            {id}
        </div>
    )
}
