const { seedController } = require("../controllers/seed.controller");

const seedRouter = require("express").Router();

seedRouter.get("/users", seedController);

module.exports = seedRouter;
