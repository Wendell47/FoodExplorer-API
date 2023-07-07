const { Router } = require("express")

const TagsController = require("../controllers/TagsController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const TagsRoutes = Router();

const tagsController = new TagsController()



    TagsRoutes.get("/", ensureAuthenticated, tagsController.index);

   

    module.exports = TagsRoutes;
