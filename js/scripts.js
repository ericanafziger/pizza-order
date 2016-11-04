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

var newCustomer = new Customer();




/////// front end logic /////////////////
$(document).ready(function(){

  $("form#userName").submit(function(event){
    event.preventDefault();

    var nameInput = $("input#name").val();
    var emailInput = $("input#email").val();
    newCustomer.name = nameInput;
    newCustomer.email = emailInput;
    $(".nameForOrder").text(nameInput);
    $(".emailForOrder").text(emailInput);
    $("#section-one").fadeOut(300);
    $("#section-number").delay(300).fadeIn(300);

  }); // end of userName submit
  $("form#pizzaNumber").submit(function(event){
    event.preventDefault();
    var numberInput = $("#number").val();
    for (i = 0; i < numberInput; i++) {
      newCustomer.pizzas.push(new Pizza());
    }
    console.log(newCustomer);
    $("#section-number").fadeOut(300);
    $("#section-two").delay(300).fadeIn(300);
    alert(numberInput);
  });

  $("form#pizzaForm").submit(function(event){
    event.preventDefault();
    newCustomer.pizzas[0].toppings = [];
    $("input:checkbox[name=toppings]:checked").each(function(){
      newCustomer.pizzas[0].toppings.push($(this).val());
    });
    newCustomer.pizzas[0].crust = $("#crust").val();
    newCustomer.pizzas[0].size = parseFloat($("#size").val());
    var cost = newCustomer.pizzas[0].cost();

    if (newCustomer.pizzas[0].crust && newCustomer.pizzas[0].size && newCustomer.pizzas[0].toppings.length > 0) {
      $(".price").text(cost);
      $(".crustPrice").text(crustPrice.toFixed(2));
      $(".toppingsPrice").text(toppingsPrice.toFixed(2));
      $(".sizePrice").text(newCustomer.pizzas[0].size);
      $(".btn-default").fadeIn();
      $(".re").text("Re-");
    } else {
      alert("Hold up! You haven't finished your pizza yet.");
    }
    console.log(newCustomer);
  }); // end of pizzaForm submit
  $(".btn-default").click(function(){
    $("#section-two").hide();
    $("#section-three").fadeIn();

  });

}); //end of document ready
