const { Router } = require("express")

const ProductsController = require("../controllers/ProductsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ProductImageController = require("../controllers/ProductImageController");
const multer = require("multer");
const uploadConfig = require("../configs/upload")

const productsRoutes = Router();
const upload = multer(uploadConfig.MULTER)

const productsController = new ProductsController()
const productImageController = new ProductImageController()

    productsRoutes.use(ensureAuthenticated);
    productsRoutes.post("/", upload.single("image"), productsController.create);
    productsRoutes.get("/", productsController.index);

    productsRoutes.get("/:id", productsController.show);
    productsRoutes.delete("/:id", productsController.delete);
    productsRoutes.put("/:product_id", productsController.update);
    productsRoutes.patch("/:product_id", upload.single("productImage"), productImageController.update)

    module.exports = productsRoutes;
