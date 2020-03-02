var express = require("express");
var router = express.Router();

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

router.get("/searchCocktail:params2", function(req, res) {
  mu.cocktails.findManyByIngredient(ingredient).then(cocktails => {
    return res.render("search", {cocktails})
  });
});

router.get("/searchCocktail:params", function(req, res) {
  const ingredients = ["Gin"];
  mu.cocktails.findManyByIngredients(ingredients).then(cocktails => {
    let cocktailSearched = [];
    for (var i = 0; i < cocktails.length; i++) {
      let hasAll = true;
      for (var j = 0; j < ingredients.length; j++) {
        for (var k = 0; k < cocktails[i].ingredients.length; k++) {
          if(!cocktails[i].ingredients[k].name.include(ingredients[j])){
            hasAll = false;
          }
        }
      }
      if (hasAll) {
        cocktailSearched.push(cocktails[i]);
      }
    }
    return res.render("index", {
      cocktailSearched
    })
  });
});

//  Data endpoint
router.get("/grades/:query", (req, res) => {
  console.log("params", req.params);
  const query = buildQuery(req.params.query);

  mu.grades.find(query).then(grades => res.json(grades));
});

router.post("/grades/create", (req, res) => {
  console.log("params", req.body);

  const grade = {
    name: req.body.name,
    grade: +req.body.grade,
    timestamp: new Date()
  };

  mu.grades.insert(grade).then(res.redirect("/"));
});

// Server side rendering one grade
router.get("/grade/:id", (req, res) => {
  console.log("grade/id params", req.params);

  mu.grades
    .findOneByID(req.params.id)
    .then(grade => {
      console.log("grade", grade);
      return grade;
    })
    .then(grade => res.render("grade_details", { grade }));
});

module.exports = router;
