import React from 'react'

export default function Setup({difficulty, setDifficulty, fetchPuzzle}) {
  return (
    <div className="Setup">
        <h2>Please Choose a Difficulty</h2>
      <ul className="difficulties">
        <li><button onClick={() => setDifficulty('easy')} className={difficulty === 'easy' ? 'selected' : null}>Easy</button></li>
        <li><button onClick={() => setDifficulty('medium')} className={difficulty === 'medium' ? 'selected' : null}>Medium</button></li>
        <li><button onClick={() => setDifficulty('hard')} className={difficulty === 'hard' ? 'selected' : null}>Hard</button></li>
      </ul>
      {difficulty ? 
      <button className='start-btn' onClick={fetchPuzzle}>Start!</button>
      :
      <button className='start-btn' disabled>Start!</button>
      }
    </div>
  )
}
