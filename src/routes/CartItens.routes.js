const { Router } = require("express")

const CartItensController = require("../controllers/CartItensController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const CartItensRoutes = Router();

const cartItensController = new CartItensController()



CartItensRoutes.post("/", ensureAuthenticated, cartItensController.create);
CartItensRoutes.get("/", ensureAuthenticated, cartItensController.show);
CartItensRoutes.delete("/:id", ensureAuthenticated, cartItensController.delete);

   

    module.exports = CartItensRoutes;
