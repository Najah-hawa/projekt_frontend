"use strict";

window.onload = init;
let url = "https://studenter.miun.se/~naha2204/dt173g/projekt_dt173g/php_api/meals/read.php";
let urlorder = "https://studenter.miun.se/~naha2204/dt173g/projekt_dt173g/php_api/meals/readorder.php";

const namninput =document.getElementById("namn");
const personsinput =document.getElementById("persons");
const emailinput =document.getElementById("email");
const ankomstinput =document.getElementById("ankomst");
const klockainput =document.getElementById("klocka");
const error =document.getElementById("error");   
const meddelande =document.getElementById("meddelande");   
const addbtn =document.getElementById("add");
addbtn.addEventListener("click", createorder);

function init(){
getMeals();
createorder();
}

//lägg till meal i databasen
function createorder(event){
  event.preventDefault();
  //tömma felmeddelande 
  error.innerHTML = "";
  //läsa in värden från input
  let namnin = namninput.value;
  let personsin = personsinput.value;
  let emailin = emailinput.value;
  let ankomstin = ankomstinput.value;
  let klockain = klockainput.value;
  
  let jsonStr = JSON.stringify({
    namn : namnin,
    persons :personsin,
    email : emailin,
    ankomst : ankomstin,
    klocka: klockain,
  }) 
  // fetch url och skicka method post
  fetch(urlorder , {
    method : "POST",
    headers: {
      "content-type" : "application/json"
    }, 
    body: jsonStr
  
  })
  .then(response => {
    if(response.status != 201){ //inte lyckat anrop bara return
      error.innerHTML =`<p class="error"> Fel vid bokning, vänlig försök igen </p> `;  //felmeddelande
    } else 
    return response.json() 
  .then(data => clearform() )
  .catch(err => console.log(err))
  })
  }

//rensa form
function clearform(){
  namninput.value="";
  personsinput.value="";
  emailinput.value="";
  ankomstinput.value="";
  klockainput.value="";
  meddelande.innerHTML =`<p class="meddelande">Din bord är bokad </p> `;  //felmeddelande
}
  


//funktion för att läsa kurser lista på DOM
function getMeals(){
  fetch(url)
  .then(response => {
      if(response.status != 200){ //inte lyckat anrop bara return
          return
      }
      return response.json()
  .then(data => addmeal(data)) //köra metoden addmeal
  .catch(err => console.log(err))
  })
  }

  
//skriva meals som li element
function addmeal(meals){

  const ulEl = document.getElementById("meallist");
  //tömma felmeddelande 
  ulEl.innerHTML ="";
//anrop för att skriva ut meals i databasen som li element
  meals.forEach(meal => {
     ulEl.innerHTML += ` <div class ="mealitem"> <p> ${meal.meal_name} </p> <p> ${meal.meal_ingredient}. </p>
     <p> Pris: ${meal.price} kr. </p> </div> `  
  });

}
