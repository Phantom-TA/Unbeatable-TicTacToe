import { useState } from 'react'

import './App.css'
import GameBoard from './components/GameBoard.jsx';

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
  return (
    <div className='home-page'>
      <div className='game-container' >
        <GameBoard  onSelect={handleSelection} board={boardSetup()}/>
      </div>
    </div>
  )
}

export default App
