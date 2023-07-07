const {Router} = require("express")

const usersRouter = require("./users.routes")
const productsRouter = require("./products.routes")
const tagsRouter = require("./tags.routes")
const sessionsRouter = require("./sessions.routes")
const categoriesRouter = require("./categories.routes")

const routes =  Router();

routes.use("/users", usersRouter)
routes.use("/products", productsRouter)
routes.use("/tags", tagsRouter)
routes.use("/sessions", sessionsRouter)
routes.use("/categories", categoriesRouter)

module.exports = routes;