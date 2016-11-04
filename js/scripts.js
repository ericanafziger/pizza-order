/////// back end logic /////////////////
var Customer = function(name, email, toppings, crust, size) {
  this.name = name;
  this.email = email;
  this.toppings = [];
  this.crust = crust;
  this.size = size;
}

Customer.prototype.cost = function () {
  var toppingsPrice = this.toppings.length * 0.75;
  if (this.crust === "stuffed" || this.crust === "deep dish") {
    var crustPrice = 1.99;
  } else {
    var crustPrice = 0;
  }
  var sizePrice = this.size;
  return sizePrice + crustPrice + toppingsPrice;
};

// Customer.prototype.crustCost = function () {
//   if (this.crust === "stuffed" || this.crust === "deep dish") {
//     return 1.99;
//   }
//
// };

var newCustomer = new Customer();



/////// front end logic /////////////////
$(document).ready(function(){

  $("form#userName").submit(function(event){
    event.preventDefault();

    var nameInput = $("input#name").val();
    var emailInput = $("input#email").val();
    newCustomer.name = nameInput;
    newCustomer.email = emailInput;
    $("#section-one").fadeOut(300);
    $("#section-two").delay(300).fadeIn(300);

  }); // end of userName submit

  $("form#pizzaForm").submit(function(event){
    event.preventDefault();

    $("input:checkbox[name=toppings]:checked").each(function(){
      newCustomer.toppings.push($(this).val());
    });
    newCustomer.crust = $("#crust").val();
    newCustomer.size = parseFloat($("#size").val());
    alert(newCustomer.size);
    var cost = newCustomer.cost();
    // console.log(toppingsCost);
    console.log(cost);
    console.log(newCustomer);

  }); // end of pizzaForm submit


}); //end of document ready
