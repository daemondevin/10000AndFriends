const router = require("express").Router();
const { sequelize, Game, User, GamesUsers } = require("../../models");


router.get("/:id", async (req, res) => {
	const game = await Game.findOne({
		where: {
			id: req.params.id,
        },
        include: [{model:User, as: 'users',through:{
            attributes: ['score']
        }}]
    });
    
	res.send(game);
});

router.get("/", async(req,res)=>{
	const games = await Game.findAll({where:{ended:null}})


	res.send(games)
})

router.post("/", async (req, res) => {
	
	const game = await Game.create({
		name: req.body.name,
	});

	await game.addUser(req.user,{through:{score:0,isLeader:true}});
	const users = await game.getUsers();

	res.send({id:game.id});
});

module.exports = router;
