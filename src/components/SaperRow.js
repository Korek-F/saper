import React from 'react'
import { SaperCell } from './SaperCell'

export const SaperRow = (props) => {

    const columns = Array(props.columnNumber).fill(0).map((_, i) => <SaperCell key={i} columnNumber={props.columnNumber} rowId={props.rowId} columnId={i} rowNumber={props.rowNumber} openCell={props.openCell} boxSize={props.boxSize}
        bombCells={props.bombCells} allCells={props.allCells} />)

    const rowHeight = (100 / props.rowNumber) + "%"
    return (
        <div className='saper-row' style={{ height: rowHeight }} >
            {columns}
        </div>
    )
}
