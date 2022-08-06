import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Button, Row, Col } from "antd";
import {
	useParams,
	useLocation,
	useHistory,
	useRouteMatch,
} from "react-router-dom";
import ScoreBoard from "./scoreBoard";
import JoinPrompt from "./joinPrompt";
import StartGame from "./startGame";
import Board from './board'

import { useGoogleAuth } from "../../context/googleAuth";

let socket;

const getCurrentPlayer = (state) => {
	return state.users[state.turnIndex%state.users.length]
}

const Game = () => {
	const { id } = useParams();
	const [loading, updateLoading] = useState(true);
	const [players, updatePlayers] = useState([]);
	const [started, changeStarted] = useState(false);
	const { googleUser } = useGoogleAuth();
	const [joined, changeJoined] = useState(false);
	const [gameState, changeGameState] = useState(false)

	let game;

	useEffect(() => {
		if (googleUser) {
			console.log("here");
			socket = io({ query: { token: googleUser.tokenId, gameId: id } });
			socket.on("info", (data) => {
				console.log(data);
				changeGameState(data)
				console.log(getCurrentPlayer(data))
				updatePlayers(data.users);
				changeStarted(data.started);
				updateLoading(false);
			});
		}
	}, [googleUser]);

	if (loading) {
		return <div>loading...'</div>;
	}
	

	return (
		<>
			{!players.find((player) => player.vendorId === googleUser.googleId) &&
                !started && <JoinPrompt join={() => socket.emit("join")} />}
			<Row>
				<Col xs={12}>
					<Board 
						isTurn={googleUser.googleId === getCurrentPlayer(gameState).vendorId} 
						emitRoll={(data)=>socket.emit("roll",data)}
					/>
				</Col>
                <Col xs={12}>
			        <ScoreBoard
			        	users={players}
						currentPlayer={getCurrentPlayer(gameState)}
			        	ableToJoin={
			        		!players.find((player) => player.vendorId === googleUser.googleId) &&
			        		started
			        	}
                    />
                </Col>
			</Row>
			{!started && players.find((player) => player.GamesUsers.isLeader).vendorId ===
				googleUser.googleId && <StartGame start={() => socket.emit("start")} playerCount={players.length} />}
			{id}
			<Button onClick={() => socket.emit("chat", { foo: "bar" })}>hehe</Button>
		</>
	);
};

export default Game;
