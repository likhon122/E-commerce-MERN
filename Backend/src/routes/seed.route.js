const seedRouter = require("express").Router();
const { seedController } = require("../controllers/seed.controller");

seedRouter.get("/users", seedController);

module.exports = seedRouter;
