var express = require("express");
var router = express.Router();
const userModel = require("./users");
const localStrategy = require("passport-local");
const passport = require("passport");

//For local Strategy (Entering username and password)
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  // req.session.ban = "Yes you are ban";
  res.render("index", { title: "Express" });
});

// router.get("/creatingFlash", (req, res) => {
//   req.flash("name", "abc");
//   req.flash("age", 24);
//   res.send("From send req");
// });

// router.get("/checkFlash", (req, res) => {
//   res.send("Check your terminal");
//   console.log(req.flash("name"), req.flash("age"));
// });

//Learning Session
// router.get("/checksession", function (req, res, next) {
//   res.send(req.session);
// });
// router.get("/removeBan", function (req, res, next) {
//   res.send(req.session.destroy());
// });

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

// -------> Practicing Question<-----------

// router.get("/create", async function (req, res, next) {
//   const createdUser = await userModel.create({
//     userName: "Meraj",
//     nickName: "Guddu bhai",
//     description: "Pharmasist",
//     categories: ["Employee", "Good person", "Confused person"],
//   });
//   res.send(createdUser);
// });

// Q) To make the in-Sensitive search in mongoose

// router.get("/find", async (req, res) => {
//   let regex = new RegExp("^meRaj$", "i"); //i here represents insensitive and ^ represents all the character after ^ should match to letter coming after ^ and all the letters coming before $ should match the all the letters writter
//   let user = await userModel.find({ userName: regex });
//   res.send(user);
// });

// Q) How to find the document where an array field contains all of set of values

// router.get("/findCategories", async (req, res) => {
//   let userCategory = await userModel.find({
//     categories: { $all: ["Employee", "MS Office"] },
//   });
//   res.send(userCategory);
// });

// Q) How to find the document with a specific date range

// router.get("/findDateRange", async (req, res) => {
//   let date1 = "2023-12-18";
//   let date2 = "2023-12-20";
//   let userWithDateRange = await userModel.find({
//     dateCreated: { $gte: date1, $lte: date2 },
//   });
//   res.send(userWithDateRange);
// });

// Q) How to find the document based on the existence of the field

// router.get("/fieldExistence", async (req, res) => {
//   let userExist = await userModel.find({ categories: { $exists: true } });
//   res.send(userExist);
// });

// Q) How to find the document on the basis of the values length

// router.get("/findWithLength", async (req, res) => {
//   let userlength = await userModel.find({
//     $expr: {
//       $and: [
//         { $gte: [{ $strLenCP: "$nickName" }, 0] },
//         { $lte: [{ $strLenCP: "$nickName" }, 3] },
//       ],
//     },
//   });
//   res.send(userlength);
// });

//----------------Authentication and Authorization -----------------------------

router.get("/profile", (req, res) => {
  res.send("This is the profile page");
});

router.post("/register", (req, res) => {
  let userData = new userModel({
    username: String,
    secret: String,
  });
  //Used to authenticate the user whethere they have entered the correct username and password
  userModel
    .register(userData, req.body.password)
    .then(function (registeredUser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  (req, res) => {}
);

module.exports = router;
