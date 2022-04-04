import React, { useEffect, useState } from 'react'
import { nextToCells } from '../utils/checkIfIsBorder'
import { generateAllCells } from '../utils/generateAllCells'
import { SaperRow } from './SaperRow'

export const Saper = ({ boxSize, rowNumber, columnNumber, bombPercent }) => {

    const [allCells, setAllCells] = useState([])
    const [gameEnded, setGameEnded] = useState(false)
    const [bombNubmer, setBombNumber] = useState(null)

    const openCell = (id) => {
        const cell_object = allCells.filter(e => e.id === id)[0]

        if (!cell_object.opened && !gameEnded && !cell_object.flag) {

            //If the cell has bomb - end the game
            if (cell_object.bomb) {
                setAllCells(state => state.map((el, i) => el.bomb === true ? { ...el, opened: true } : el))
                setGameEnded(true)
            }

            setAllCells(state => state.map((el, i) => i + 1 === id ? { ...el, opened: true } : el))

            const opened_cells = allCells.filter(e => e.opened === true)
            //If all green cells are opened - end the game
            if (opened_cells.length + 1 + bombNubmer === allCells.length) {
                console.log("ended")
                setGameEnded(true)
            }

        }
    }

    const markAsBomb = (id) => {
        const cell_object = allCells.filter(e => e.id === id)[0]
        if (!cell_object.opened && !gameEnded) {
            const is_flag = !cell_object.flag
            setAllCells(state => state.map((el, i) => i + 1 === id ? { ...el, flag: is_flag } : el))
        }
    }

    const restartGame = () => {
        setAllCells([])
        setGameEnded(false)
        generateCells()
    }

    const generateCells = () => {

        const allCells = generateAllCells(columnNumber, rowNumber, bombPercent)

        //Cout the number of cells with bomb
        const bomb_cells = allCells.filter(e => e.bomb === true).length
        setBombNumber(bomb_cells)

        //There I marked all cells that are next to my cell and i checked if there are any bombs
        const UpdateBombNumberNextToCells = allCells.map(cell => {
            const next_to_cells = nextToCells(cell, columnNumber, rowNumber)
            let bomb_count = 0
            next_to_cells.forEach(next_to_cell => {
                const cell2 = allCells.filter(e => e.id === next_to_cell)[0]
                if (cell2.bomb) {
                    bomb_count += 1
                }
            })
            return { ...cell, bomb_count: bomb_count }
        })

        setAllCells(UpdateBombNumberNextToCells)

    }



    useEffect(() => {
        generateCells()
    }, [])

    const rows = Array(rowNumber).fill(0).map((_, i) =>
        <SaperRow
            key={i}
            columnNumber={columnNumber}
            rowNumber={rowNumber}
            rowId={i}
            allCells={allCells}
            openCell={openCell}
            boxSize={boxSize}
            markAsBomb={markAsBomb} />)

    return (
        <>
            <div className='game-bar'>
                Saper Bomb number: {bombNubmer}
            </div>
            <div className='saper-main-box' style={{ width: boxSize, height: boxSize }}>
                {gameEnded &&
                    <div className='game-modal'>
                        Game Ended <br />
                        <button onClick={restartGame}>Refresh</button>
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