import React from "react";
import { Button } from "antd";


const JoinPrompt = ({join})=>{

    return (<div>
        This game is not yet started, would you like to join?
        <Button onClick={join}>Join</Button>
    </div>)
}

export default JoinPrompt;