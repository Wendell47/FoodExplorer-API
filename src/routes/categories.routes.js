const { Router } = require("express")

const CategoryController = require("../controllers/CategoryController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const CategoriesRoutes = Router();

const categoryController = new CategoryController()



CategoriesRoutes.post("/", ensureAuthenticated, categoryController.create);
CategoriesRoutes.get("/", categoryController.index);

   

    module.exports = CategoriesRoutes;
