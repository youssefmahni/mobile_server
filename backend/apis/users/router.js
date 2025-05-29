const router = require("express").Router();
const {
   login,
   register,
   intra,
   logout
} = require("./controller");


router.post("/login", login);
router.post("/register", register);
router.get("/intra", intra);
router.get("/logout", logout);


module.exports = router;