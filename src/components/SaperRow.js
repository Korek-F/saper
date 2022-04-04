import React from 'react'
import { SaperCell } from './SaperCell'

export const SaperRow = ({ columnNumber, rowId, rowNumber, openCell, boxSize, bombCells, allCells, markAsBomb }) => {

    const columns = Array(columnNumber).fill(0).map((_, i) =>
        <SaperCell
            key={i}
            columnNumber={columnNumber}
            rowId={rowId}
            columnId={i}
            rowNumber={rowNumber}
            openCell={openCell}
            boxSize={boxSize}
            bombCells={bombCells}
            allCells={allCells}
            markAsBomb={markAsBomb} />)

    const rowHeight = (100 / rowNumber) + "%"
    return (
        <div className='saper-row' style={{ height: rowHeight }} >
            {columns}
        </div>
    )
}
