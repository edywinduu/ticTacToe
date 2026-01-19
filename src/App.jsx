import { useState } from 'react'
import './App.jsx'

function Square ({value, onSquareClick}){

  return <button className="square" onClick={onSquareClick}>{ value }</button>;
}

function NavigationBoard ({status, gameStatus, onPlay, onStop, onRestart}){
  const mediaControl = ["play_arrow", "Stop", "Refresh"];

  function mediaControlClick (){
    switch(status){
      case gameStatus.INIT:
        onPlay();
        break;
      case gameStatus.PLAYING:
        onStop();
        break;
      case gameStatus.FINISHED:
        onRestart();
        break;
      default:
        break;
    }
  }

  const controlImage = status === gameStatus.INIT?0:status === gameStatus.PLAYING?1:2;
  return (
    <div className='navigation-board'>
      <button className='mediaControl-btn' onClick={mediaControlClick}><span className="material-symbols-outlined">{mediaControl[controlImage]}</span></button>
      <button className='switch-btn'></button>
      <button className='backmove-btn'></button>
      <button className='frontmove-btn'></button>
    </div>
  )
}

function Board ({status, squares, setSquares}) {
  
  function handleClick (i){
    if (squares[i] || status == 0 || status == 2 || status || 3) return;
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
  const gameStatus = {
    INIT: 0, PLAYING: 1, STOPPED: 2, FINISHED: 3
  }
  const [status, setStatus] = useState(gameStatus.INIT);
  const [squares, setSquares] = useState(Array(9).fill(null));

    const handlePlay=()=>setStatus(gameStatus.PLAYING);
    const handleStop=()=>setStatus(gameStatus.STOPPED);
    const handleRestart=()=>{
      setStatus(gameStatus.FINISHED);
      setSquares(Array(9).fill(null));
    }
  return (
    <div className='Game'>
      <div className='game-board'>
        <Board 
        status={status}
        squares={squares} 
        setSquares={setSquares} />
      </div>
      <div className='game-navBoard'>
        <NavigationBoard status={status} gameStatus={gameStatus} onPlay={handlePlay} onStop={handleStop} onRestart={handleRestart}/>
      </div>
    </div>
  )
}