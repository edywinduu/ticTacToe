import { useState, useEffect } from 'react'
import './App.jsx'

function Square ({value, onSquareClick}){

  return <button className="square" onClick={onSquareClick}>{ value }</button>;
}

function NavigationBoard ({status, gameStatus, onPlay, onStop, onRestart, onModeClick, statusMode, switchButtonLogo, switchControl}){
  const mediaControl = ["play_arrow", "Stop", "Refresh"]; //media control googlefont
  const modeControl = ["Robot", "network_node"]; //mode control

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
        break;
      case gameStatus.FINISHED:
        onPlay();
      default:
        break;
    }
  }

  const controlImage = status === gameStatus.INIT || status === gameStatus.FINISHED ?0:status === gameStatus.PLAYING?1:2;
  return (
    <div className='navigation-board'>
      <button className='mediaControl-btn' onClick={mediaControlClick}><span className="material-symbols-outlined">{mediaControl[controlImage]}</span></button>
      <button className='switch-btn' onClick={switchControl}>{switchButtonLogo}</button>
      <button className='mode-btn' onClick={onModeClick}><span className="material-symbols-outlined">{modeControl[statusMode]}</span></button>
    </div>
  )
}

function Board ({status, xIsNext, setXIsNext, squares, setSquares, gameInformation, setIsTurn}) { //navbar 2

  function handleClick (i){
    if (squares[i] || status !== 1 || calculateWinner(squares)) return;
    const nextSquares = squares.slice();

    nextSquares[i] = xIsNext ? "X": "O";
    setSquares(nextSquares);
    setXIsNext(prev => !prev);
    setIsTurn(false);
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
  const [squares, setSquares] = useState(Array(9).fill(null)); //array on square
  const gameStatus = {
    INIT: 0, PLAYING: 1, STOPPED: 2, FINISHED: 3
  }
  const gameModeStatus = {
    VSAI: 0, LOCAL: 1
  }
  const switchButtonControl = {
    X: "X",O: "O"
  }
  const [switchButtonLogo, setSwitchButtonLogo] = useState(switchButtonControl.X);

  const [status, setStatus] = useState(gameStatus.INIT); //game status
  const handlePlay=()=>setStatus(gameStatus.PLAYING);
  const handleStop=()=>{
    setStatus(gameStatus.STOPPED);
  }
  const handleRestart=()=>{
    setStatus(gameStatus.FINISHED);
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }
  const [xIsNext, setXIsNext]= useState(true); //user mode
  const [statusMode, setStatusMode] = useState(gameModeStatus.VSAI); //ai mode

  const modeButtonClick=()=>{
    if (status===gameStatus.PLAYING || status===gameStatus.STOPPED) return;
    setStatusMode(prev =>
      prev === gameModeStatus.VSAI
        ? gameModeStatus.LOCAL
        : gameModeStatus.VSAI
    );
    setXIsNext(true);
  }

  const winner=calculateWinner(squares);
  const isBoardFull = !squares.includes(null); //pengecekan draw

  useEffect(() => {
    if (winner) {
      setStatus(gameStatus.STOPPED);
    } else if (!squares.includes(null)) {
      setStatus(gameStatus.STOPPED); // draw
    }
  }, [winner, squares]);

  function gameInformation(){
    const statusInformationMode = ["Vs.Ai", "Local"];
    if (status===gameStatus.INIT || status===gameStatus.FINISHED) return "Let's Play (" + statusInformationMode[statusMode] + ")";
    
    if (winner){
      return "Congrats " + winner + "-san";
    }
    if (isBoardFull) {
      return "Draw!";
    } else { 
      return "Next Player: " + (xIsNext ? "'X'": "'O'");
    }
  }

  const botAi = () => {
    const emptyIndexes = squares
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);

    if (emptyIndexes.length === 0) return;

    // Pick random spot
    const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

    // Update board with a slight delay for better UX
    setTimeout(() => {
      setSquares((prev) => {
        const next = [...prev];
        next[randomIndex] = xIsNext ? "X" : "O";
        return next;
      });
    }, 500);
    setXIsNext(prev=>!prev);
    setIsTurn(true);
  };

  const [isTurn, setIsTurn] = useState(true); //true = player, false = bot

  useEffect(()=> {
    if (!isTurn && statusMode===gameModeStatus.VSAI && status===gameStatus.PLAYING && !winner)
    botAi();
  }, [isTurn, winner, status]
  );

  function switchControl(){
    if (status===gameStatus.PLAYING) return;
    setSwitchButtonLogo(prev=>prev===switchButtonControl.X?switchButtonControl.O:switchButtonControl.X);
    setIsTurn(switchButtonLogo===switchButtonControl.O);
  }

  return (
    <div className='Game'>
      <div className='game-board'>
        <Board 
        status={status}
        xIsNext={xIsNext}
        setXIsNext={setXIsNext}
        squares={squares} 
        setSquares={setSquares}
        gameInformation={gameInformation}
        setIsTurn={setIsTurn} />
      </div>
      <div className='game-navBoard'>
        <NavigationBoard 
        status={status} 
        gameStatus={gameStatus}
        xIsNext={xIsNext}
        onPlay={handlePlay} 
        onStop={handleStop} 
        onRestart={handleRestart}
        onModeClick={modeButtonClick}
        statusMode={statusMode}
        setStatusMode={setStatusMode}
        switchButtonLogo={switchButtonLogo}
        switchControl={switchControl} />
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