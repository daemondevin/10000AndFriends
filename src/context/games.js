import React, { useEffect, useState } from "react";
import { useGoogleAuth } from "./googleAuth";

const GameContext = React.createContext();

export const GameProvider = ({ children }) => {
	const [rooms, changeRooms] = useState({ rooms: [], loading: true });
	const [currentGame, changeGame] = useState({inGame:false})
	const { googleUser } = useGoogleAuth();

	const getRooms = ({reload}={reload:false}) => {
		
		if (googleUser && (rooms.loading || reload)) {
			fetch("/game/", {
				headers: {
					Authorization: googleUser.tokenId,
				},
			})
				.then((res) => res.json())
				.then((res) => {
					changeRooms({ rooms: res, loading: false });
				});
		}
	};
	const loadRoom = (id) => {
		
		if (googleUser && !currentGame.inGame) {
			
			fetch(`/game/${id}`, {
				headers: {
					Authorization: googleUser.tokenId,
				},
			})
				.then((res) => res.json())
				.then((res) => {
					
					const { name, users } = res
					console.log(res)
					changeGame({inGame:true, name, users})
					
				});
		}
	};
	const addGame = async ({ name }) => {
		const res = await fetch('/game', {
			method: "POST",
			headers: {
				Authorization: googleUser.tokenId,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({name})
		})
		const { id } = await res.json()
		
		console.log(res)
		return id
	}

	return (
		<GameContext.Provider
			value={{ rooms: rooms.rooms, loading: rooms.loading, getRooms, loadRoom, currentGame, addGame }}
		>
			{children}
		</GameContext.Provider>
	);
};

export const useGameProvider = () => React.useContext(GameContext);
