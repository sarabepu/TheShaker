

//you should documentate this file
var arrayIngredients = [];
var arrayResults = [];
var $ingredients = $( "#log" );
const callBackend = () => {
	$.ajax({
		url: 'http://localhost:8080/searchCocktailIngredient',
		method: 'GET',
		data: { 
        	ingredient: $("input").val()
    	},
    	dataType: 'json',
    	success:function(d){
    		console.log(d);// then look at the developer tools -> console
		}
	}).done((data) => {
		if(data){
			arrayIngredients.push($("input").val());
			console.log(arrayIngredients);
			callBackend2();
			appendIngredientsToHtml();
		}
	})
}
const callBackend2 = () =>{
	$.ajax({
		url: 'http://localhost:8080/searchCocktail:params',
		method: 'GET',
		data: { 
        	ingredients: arrayIngredients
    	},
    	dataType: 'json',
    	success:function(d){
    		console.log(d);// then look at the developer tools -> console
		}
	}).done((data) => {
		$("#recipesAll li").remove()
		$("#recipesAll button").remove()
		for (var i = 0; i < data.cocktailSearched.length; i++) {
			console.log("Entra");
			$("#recipesAll").append("<div class='flexC'><li>" + data.cocktailSearched[i].strDrink + "</li><button class='btn btn-secondary' id='Delete' type='submit' data-toggle='modal' data-target='#exampleModal' data-whatever='" + data.cocktailSearched[i].strDrink + "'>Go to recipe</button></div>")
		}
		arrayResults = data.cocktailSearched;
		console.log(arrayResults);
	})
}

const appendIngredientsToHtml = () =>{
  	$("#log li").remove();
  	$("#log button").remove();
	for (var i = 0; i < arrayIngredients.length; i++) {
		$("#log").append("<div class='flexC'><li>" + arrayIngredients[i] + "</li><button class='btnDelete' data-target='#log' id='Delete' data-button='" + arrayIngredients[i] + "' type='button'>Delete</button></div>");
	}
}


$(document).on('click', '.btnDelete', function(){
  var button = $(this).attr('data-button');
  arrayIngredients.splice( arrayIngredients.indexOf(button), 1 );
  console.log(arrayIngredients);
  callBackend2();
});

$(document).ready(() => {


	$('#exampleModal').on('show.bs.modal', function (event) {
		$('.ingredientContainer div').remove();
		$('.ingredientContainer li').remove();
  		var button = $(event.relatedTarget) // Button that triggered the modal
  		var recipient = button.data('whatever') // Extract info from data-* attributes
  		// If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  		// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
 		var modal = $(this)
 		modal.find('.modal-true-title').text(recipient)
 		for (var i = 0; i < arrayResults.length; i++) {
 			if(arrayResults[i].strDrink === recipient){
 				if (arrayResults[i].strCategory === "Shot" || arrayResults[i].strCategory === "Punch / Party Drink"){ 				
 					$('#imageGlass').attr('src', './img/shot.svg');
 				}
 				for (var j = 0; j < arrayResults[i].ingredients.length; j ++) {
 					$('.ingredientContainer').append("<div class='flexIngredient'>"  +  arrayResults[i].ingredients[j].name  + "</div>");
 				}
 				modal.find('.directions').text(arrayResults[i].strInstructions)
 			}
 		}
	})

	$("#buttonSubmit").click(() => {
		event.preventDefault(); 
		if ($("input").val() != "") {
			callBackend();	
		}
		else{
			console.log("NOTHING");
		}
	})
})
