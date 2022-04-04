import React from 'react'

export const SaperCell = ({
    columnNumber, rowId,
    columnId, allCells,
    openCell, boxSize,
    markAsBomb }) => {

    const cellWidth = (100 / columnNumber) + "%"
    const id = rowId * columnNumber + columnId + 1;
    const cell = allCells[id - 1]
    let cell_color = cell?.opened ?
        (cell?.bomb ? "red" : "green")
        : "grey";
    if (cell?.flag) {
        cell_color = "blue"
    }
    const handleClick = (e) => {
        e.preventDefault();
        if (e.type === 'click') {
            openCell(id)
        } else if (e.type === 'contextmenu') {
            markAsBomb(id)
        }
    };
    return (
        <div className='saper-cell'
            onClick={handleClick}
            onContextMenu={handleClick}
            style={{ width: cellWidth, backgroundColor: cell_color }}>
            <div className='bomb-number'
                style={{ fontSize: (boxSize / columnNumber) / 1.5 }}>

                {(cell?.opened && !cell?.bomb && cell?.bomb_count !== 0) ? cell?.bomb_count : ""}
            </div>
        </div>
    )
}
