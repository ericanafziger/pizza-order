var Customer = function(name, email, toppings, crust, size) {
  this.name = name;
  this.email = email;
  this.toppings = [];
  this.crust = crust;
  this.size = size;
}

var newCustomer = new Customer();




$(document).ready(function(){
    debugger;

  $("form#userName").submit(function(event){
    event.preventDefault();

    var nameInput = $("input#name").val();
    var emailInput = $("input#email").val();
    newCustomer.name = nameInput;
    newCustomer.email = emailInput;
    console.log(newCustomer);
    $("#section-one").fadeOut(300);
    $("#section-two").delay(300).fadeIn(300);

  });

  $("form#pizzaForm").submit(function(event){
    event.preventDefault();

    $("input:checkbox[name=toppings]:checked").each(function(){
      newCustomer.toppings.push($(this).val());
      console.log(newCustomer);

    });

  });


});
