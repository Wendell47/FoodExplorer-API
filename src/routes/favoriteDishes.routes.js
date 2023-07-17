const { Router } = require("express")

const FavoriteDishesController = require("../controllers/FavoriteDishes")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const FavoriteDishesRoutes = Router();

const favoriteDishesController = new FavoriteDishesController()



    FavoriteDishesRoutes.post("/:id", ensureAuthenticated, favoriteDishesController.create);
    FavoriteDishesRoutes.get("/", ensureAuthenticated, favoriteDishesController.show);
    FavoriteDishesRoutes.delete("/:id", ensureAuthenticated, favoriteDishesController.delete);

   

    module.exports = FavoriteDishesRoutes;
