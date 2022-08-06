import React from 'react'
import { Button } from "antd";


const StartGame = ({start, playerCount})=>{
    const canStart = playerCount!==1
    return <div>
        You are the leader <Button onClick={start} disabled={!canStart}>{canStart ? 'Start Game' : 'Wait For More Players'}</Button>
    </div>
}

export default StartGame 