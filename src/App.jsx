import { useEffect, useState } from 'react'

import './App.css'
import GameBoard from './components/GameBoard.jsx';
import { winning_cases } from '../utils/winning_cases.js';
import Gameover from './components/GameOver.jsx';

function App() {
  const [selections ,setSelections] =useState([]);
  const initialBoard = [ 
    [null,null,null],
    [null,null,null],
    [null,null,null]
  ]
  const boardSetup =()=>{
     let board = [...initialBoard.map(array => [...array])];
     for(const selection of selections)
     {
      const { block , player } = selection;
      const { row , col} = block;
      board[row][col] = player;
     }
     return board;
  }
  const handleActivePlayer = (selections) =>{
        let currentPlayer = 'X'
        if(selections.length > 0 && selections[0].player === 'X')
          currentPlayer = 'O'

        return currentPlayer;
  }
  const handleSelection =(rowInd,colInd)=>{
     setSelections ((prevSelections) =>{
        const currentPlayer = handleActivePlayer(prevSelections);
        const updatedSelections = [ {block : {row: rowInd,col: colInd} , player: currentPlayer} , ...prevSelections]
        return updatedSelections;
     })
  }
  
  const handleWinner =() =>{
      const board=boardSetup();
      let winner ;
      for(const win_case of winning_cases ){
        const firstSymbol = board[win_case[0].row][win_case[0].col];
        const secondSymbol = board[win_case[1].row][win_case[1].col];
        const thirdSymbol = board[win_case[2].row][win_case[2].col];
      

      if(firstSymbol && (firstSymbol === secondSymbol) && (firstSymbol === thirdSymbol))
      {
        if(firstSymbol === 'X')
          winner = 1
        else
         winner = 2
      }
    }

      return winner;
  }

  const winner = handleWinner();
  console.log(winner)
  const isDraw = selections.length === 9 && !winner;

  const handleRestart = () =>{
    
    setSelections([]);
  }
  useEffect( ( ) => { 
    const currentPlayer = handleActivePlayer(selections);
    if(currentPlayer === 'O' && !winner){
      const board = boardSetup();
      const empty = [];
      for(let row =0;row< 3;row++){
        for(let col=0;col< 3;col++){
          if(board[row][col] === null)
            empty.push({row,col});
        }
      }

      if(empty.length > 0){
        const random = Math.floor(Math.random() * empty.length);
        const {row,col}=empty[random];

        const timeout = setTimeout(()=>{handleSelection(row,col)}, 500);
        return () => clearTimeout(timeout);
      }
    }
  } , [selections]);


  return (
    <div className='home-page'>
      <div className='game-container' > 
        { (winner || isDraw) && <Gameover winner={winner} restart ={handleRestart}/>}
        <GameBoard  onSelect={handleSelection} board={boardSetup()}/>
      </div>
    </div>
  )
}

export default App
