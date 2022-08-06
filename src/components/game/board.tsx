import React, { useEffect, useState } from "react";
import fnScore from '../../util/Score'

const Board = ({isTurn,emitRoll}:{isTurn: boolean, emitRoll: (data:any) => void}) => {
    const roll = () => {
        console.log(fnScore([3,2,1,1,3,6],0))
        debugger
        emitRoll({diceIndex:[0, 1, 2, 3, 4, 5]})
    }
    return <div>
        <div>
            {isTurn ? `it's your turn` : 'not your turn' }
        </div>
        <div>
            <button onClick={()=>roll()}>
                Roll
            </button>
        </div>
    </div>
}

export default Board