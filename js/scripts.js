/////// back end logic /////////////////
var Customer = function(name, email, pizzas) {
  this.name = name;
  this.email = email;
  this.pizzas = [];
  // this.toppings = [];
  // this.crust = crust;
  // this.size = size;
}
var Pizza = function(toppings, crust, size) {
  this.toppings = toppings;
  this.crust = crust;
  this.size = size;
}

var crustPrice;
var toppingsPrice;

Pizza.prototype.cost = function () {
  toppingsPrice = this.toppings.length * 0.75;
  if (this.crust === "stuffed" || this.crust === "deep dish") {
    crustPrice = 1.99;
  } else {
    crustPrice = 0.00;
  }
  var sizePrice = this.size;
  return sizePrice + crustPrice + toppingsPrice;
};

function reload() {
  $("#checkbox").prop("checked", false);
  parseFloat($("#size").val(""));
  $("#crust").val("");
}




/////// front end logic /////////////////
$(document).ready(function(){
  newCustomer = new Customer ();

  $("form#userName").submit(function(event){
    event.preventDefault();

    var nameInput = $("input#name").val();
    var emailInput = $("input#email").val();
    newCustomer.name = nameInput;
    newCustomer.email = emailInput;
    $(".nameForOrder").text(nameInput);
    $(".emailForOrder").text(emailInput);
    $("#section-one").fadeOut(300);
    $("#section-two").delay(300).fadeIn(300);

  }); // end of userName submit

  newCustomer.pizzas.push(new Pizza());
  var pizzaNumber = (newCustomer.pizzas.length);
  $(".pizzaNumber").text(pizzaNumber);

  $("form#pizzaForm").submit(function(event){
    event.preventDefault();


      newCustomer.pizzas[pizzaNumber - 1].toppings = [];
      $("input:checkbox[name=toppings]:checked").each(function(){
        newCustomer.pizzas[pizzaNumber - 1].toppings.push($(this).val());
      });
      newCustomer.pizzas[pizzaNumber - 1].crust = $("#crust").val();
      newCustomer.pizzas[pizzaNumber - 1].size = parseFloat($("#size").val());
      var cost = newCustomer.pizzas[pizzaNumber - 1].cost();

      if (newCustomer.pizzas[pizzaNumber - 1].crust && newCustomer.pizzas[pizzaNumber - 1].size && newCustomer.pizzas[0].toppings.length > 0) {
        $(".price").text(cost);
        $(".crustPrice").text(crustPrice.toFixed(2));
        $(".toppingsPrice").text(toppingsPrice.toFixed(2));
        $(".sizePrice").text(newCustomer.pizzas[pizzaNumber - 1].size);
        $(".btn-default").fadeIn();
        $(".btn-success").fadeIn();
        $(".re").text("Re-");
      } else {
        alert("Hold up! You haven't finished your pizza yet.");
      }

      console.log(newCustomer);
  }); // end of pizzaForm submit
  $(".btn-success").click(function(){
    newCustomer.pizzas.push(new Pizza());
    pizzaNumber = (newCustomer.pizzas.length);
    $(".pizzaNumber").text(pizzaNumber);
    console.log(newCustomer);

  });

  $(".btn-default").click(function(){
    $("#section-two").fadeOut();
    $("#section-three").fadeIn();

  });

}); //end of document ready
