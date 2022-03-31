import React, { useEffect, useState } from 'react'
import { SaperRow } from './SaperRow'

export const Saper = () => {
    const [rowNumber, setRowNumber] = useState(10)
    const [columnNumber, setColumnNumber] = useState(10)
    const [bombPercent, setBombPercent] = useState(10)
    const [bombCells, setBombCells] = useState([])
    const [allCells, setAllCells] = useState([])

    const openCell = (id) => {
        setAllCells(state => state.map((el, i) => i + 1 === id ? { ...el, opened: true } : el))

    }

    const rows = Array(rowNumber).fill(0).map((_, i) => <SaperRow key={i} columnNumber={columnNumber} rowNumber={rowNumber} rowId={i} allCells={allCells}
        openCell={openCell} />)

    const generateCells = () => {
        const allCells = []
        const cN = columnNumber
        const rN = rowNumber
        for (let i = 0; i <= rN - 1; i++) {
            for (let j = 0; j <= cN - 1; j++) {
                const cell = { id: null, opened: false, bordered: false, bomb: false, next_to: [] }
                const id = i * cN + j + 1
                if ((id % columnNumber === 0) || (id % columnNumber === 1) ||
                    (id > rN * cN - cN) || (id <= cN)) {
                    cell.bordered = true
                }
                const bomb = Math.floor((Math.random() * bombPercent) + 1)
                if (bomb === 1) cell.bomb = true
                cell.id = id

                cell.next_to.push(id - 1, id + 1)
                allCells.push(cell)
            }
        }
        setAllCells(allCells)
    }
    console.log(allCells)


    useEffect(() => {
        generateCells()
    }, [])

    console.log(bombCells)
    return (
        <div className='saper-main-box'>
            {rows}
        </div>
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