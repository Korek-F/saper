import React, { useEffect, useState } from 'react'
import { nextToCells } from '../utils/checkIfIsBorder'
import { SaperRow } from './SaperRow'

export const Saper = ({ boxSize, rowNumber, columnNumber, bombPercent }) => {

    const [allCells, setAllCells] = useState([])
    const [gameEnded, setGameEnded] = useState(false)
    const [bombNubmer, setBombNumber] = useState(null)

    const openCell = (id) => {
        const cell_object = allCells.filter(e => e.id === id)[0]

        if (!cell_object.opened && !gameEnded) {

            const cN = columnNumber
            const rN = rowNumber
            let bomb_count = 0
            const next_to_cells = nextToCells(cell_object, cN, rN)

            //There I marked all cells that are next to my cell and i checked if there are any bombs
            next_to_cells.forEach(next_to_cell => {
                if (allCells.filter(e => e.id === next_to_cell)[0].bomb) {
                    bomb_count++
                }
            })
            //set number of bomb that are close to the cell
            setAllCells(state => state.map((el, i) => i + 1 === id ? { ...el, opened: true, bomb_count: bomb_count } : el))

            //If the cell has bomb - end the game
            if (cell_object.bomb) {
                setGameEnded(true)
            }

            const opened_cells = allCells.filter(e => e.opened === true)
            //If all green cells are opened - end the game
            if (opened_cells.length + 1 + bombNubmer === allCells.length) {
                console.log("ended")
                setGameEnded(true)
            }

        }
    }

    const rows = Array(rowNumber).fill(0).map((_, i) => <SaperRow key={i} columnNumber={columnNumber} rowNumber={rowNumber} rowId={i} allCells={allCells}
        openCell={openCell} boxSize={boxSize} />)

    const generateCells = () => {
        const allCells = []
        const cN = columnNumber
        const rN = rowNumber
        //Generate rows 
        for (let i = 0; i <= rN - 1; i++) {
            //Generate cells
            for (let j = 0; j <= cN - 1; j++) {
                const cell = { id: null, opened: false, bordered: false, bomb: false }
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
        setAllCells(allCells)
        //Cout the number of cells with bomb
        const bomb_cells = allCells.filter(e => e.bomb === true).length
        setBombNumber(bomb_cells)
    }


    useEffect(() => {
        generateCells()
    }, [])


    return (
        <>
            <div className='game-bar'>
                Saper
            </div>
            <div className='saper-main-box' style={{ width: boxSize, height: boxSize }}>
                {gameEnded &&
                    <div className='game-modal'>
                        Game Ended
                    </div>}
                {rows}
            </div>
        </>
    )
}

/*
 const generateBombs = () => {
        const range = rowNumber * columnNumber
        const bomb_ids = []
        let i = 0
        while (i < bombNumber) {
            const bomb = Math.floor((Math.random() * range) + 1)
            if (!bomb_ids.includes(bomb)) {
                bomb_ids.push(bomb)
                i++
            }
        }
        setBombCells(bomb_ids)
    }*/