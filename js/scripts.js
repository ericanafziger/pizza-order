/////// back end logic /////////////////
var Customer = function(name, email, pizzas) {
  this.name = name;
  this.email = email;
  this.pizzas = [];
}
var Pizza = function(toppings, crust, size, price) {
  this.toppings = toppings;
  this.crust = crust;
  this.size = size;
  this.price = price;
}

var crustPrice;
var toppingsPrice;
var pizzaNumber;
var customerTotal = 0;

//calculates the price of each individual pizza
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

//calculates total price for all pizzas the customer is ordering
Customer.prototype.totalPrice = function () {
  for (i=0; i < this.pizzas.length; i++) {
    customerTotal += this.pizzas[i].price;
  }
  return customerTotal.toFixed(2);
};

//clears form when new pizza is added
function reload() {
  $('input:checkbox[name=toppings]').each(function () {
    $(this).prop("checked", false);
  });
  $("#size").val("");
  $("#crust").val("");
  $(".price").text("0.00");
}




/////// front end logic /////////////////
$(document).ready(function(){
  newCustomer = new Customer ();

  //button to submit user name entry form
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

  newCustomer.pizzas.push(new Pizza()); // creates one pizza in the customer object for user to begin with
  pizzaNumber = (newCustomer.pizzas.length); // calculates how many pizzas customer is currently ordering
  $(".pizzaNumber").text(pizzaNumber); //displays what pizza number customer is on

  //calculate cost button once user has filled out form in section-two
  $("form#pizzaForm").submit(function(event){
    event.preventDefault();
    newCustomer.pizzas[pizzaNumber - 1].toppings = [];
    $("input:checkbox[name=toppings]:checked").each(function(){
      newCustomer.pizzas[pizzaNumber - 1].toppings.push($(this).val());
    });
    newCustomer.pizzas[pizzaNumber - 1].crust = $("#crust").val();
    newCustomer.pizzas[pizzaNumber - 1].size = parseFloat($("#size").val());
    newCustomer.pizzas[pizzaNumber - 1].price = newCustomer.pizzas[pizzaNumber - 1].cost();

    // if statement makes sure order form is filled out
    if (newCustomer.pizzas[pizzaNumber - 1].crust && newCustomer.pizzas[pizzaNumber - 1].size && newCustomer.pizzas[0].toppings.length > 0) {
      // replaces pizza price
      $(".price").text(newCustomer.pizzas[pizzaNumber - 1].price);
      // replaces totalPrice
      customerTotal = 0;
      $(".totalPrice").text(newCustomer.totalPrice());
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

  // button adds new pizza to customer object
  $(".btn-success").click(function(){
    reload();
    $(".btn-default").hide();
    $(".btn-success").hide();
    console.log(pizzaNumber);
    $("ul .pizzaNumberCost").append("<li>Pizza " + (pizzaNumber) + " cost: $" + newCustomer.pizzas[pizzaNumber - 1].cost()+"</li>");
    newCustomer.pizzas.push(new Pizza());
    pizzaNumber = (newCustomer.pizzas.length);
    $(".pizzaNumber").text(pizzaNumber);
    console.log(newCustomer);
  });

  //displays customer receipt in final section
  $(".btn-default").click(function(){
    $("#section-two").fadeOut();
    $("#section-three").fadeIn();

  });

}); //end of document ready
