const Gameover = ({winner , restart}) =>{
        return (
            <div className="game-over">
                <h2>Game Over!</h2>
                 {winner && <p>{winner===1 ? "You won!" : "Computer Won!"}</p> }
                 {!winner && <p>Its a draw!</p>}

                <p>
                    <button onClick={()=>restart()}>Restart</button>
                </p>

            </div>
        )
}
export default Gameover;