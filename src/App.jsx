import { useEffect, useState } from 'react'

import './App.css'
import GameBoard from './components/GameBoard.jsx';
import { winning_cases } from './utils/winning_cases.js';
import Gameover from './components/GameOver.jsx';
import Header from './components/Header.jsx';

function App() {
  const [selections ,setSelections] =useState([]);
  const [flag , setFlag] =useState(0);
  const [initialPlayer , setInitialPlayer] =useState('X')
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
        if(selections.length === 0)
          return initialPlayer
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
  
  
  const possibleWinningCase = (symbol)=>{
     const board = boardSetup();
     let possibleWinCase;
     for(const win_case of winning_cases ){
        const firstSymbol = board[win_case[0].row][win_case[0].col];
        const secondSymbol = board[win_case[1].row][win_case[1].col];
        const thirdSymbol = board[win_case[2].row][win_case[2].col];

        if(firstSymbol && firstSymbol === symbol && firstSymbol === secondSymbol  && thirdSymbol === null)
          possibleWinCase = [ win_case[2].row , win_case[2].col ];
        else  if(firstSymbol && firstSymbol === symbol && firstSymbol === thirdSymbol && secondSymbol === null)
          possibleWinCase = [ win_case[1].row , win_case[1].col ];
        else  if(secondSymbol && secondSymbol === symbol && secondSymbol === thirdSymbol && firstSymbol === null)
          possibleWinCase = [ win_case[0].row , win_case[0].col ];
     }
     return possibleWinCase;
  }
  
  const getEmptyCorners = ( empty ) => {
     const emptyCorners =[];
      for(let i=0;i<empty.length;i++){
          const {row,col} = empty[i];
          if((row == 0 && col == 0) || (row==0 && col==2) || (row==2 && col==0) || (row==2 && col==2))
          {
            emptyCorners.push({row,col});
          }
      }
      return emptyCorners;
  }
  const getEmptyEdges = (empty) =>{
    const emptyEdges =[] ;
    for(let i=0;i<empty.length;i++){
      const {row,col} = empty[i];
      if((row == 0 && col ==1) || (row == 1 && col == 0) || (row == 2 && col ==1 ) || ( row == 1 && col == 2))
      {
        emptyEdges.push({row,col});
      }
    }
    return emptyEdges;
  }
  const handleComputerMove = (empty,board) =>{
      
     const possibleWinCaseX = possibleWinningCase('X')
     const possibleWinCaseO = possibleWinningCase('O')
     if(selections.length > 0 && selections[selections.length-1].player === 'X'){
      //When user first move is center
      
      if( selections[selections.length-1].block.row === 1 && selections[selections.length-1].block.col === 1){
         
          if(possibleWinCaseO)
          {  
            
            return {row: possibleWinCaseO[0] , col:possibleWinCaseO[1]} 

          }
          if( possibleWinCaseX)
          {   
             
              return {row: possibleWinCaseX[0] , col:possibleWinCaseX[1]} 
          }
          const emptyCorners = getEmptyCorners(empty)
          if(emptyCorners && emptyCorners.length >0)
          {  
            
             const random = Math.floor(Math.random() * emptyCorners.length);
             const {row,col}=emptyCorners[random];
              
             return {row,col};
          }
          else{
            
            const random = Math.floor(Math.random() * empty.length);
            const {row,col}=empty[random];
           
            return {row,col};
          }

      }
      // when user first move is corner
      else if ( ((selections[selections.length-1].block.row === 0 && selections[selections.length-1].block.col === 0) || (selections[selections.length-1].block.row === 0 && selections[selections.length-1].block.col === 2) || (selections[selections.length-1].block.row === 2 && selections[selections.length-1].block.col === 0) || (selections[selections.length-1].block.row === 2 && selections[selections.length-1].block.col === 2)) ){
          if(board[1][1] === null)
            return {row:1,col: 1};
           if(possibleWinCaseO)
          {  
            
            return {row: possibleWinCaseO[0] , col:possibleWinCaseO[1]} 

          }
           if( possibleWinCaseX)
          {   
             
              return {row: possibleWinCaseX[0] , col:possibleWinCaseX[1]} 
          }
          const emptyEdges = getEmptyEdges(empty);
          if(emptyEdges && emptyEdges.length === 4)
          {
            const random = Math.floor(Math.random() * emptyEdges.length);
            const {row,col}=emptyEdges[random];
           
            return {row,col};
          }
          if(emptyEdges && emptyEdges.length === 3)
          {   
            for(let i=0;i<3;i++){
              const {row ,col} = emptyEdges[i];
              
              if(Math.abs(selections[selections.length-1].block.row - selections[0].block.row) ===  Math.abs(selections[selections.length-1].block.col - col)){
               if(Math.abs(selections[selections.length-1].block.col - selections[0].block.col) === Math.abs(selections[selections.length-1].block.row - row) )
                  return {row,col};
              }
            }
          }

          else {
            const random = Math.floor(Math.random() * empty.length);
            const {row,col}=empty[random];
           
            return {row,col};
          }

      }
      //When user first move is edge 
      else { 
           if(board[1][1] === null)
            return {row:1,col: 1};
           if(possibleWinCaseO)
          {  
            
            return {row: possibleWinCaseO[0] , col:possibleWinCaseO[1]} 

          }
           if( possibleWinCaseX)
          {   
             
              return {row: possibleWinCaseX[0] , col:possibleWinCaseX[1]} 
          }

          const lastSelectionRow = selections[0].block.row
          const lastSelectionCol = selections[0].block.col

          if( (Math.abs(lastSelectionRow - selections[selections.length-1].block.row) === 0 && Math.abs(lastSelectionCol - selections[selections.length-1].block.col) === 2)  || (Math.abs(lastSelectionRow - selections[selections.length-1].block.row) === 2 && Math.abs(lastSelectionCol - selections[selections.length-1].block.col) === 0)  ){
            const emptyCorners = getEmptyCorners(empty)
            const random = Math.floor(Math.random() * emptyCorners.length);
             const {row,col}=emptyCorners[random];
              
             return {row,col};
          }

          if(selections.length === 3 ){
              if((Math.abs(lastSelectionRow - selections[selections.length-1].block.row) === 1 && Math.abs(lastSelectionCol - selections[selections.length-1].block.col) === 2)  || (Math.abs(lastSelectionRow - selections[selections.length-1].block.row) === 2 && Math.abs(lastSelectionCol - selections[selections.length-1].block.col) === 1) ){
                const emptyCorners = getEmptyCorners(empty)
                const requiredPositions = [] ;
                for(const corner of emptyCorners)
                {   
                   console.log(corner)
                    const {row ,col } =corner;
                    if( (row === selections[selections.length-1].block.row) || ( col === selections[selections.length-1].block.col) )
                      requiredPositions.push({row,col});
                }
                console.log(requiredPositions.length)
                 const random = Math.floor(Math.random() * requiredPositions.length);
                 const {row,col}=requiredPositions[random];
           
                  return {row,col};
              }
              
              if((Math.abs(lastSelectionRow - selections[selections.length-1].block.row) === 1 && Math.abs(lastSelectionCol - selections[selections.length-1].block.col) === 1)  ){
                const emptyCorners = getEmptyCorners(empty)
                const requiredPositions = [] ;
                for(const corner of emptyCorners)
                {
                    const {row ,col } =corner;
                    if(row === selections[selections.length-1].block.row || col === selections[selections.length-1].block.col || row === selections[0].block.row || col === selections[0].block.col)
                      requiredPositions.push({row,col});
                }
                 const random = Math.floor(Math.random() * requiredPositions.length);
                 const {row,col}=requiredPositions[random];
           
                  return {row,col};
              }

          }
          else{
             const random = Math.floor(Math.random() * empty.length);
            const {row,col}=empty[random];
           
            return {row,col};
          }


      }
     }
     //When computer plays first 
     else{
       if(empty.length === 9)
       {
        return {row:1, col:1};
       }
      if(possibleWinCaseO)
        {  
            
        return {row: possibleWinCaseO[0] , col:possibleWinCaseO[1]} 

        }
      if( possibleWinCaseX)
        {       
          return {row: possibleWinCaseX[0] , col:possibleWinCaseX[1]} 
        }
      const lRow = selections[0].block.row  //last selected row
      const lCol = selections[0].block.col  //last selected column 
      if(selections.length === 2){
          if( (lRow === 1 && lCol === 0) || (lRow === 0 && lCol === 1) || (lRow === 1 && lCol === 2) || (lRow === 2 && lCol === 1)){
               const emptyCorners = getEmptyCorners(empty)
                const requiredPositions = [] ;
                for(const corner of emptyCorners)
                {
                    const {row ,col } =corner;
                    if(row !== lRow && col !==lCol)
                      requiredPositions.push({row,col});
                }
                 const random = Math.floor(Math.random() * requiredPositions.length);
                 const {row,col}=requiredPositions[random];
           
                  return {row,col};
          }
          else {
              const emptyCorners = getEmptyCorners(empty)
                const requiredPositions = [] ;
                for(const corner of emptyCorners)
                {
                    const {row ,col } =corner;
                    if(Math.abs(row - lRow) === 2 && Math.abs(col - lCol)===2)
                      requiredPositions.push({row,col});
                }
                 setFlag(1);
                 const {row,col}=requiredPositions[0];
                 return {row,col};
          }
        }
        if(flag){
          if(selections.length === 4){
            if((Math.abs(selections[2].block.row - lRow) === 2 && Math.abs(selections[2].block.col - lCol) === 1) || (Math.abs(selections[2].block.row - lRow) === 1 && Math.abs(selections[2].block.col - lCol) === 2) ){
              const emptyCorners =getEmptyCorners(empty);
              setFlag(0);
              for(const corner of emptyCorners)
              {
                const {row,col} =corner
                if(row !== lRow && col !== lCol)
                  return {row,col}
              }
            }
          }

        }
         const random = Math.floor(Math.random() * empty.length);
            const {row,col}=empty[random];
           
            return {row,col};



     }
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
     
      const {row,col}= handleComputerMove(empty,board);

        const timeout = setTimeout(()=>{handleSelection(row,col)}, 300);
        return () => clearTimeout(timeout);
      }
    }
  } , [selections]);

 
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
  
  const isDraw = selections.length === 9 && !winner;

  const handleRestart = () =>{
    
    setSelections([]);
    setFlag(0);
    setInitialPlayer((prevPlayer) => {
      if(prevPlayer === 'X')
        return 'O'
      else
       return 'X'
    })
  }


  return (
    <div className='home-page'>
      <Header />
      <div className='game-container' > 
        { (winner || isDraw) && <Gameover winner={winner} restart ={handleRestart}/>}
        <GameBoard  onSelect={handleSelection} board={boardSetup() } isDisabled={handleActivePlayer(selections) === 'O'}/>
      </div>
    </div>
  )
}

export default App
