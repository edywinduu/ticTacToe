import { useState } from 'react'
import './App.jsx'

function Square ({value, onSquareClick}){

  return <button className="square" onClick={onSquareClick}>{ value }</button>;
}

function NavigationBoard (){
  return (
    <div className='navigation-board'>
      <button className='play-btn'><span class="material-symbols-outlined">play_arrow</span></button>
      <button className='switch-btn'></button>
      <button className='backmove-btn'></button>
      <button className='frontmove-btn'></button>
    </div>
  )
}

function Board () {
  const [roleIsNext, setRoleIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  
  function handleClick (i){
    const nextSquares = squares.slice();
    nextSquares[i] = "X";
    setSquares(nextSquares);
  }

  return(
    <div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </div>
  );
}

export default function Game (){
  return (
    <div className='Game'>
      <div className='game-board'>
        <Board />
      </div>
      <div className='game-navBoard'>
        <NavigationBoard />
      </div>
    </div>
  )
}