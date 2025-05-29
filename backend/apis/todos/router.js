const router = require("express").Router();
const {check_token, check_token_role} = require("../token_validation")

const {
  get_todos,
  add_todo,
  edit_todo,
  delete_todo,
} = require("./controller");

router.get("/", check_token, get_todos);
router.post("/new",check_token, add_todo);
router.post("/", check_token, edit_todo);
router.post("/delete", check_token, delete_todo);


module.exports = router;
