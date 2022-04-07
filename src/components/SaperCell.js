import React from 'react'
import { BsFlag } from 'react-icons/bs'

export const SaperCell = ({
    columnNumber, rowId,
    columnId, allCells,
    openCell, boxSize,
    markAsBomb, cellSize }) => {

    const id = rowId * columnNumber + columnId + 1;
    const cell = allCells[id - 1]
    let cell_class = cell?.opened ?
        (cell?.bomb ? "bomb" : "opened")
        : "unopened";

    if (cell?.flag) {
        cell_class = "flag"
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
        <div className={cell_class + " saper-cell"}
            onClick={handleClick}
            onContextMenu={handleClick}
            style={{
                width: cellSize + "px",
                height: cellSize + "px",
                lineHeight: cellSize + "px"
            }}>
            <div className='bomb-number'
                style={{ fontSize: cellSize / 1.5 }}>

                {(cell?.opened && !cell?.bomb && cell?.bomb_count !== 0) ?
                    cell?.bomb_count
                    : ""}

                {cell?.flag && <BsFlag />}
            </div>
        </div>
    )
}
