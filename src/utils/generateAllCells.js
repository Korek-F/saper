export const generateAllCells = (columnNumber, rowNumber, bombPercent) => {
    const allCells = []
    const cN = columnNumber
    const rN = rowNumber
    //Generate rows 
    for (let i = 0; i <= rN - 1; i++) {
        //Generate cells
        for (let j = 0; j <= cN - 1; j++) {
            const cell = { id: null, opened: false, bordered: false, bomb: false, flag: false, bomb_count: 0 }
            const id = i * cN + j + 1
            //Check if cell is on the border
            if ((id % columnNumber === 0) || (id % columnNumber === 1) ||
                (id > rN * cN - cN) || (id <= cN)) {
                cell.bordered = true
            }
            //randomize if there is a bomb here
            const bomb = Math.floor((Math.random() * bombPercent) + 1)
            if (bomb === 1) cell.bomb = true
            cell.id = id


            allCells.push(cell)
        }
    }
    return allCells
}