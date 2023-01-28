import React, { useEffect } from 'react'

export default function Game({puzzle, difficulty, userPuzzle, setUserPuzzle, timer, setTimer, solved, setSolved, gameover, solvedPuzzle}) {


    const handleNumberInput = (e,i) => {
        if (e.target.value) {
            let updatedUserPuzzle = [...userPuzzle]
            updatedUserPuzzle.splice(i, 1, e.target.value.toString())
            setUserPuzzle(updatedUserPuzzle)
        }
        else {
            let updatedUserPuzzle = [...userPuzzle]
            updatedUserPuzzle.splice(i, 1, '.')
            setUserPuzzle(updatedUserPuzzle)
        }
    }
    const handleRestartPuzzle = () => {
        setUserPuzzle(puzzle)
        let boxes = document.querySelectorAll('input')
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].value = ''
        }
    }

    useEffect(() => {
        if (!solved && !gameover) {
            setTimeout(() => {
                setTimer(timer + 1)
            }, 1000)
        }
        else {
            alert("DONE")
        }
    }, [timer, setTimer, solved])



  return (
    <div className="Game">
        <h3>{difficulty}</h3>
        <div className="timer">{timer}</div>
    <div className='grid'>
        {gameover ? 
        solvedPuzzle.map((s, i) => <div key={i} className={"box-" + i}>{s}</div>)
        :
        puzzle.map((s, i) => s === '.' ? <input key={i} type="text" className={"box-" + i} maxLength="1" onChange={e => handleNumberInput(e,i)} /> : <div key={i} className={"box-" + i}>{s}</div>)
        }
    </div>
    {gameover ? 
    null 
    :
    <>
    <button onClick={() => setSolved(true)}>FINISH</button>
    <button onClick={handleRestartPuzzle}>Restart</button>
    </>
    }
    </div>
  )
}
