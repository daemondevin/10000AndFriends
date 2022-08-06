import React from "react";
import { Table, Tag, Space, Avatar } from "antd";

import './scoreBoard.scss'

const ScoreBoard = ({ users, ableToJoin, currentPlayer }) => {

	return (
        <Table 
        columns={[
            {
                dataIndex: "picture",
                key: "picture",
                render: pic => <Avatar size={75} className={`${pic.isCurrent ? 'current-player' : ''}`} src={pic.link}/>
            },
            {
                title: "Name",
                dataIndex: "name", 
                key: "name"
            },
            {
                title: "Score",
                dataIndex: "score",
                key: "score"
            }
        ]}
        dataSource={users.map((user,i ) => (
            {
                key: i,
                name: `${user.firstName} ${user.lastName}`,
                picture: {link: user.picture, isCurrent: user.vendorId === currentPlayer.vendorId},
                score: user.GamesUsers.score
            }))}
        pagination={{disabled:true,
            hideOnSinglePage:true}}
        showHeader={false}
        />

	);
};

export default ScoreBoard;
