const {Router} = require("express")

const usersRouter = require("./users.routes")
const cartItensRouter = require("./CartItens.routes")
const dishRouter = require("./dishes.routes")
const tagsRouter = require("./tags.routes")
const sessionsRouter = require("./sessions.routes")
const categoriesRouter = require("./categories.routes")
const favoriteDishes = require("./favoriteDishes.routes")
const routes =  Router();

routes.use("/users", usersRouter)
routes.use("/cart", cartItensRouter)
routes.use("/products", dishRouter)
routes.use("/favoriteDishes", favoriteDishes)
routes.use("/tags", tagsRouter)
routes.use("/sessions", sessionsRouter)
routes.use("/categories", categoriesRouter)

module.exports = routes;