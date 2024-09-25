const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authJwt = require("../middlewares/authMiddleware")

router.post("/users",authJwt, userController.storeUser);
router.get("/users",authJwt, userController.index);
router.delete("/users/:id",authJwt, userController.destroyUser);
router.get("/users/:id",authJwt,userController.showUser);
router.post("/login",userController.login);
router.post("/logout",authJwt,userController.logout);


module.exports = router;