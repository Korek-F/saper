import React, { useEffect, useState, useRef } from 'react'
import { nextToCells } from '../utils/checkIfIsBorder'
import { generateAllCells } from '../utils/generateAllCells'
import { SaperRow } from './SaperRow'

export const Saper = ({ boxSize, rowNumber,
    columnNumber, bombPercent, alcomode }) => {

    const [allCells, setAllCells] = useState([])
    const [gameEnded, setGameEnded] = useState(false)
    const [bombNubmer, setBombNumber] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [finishTime, setFinishTime] = useState(null)
    const [isWin, setIsWin] = useState(false)
    const [cellSize, setCellSize] = useState(20)

    const mainBoxRef = useRef()

    const openCell = (id) => {
        const cell_object = allCells.filter(e => e.id === id)[0]

        if (!cell_object.opened && !gameEnded && !cell_object.flag) {

            //If the cell has bomb - end the game
            if (cell_object.bomb) {
                setAllCells(state => state.map((el, i) => el.bomb === true ? { ...el, opened: true } : el))
                setGameEnded(true)
            }

            setAllCells(state => state.map((el, i) => i + 1 === id ? { ...el, opened: true } : el))

            if (cell_object.bomb_count === 0) {
                const next_to_cells = nextToCells(cell_object, columnNumber, rowNumber)
                next_to_cells.forEach(e => {
                    setAllCells(state => state.map((el, i) => el.id === e && el.flag === false ? { ...el, opened: true } : el))
                })
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
        setIsWin(false)
        const date = new Date()
        setStartTime(date.getTime() / 1000)
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
        const date = new Date()
        setStartTime(date.getTime() / 1000)
        generateCells()
        //calculate the cell size
        if (columnNumber > rowNumber) {
            setCellSize(boxSize / columnNumber)
        } else {
            setCellSize(boxSize / rowNumber)
        }
        //Check if alcomode is on
        if (alcomode) {
            mainBoxRef.current.style["filter"] = "blur(5px)"
        }

    }, [])

    //If all green cells are opened - end the game
    useEffect(() => {
        const opened_cells = allCells.filter(e => e.opened === true)
        if (opened_cells.length + bombNubmer === allCells.length && allCells.length > 24) {
            const date = new Date()
            setIsWin(true)
            setFinishTime(date.getTime() / 1000)
            setGameEnded(true)
        }
    }, [allCells])



    const rows = Array(rowNumber).fill(0).map((_, i) =>
        <SaperRow
            key={i}
            columnNumber={columnNumber}
            rowNumber={rowNumber}
            rowId={i}
            allCells={allCells}
            openCell={openCell}
            boxSize={boxSize}
            markAsBomb={markAsBomb}
            cellSize={cellSize}
        />)

    return (
        <>
            <div className='game-bar'>
                Bombs: {bombNubmer}
            </div>
            <div className='saper-main-box'
                ref={mainBoxRef}
                style={{
                    width: cellSize * columnNumber,
                    height: cellSize * rowNumber
                }}>
                {rows}
            </div>
            {gameEnded &&
                <div className='game-modal'
                    style={{
                        width: boxSize,
                        height: boxSize,
                        fontSize: boxSize / 22 + "px",
                    }}>
                    Game Ended <br />
                    {isWin &&
                        <>
                            Time: &nbsp;
                            {Math.floor(finishTime - startTime) >= 60 ?

                                Math.floor(Math.floor(finishTime - startTime) / 60) + ":" +
                                (Math.floor(finishTime - startTime) % 60 < 10 ?
                                    "0" + Math.floor(finishTime - startTime) % 60 :
                                    Math.floor(finishTime - startTime) % 60
                                ) :

                                Math.floor(finishTime - startTime) < 10 ?
                                    "0:0" + Math.floor(finishTime - startTime) :
                                    "0:" + Math.floor(finishTime - startTime)}
                        </>
                    }<br />

                    <button onClick={restartGame}>Refresh</button>
                </div>}
        </>
    )
}

