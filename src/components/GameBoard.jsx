const GameBoard =({onSelect , board , isDisabled})=>{
        return(
            <ol className="game-board">
                {
                    board.map((row,rowInd) =>(
                        <li key={rowInd}>
                            <ol>
                                {
                                    row.map((symbol,colInd)=>(
                                        <li key={colInd}>
                                            <button onClick={()=>onSelect(rowInd,colInd)} disabled={symbol!==null || isDisabled}>{symbol}</button>
                                        </li>
                                    ))
                                }
                            </ol>
                        </li>
                    ))
                }
            </ol>
        )
}
export default GameBoard;