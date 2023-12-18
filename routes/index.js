var express = require("express");
var router = express.Router();
const userModel = require("./users");

/* GET home page. */
router.get("/", function (req, res, next) {
  req.session.ban = "Yes you are ban";
  res.render("index", { title: "Express" });
});
router.get("/checksession", function (req, res, next) {
  res.send(req.session);
});
router.get("/removeBan", function (req, res, next) {
  res.send(req.session.destroy());
});

/* To creat data in DB. */
// router.get("/create", async function (req, res, next) {
//   const createdUser = await userModel.create({
//     userName: "aarifAttari@gmail.com",
//     name: "Aarif",
//     age: 25,
//   });
//   res.send(createdUser);
// });

/* To Get data in DB. */
// router.get("/allUsers", async function (req, res, next) {
//   const allUser = await userModel.find();
//   res.send(allUser);
// });

/* To Find particular data in DB. */
// router.get("/findUser", async function (req, res, next) {
//   const userData = await userModel.find({ name: "Aarif" });
//   res.send(userData);
// });

/* To Delete particular data in DB. */
// router.get("/delete", async function (req, res, next) {
//   const deletedData = await userModel.findOneAndDelete({ name: "Shanawaz" });
//   res.send(deletedData);
// });

router.get;

module.exports = router;
