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


router.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login')
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

router.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})


router.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})



function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}


module.exports = router;
