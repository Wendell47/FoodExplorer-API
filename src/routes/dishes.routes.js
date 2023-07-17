const { Router } = require("express")

const DishesController = require("../controllers/DishesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const DishesImageController = require("../controllers/DishesImageController");
const multer = require("multer");
const uploadConfig = require("../configs/upload")

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER)

const dishesController = new DishesController()
const dishesImageController = new DishesImageController()

    dishesRoutes.use(ensureAuthenticated);
    dishesRoutes.post("/", upload.single("image"), dishesController.create);
    dishesRoutes.get("/", dishesController.index);

    dishesRoutes.get("/:id", dishesController.show);
    dishesRoutes.delete("/:id", dishesController.delete);
    dishesRoutes.put("/:id", dishesController.update);
    dishesRoutes.patch("/:id", upload.single("image"), dishesImageController.update)

    module.exports = dishesRoutes;
