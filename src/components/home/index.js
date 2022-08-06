import React from "react";
import { useGoogleAuth } from "../../context/googleAuth";
import { Button, PageHeader, Menu, Layout } from "antd";
import Lobby from "../lobby";
import Game from "../game"
import autorizedRequest from "../../requests/authorized";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./home.scss";

const { Item, SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

export default () => {
	const { signIn, signOut, googleUser, isSignedIn } = useGoogleAuth();
	return (
		<Router>
			<Layout theme="dark">
				<Menu mode="horizontal" theme="dark">
					{!isSignedIn && <Item onClick={signIn} style={{float: 'right'}}>Sign In</Item>}
					{isSignedIn && (
						<Item onClick={signOut} style={{float: 'right'}} icon={
							<img
							src={googleUser.profileObj.imageUrl}
							alt="Avatar."
							className="profileImage"
						/>
						}>
							Sign Out
						</Item>
					)}
				</Menu>
				<Content style={{ padding: "0 50px" }}>
					<Switch>
						<Route exact path="/">
							<Lobby />
						</Route>
						<Route path="/games/:id">
							<Game />
						</Route>
					</Switch>
				</Content>
				<Footer>
						Alex is cool
				</Footer>
			</Layout>
		</Router>
	);
};
