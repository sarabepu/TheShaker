var express = require("express");
var router = express.Router();
var passport = require("passport");

const mu = require("../db/MongoUtils.js");

const buildQuery = query => ({
  name: new RegExp(`.*${query}.*`, "i")
});

/* GET home page. */
router.get("/", function(req, res) {
  res.render("main", {})
});

/* GET home page. */
router.get("/searchCocktail", function(req, res) {
  res.render("search", {})
});

router.get("/searchCocktailsss", function(req, res) {
  mu.cocktails.findManyByIngredient(ingredient).then(cocktails => {
    return res.render("search", {cocktails})
  });
});

router.get("/searchCocktailIngredient", function(req, res) {
  const ingredient = req.query.ingredient;
  
  /*You can improve your search using REGEX
  const buildQuery = (query) => ({
	title: new RegExp(`.*${ingredient}.*`, "i")
});
  */
  
  mu.cocktails.findManyByIngredient(ingredient).then(cocktails => {
    var hasIngredient = false;
    console.log(ingredient);
    for (var i = 0; i < cocktails.length; i++) {
      for (var k = 0; k < cocktails[i].ingredients.length; k++) {
          if(cocktails[i].ingredients[k].name === ingredient){
            hasIngredient = true;
            break;
        }
       }
    }
    console.log(hasIngredient);
    return res.send(hasIngredient);
  });
});


router.get("/searchCocktail:params", function(req, res) {
  const ingredients = req.query.ingredients;
  mu.cocktails.findManyByIngredients(ingredients).then(cocktails => { 
    let cocktailSearched = [];
    for (var i = 0; i < cocktails.length; i++) {
      let hasAll = false;
      let number = 0;
      for (var j = 0; j < ingredients.length; j++) {
        for (var k = 0; k < cocktails[i].ingredients.length; k++) {
          if(cocktails[i].ingredients[k].name === ingredients[j]){
            hasAll = true;
            number++;
            break;
          }
        }
      }
      if (number == ingredients.length) {
        cocktailSearched.push(cocktails[i]);
      }
    }
    return res.send({cocktailSearched})
  });
});

router.get('/register', (req, res) => {
  res.render('register')
})

router.post("/register/create", (req, res) => {
  console.log("params", req.body);
  const user = {
    name: req.body.name,
    email: req.body.email,
    id: new Date(),
    password: req.body.password
  };

  mu.users.insert(user).then(res.redirect("/login"));
});

router.get("/login", (req, res)=>{
  res.render('login')
})

router.post("/login/check", (req, res) => {
  console.log("params de login", req.body);
  var userUsed = {};
  mu.users.findUsers().then( users => {
    console.log(users);
    var tienePass = false;
    for (var i = 0; i < users.length; i++) {
      if(users[i].email === req.body.email && users[i].password === req.body.password){
        tienePass = true;
        userUsed = users[i];
        break; 
      }
    }
    if(tienePass){
      return res.redirect("/");
    }else{
      return res.render("login");
    }
  })
});


module.exports = router;
