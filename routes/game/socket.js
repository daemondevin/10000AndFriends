const { OAuth2Client } = require("google-auth-library");
const { sequelize, Game, User, GamesUsers } = require("../../models");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const getGame = async (id) => Game.findOne({
        where: {
            id: id,
        },
        include: [{model:User, as: 'users',through:{
            attributes: ['score','isLeader','isConnected']
        }}]
    })


module.exports = function (io) {
	io.use(async function (socket, next) {
		if (socket.handshake.query && socket.handshake.query.token) {
			const ticket = await client.verifyIdToken({
				idToken: socket.handshake.query.token,
				audience: process.env.GOOGLE_CLIENT_ID,
			});
			const user = await User.findOne({
				where: {
					vendorId: ticket.payload.sub,
				},
			});
			if (!user) {
				next(new Error("Authentication error"));
            }
            if(!socket.handshake.query.gameId){
                next(new Error("No Game Specified"))
            }
            
            socket.user = user;
            socket.gameId = socket.handshake.query.gameId
			next();
		} else {
			next(new Error("Authentication error"));
		}
	}).on("connection", async (socket) => {
        console.log("new connection");
        socket.on("chat", (data) => console.log(socket.user.lastName, socket.gameId));
        socket.on('join', async () => {
            const game = await getGame(socket.gameId)
            if (game && !game.started && !game.ended){
                await game.addUser(socket.user.id, {through:{score:0,isLeader:false}})
            }
            io.to(socket.gameId).emit('info', await getGame(socket.gameId));
        })
        socket.on("start", async ()=>{
            const game = await getGame(socket.gameId)
            if(game.users.find(user=>user.GamesUsers.isLeader).id === socket.user.id){
                game.started = new Date(Date.now())
                game.turnIndex = 0
                await game.save()
                io.to(socket.gameId).emit('info', await getGame(socket.gameId));
            }
        })
        socket.on("roll",(data)=>{
            console.log(data)
            
        })
        socket.join(socket.gameId)
        io.to(socket.gameId).emit('info', await getGame(socket.gameId));
})};
