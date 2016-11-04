/////// back end logic /////////////////
var Customer = function(name, email, toppings, crust, size) {
  this.name = name;
  this.email = email;
  this.toppings = [];
  this.crust = crust;
  this.size = size;
}
var crustPrice;
var toppingsPrice;

Customer.prototype.cost = function () {
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

function reload() {
  crustPrice = 0.00;
  toppingsPrice = 0.00;
}



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
    $("#section-two").delay(300).fadeIn(300);

  }); // end of userName submit

  $("form#pizzaForm").submit(function(event){
    event.preventDefault();
    newCustomer.toppings = [];
    reload();
    $("input:checkbox[name=toppings]:checked").each(function(){
      newCustomer.toppings.push($(this).val());
    });
    newCustomer.crust = $("#crust").val();
    newCustomer.size = parseFloat($("#size").val());
    var cost = newCustomer.cost();

    if (newCustomer.crust && newCustomer.size && newCustomer.toppings.length > 0) {
      $(".price").text(cost);
      $(".crustPrice").text(crustPrice.toFixed(2));
      $(".toppingsPrice").text(toppingsPrice.toFixed(2));
      $(".sizePrice").text(newCustomer.size);
      $(".btn-default").fadeIn();
    } else {
      alert("You haven't finished your pizza yet!");
    }
    console.log(newCustomer);
  }); // end of pizzaForm submit

  $(".btn-default").click(function(){
    $("#section-two").hide();
    $("#section-three").fadeIn();

  });

}); //end of document ready
