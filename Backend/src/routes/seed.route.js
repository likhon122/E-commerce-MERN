const seedRouter = require("express").Router();
const { seedController, seedProductsController } = require("../controllers/seed.controller");

seedRouter.get("/users", seedController);
seedRouter.get("/products", seedProductsController);

module.exports = seedRouter;
