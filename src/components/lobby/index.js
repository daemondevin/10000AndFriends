import React, { useEffect, useState } from "react";
import { List, Input, Button, Spin, Layout } from "antd";
import { Link } from "react-router-dom";
import { useGameProvider } from "../../context/games";

const { Group } = Input;
const { Item } = List;
const { Header, Content, Footer } = Layout;

const Lobby = () => {
	const { rooms, loading, getRooms, addGame } = useGameProvider();
	const AddGameButton = () => (
		<Button
			onClick={async () => {
				await addGame({ name: gameName });
				getRooms({reload:true});
			}}
			type="primary"
		>
			Start Game
		</Button>
	);
	const [gameName, changeGameName] = useState("");
	useEffect(() => getRooms(), [rooms, loading, getRooms]);

	if (loading) {
		return <Spin size="large" />;
	}

	console.log(rooms);
	return (
		<>
			<List>
				{rooms.map((room) => (
					<Item key={room.id}>
						{room.name}
						<Button href={`/games/${room.id}`}>GO</Button>
					</Item>
				))}
			</List>

			<Input onChange={(e) => changeGameName(e.target.value)} />
			<AddGameButton />
		</>
	);
};

export default Lobby;
