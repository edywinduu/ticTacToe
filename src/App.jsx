import { useState } from 'react'
import './App.jsx'

function Square ({value, onSquareClick}){

  return <button className="square" onClick={onSquareClick}>{ value }</button>;
}

function NavigationBoard ({status, gameStatus,xIsNext, setXIsNext, onPlay, onStop, onRestart}){
  const mediaControl = ["play_arrow", "Stop", "Refresh"]; //media control googlefont
  function switchPlayerClick (){
    if(status === gameStatus.PLAYING) return;
    setXIsNext(prev => !prev);
  }

  function mediaControlClick (){
    switch(status){
      case gameStatus.INIT:
        onPlay();
        break;
      case gameStatus.PLAYING:
        onStop();
        break;
      case gameStatus.STOPPED:
        onRestart();
        switchPlayerClick();
        break;
      case gameStatus.FINISHED:
        onPlay();
      default:
        break;
    }
  }

  function switchButton (){
    if (status===gameStatus.PLAYING || status===gameStatus.STOPPED) return;
    return xIsNext ? "X": "O";
  }


  const controlImage = status === gameStatus.INIT || status === gameStatus.FINISHED ?0:status === gameStatus.PLAYING?1:2;
  return (
    <div className='navigation-board'>
      <button className='mediaControl-btn' onClick={mediaControlClick}><span className="material-symbols-outlined">{mediaControl[controlImage]}</span></button>
      <button className='switch-btn' onClick={switchPlayerClick}>{switchButton()}</button>
      <button className='mode-btn'></button>
    </div>
  )
}

function Board ({status, gameStatus, xIsNext, setXIsNext, squares, setSquares, gameInformation}) { //navbar 2
  
  function handleClick (i){
    if (squares[i] || status == 0 || status == 2 || status == 3 || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X": "O";
    setSquares(nextSquares);
    setXIsNext(prev => !prev);
  }

  return(
    <div>
      <div className='gameInformation'>{gameInformation()}</div>
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
  const [status, setStatus] = useState(gameStatus.INIT); //game status
  const [squares, setSquares] = useState(Array(9).fill(null)); //array on square
  const [xIsNext, setXIsNext]= useState(true); //user mode

  const handlePlay=()=>setStatus(gameStatus.PLAYING);
  const handleStop=()=>{
    setStatus(gameStatus.STOPPED);
  }
  const handleRestart=()=>{
    setStatus(gameStatus.FINISHED);
    setSquares(Array(9).fill(null));
  }

  const winner=calculateWinner(squares);
  const isBoardFull = !squares.includes(null); //pengecekan draw

  
  function gameInformation(){
    if (status===gameStatus.INIT || status===gameStatus.FINISHED) return "Let's Play";
    
    if (winner){
      return "Congrats " + winner + "-san";
    } 
    if (isBoardFull) {
      onStop();
      return "Draw!";
    } else {
      return "Next Player: " + (xIsNext ? "'X'": "'O'"); 
    }
  }

  return (
    <div className='Game'>
      <div className='game-board'>
        <Board 
        status={status}
        gameStatus={gameStatus}
        xIsNext={xIsNext}
        setXIsNext={setXIsNext}
        squares={squares} 
        setSquares={setSquares}
        gameInformation={gameInformation} />
      </div>
      <div className='game-navBoard'>
        <NavigationBoard 
        status={status} 
        gameStatus={gameStatus}
        xIsNext={xIsNext}
        setXIsNext={setXIsNext}
        onPlay={handlePlay} 
        onStop={handleStop} 
        onRestart={handleRestart}/>
      </div>
    </div>
  )
}


function calculateWinner (squares){
  const lines=[
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
  ]
  for (let i=0;i<lines.length;i++){
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}