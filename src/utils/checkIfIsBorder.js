
export const nextToCells = (cell, cN, rN) => {
    const id = cell.id
    const corners_cells = [1, cN, cN * (rN - 1) + 1, cN * rN]
    let next_to_cells = []
    if (!cell.bordered) {
        next_to_cells = [id - cN - 1, id - cN, id - cN + 1, id - 1, id + 1, id + cN - 1, id + cN, id + cN + 1]
    } else {
        if (corners_cells.includes(id)) {
            //I checked if the cell was on the left upper corner
            if (id === 1) next_to_cells = [id + 1, id + cN, id + cN + 1]
            //I checked if the cell was on the right upper corner
            else if (id === cN) next_to_cells = [id - 1, id + cN - 1, id + cN]
            //I checked if the cell was on the left bottom corner
            else if (id === cN * (rN - 1) + 1) next_to_cells = [id - cN, id - cN + 1, id + 1]
            //I checked if the cell was on the right bottom corner
            else if (id === cN * rN) next_to_cells = [id - cN - 1, id - cN, id - 1]
        } else {
            //I checked if the cell was on the upper border row
            if (id > 1 && id < cN) next_to_cells = [id - 1, id + 1, id + cN - 1, id + cN, id + cN + 1]
            //I checked if the cell was on the bottom border row
            else if (id > cN * (rN - 1) + 1 && id < cN * rN) next_to_cells = [id - 1, id + 1, id - cN - 1, id - cN, id - cN + 1]
            //I checked if the cell was on the left border column
            else if (id % cN === 1) next_to_cells = [id - cN, id - cN + 1, id + 1, id + cN, id + cN + 1]
            //I checked if the cell was on the right border column
            else if (id % cN === 0) next_to_cells = [id - cN - 1, id - cN, id - 1, id + cN - 1, id + cN]

        }
    }
    return next_to_cells
}