// -------------objects----------------------
customer= {
  "firstName": "",
  "lastName": "",
  "phoneNumber": "",
  "street": "" ,
  "postalCode": "",
  "city": ""
};
//------------------------------------------

var Order= {
  "pizza": [
    {"type": "type1",
    "size": "medium",
    "ingredients": ['a','b','c'],
    "cheese": "",
    "price": 42
  }
]
};

//----------

function calc() {
  var total= 0;
  return {
    getTotal: function() {
      return total;
    },
    addPrice: function(price) {
      total= total + price;
    },
    removePrice: function(price) {
      total= total - price;
    }
}
};

//----------modal (next- prev Buttons)------------

$("div[id^='myModal']").each(function(){

  var currentModal = $(this);

  //click next
  currentModal.find('.btn-next').click(function(){
    currentModal.modal('hide');
    currentModal.closest("div[id^='myModal']").nextAll("div[id^='myModal']").first().modal('show');
  });

  //click prev
  currentModal.find('.btn-prev').click(function(){
    currentModal.modal('hide');
    currentModal.closest("div[id^='myModal']").prevAll("div[id^='myModal']").first().modal('show');
  });

});

//------------ saving---------------
var Total= calc();

var flag= true;
function saveOrder() {

  //saving Order details-----
  if (Order.pizza.length === 1 && flag=== true) {
    Order.pizza[0].type= $("input[name='type']:checked").val();
    Order.pizza[0].size= $("input[name='size']:checked").val();
    if ($("input[name='Cheese']:checked").val() === "Cheese") {
      Order.pizza[0].cheese= true;
    } else {
      Order.pizza[0].cheese= false;
    }

    var ing= [];
    for (var i=0; i<3; i++) {
      if (document.getElementsByName('ingredient')[i].checked) {
        ing.push(document.getElementsByName('ingredient')[i].value);
      }
    }
    Order.pizza[0].ingredients= ing;
    Order.pizza[0].price= pizzaPrice(Order.pizza[0]);
    Total.addPrice(Order.pizza[0].price);
    flag= false;
  } else {
  var newPizza= {"type": "",
  "size": "",
  "ingredients": [],
  "cheese": false,
  "price": 0
  }
  newPizza["type"]= $("input[name='type']:checked").val();
  newPizza["size"]= $("input[name='size']:checked").val();
  if ($("input[name='Cheese']:checked").val() === "Cheese") {
    newPizza["cheese"]= true;
  }

  var ing= [];

  for (var i=0; i<3; i++) {
    if (document.getElementsByName('ingredient')[i].checked) {
      ing.push(document.getElementsByName('ingredient')[i].value);
    }
  }
  newPizza["ingredients"]= ing;
  newPizza["price"]= pizzaPrice(newPizza);
  Order.pizza.push(newPizza);
  Total.addPrice(newPizza["price"]);

}

};

//------------save Customer Info--------------------------
function saveCustomerInfo() {
  //saving customer Info.-----
  customer.firstName= $('#fName').val();
  customer.lastName= $('#lName').val();
  customer.phoneNumber= $('#phone').val();
  customer.street= $('#street').val();
  customer.postalCode= $('#postalCode').val();
  customer.city= $('#city').val();

};

//------------ display order details-------
function displayOrder() {

  $('#orderTable').find('#header').siblings().remove();

  for (var i=0; i<Order.pizza.length; i++) {
    var row= '<tr><td><button type="button" name="deleteButton" class="btn btn-link">remove </button></td><td>%type%</td><td>%size%</td><td>%ingredients%</td><td>%cheese%</td><td>%price%</td></tr>';
    var formattedRow;

    formattedRow= row.replace("%type%", Order.pizza[i].type);
    formattedRow= formattedRow.replace("%size%", Order.pizza[i].size);
    formattedRow= formattedRow.replace("%ingredients%", Order.pizza[i].ingredients);

    if (Order.pizza[i].cheese === true) {
      formattedRow= formattedRow.replace("%cheese%", "Yes");
    } else {
      formattedRow= formattedRow.replace("%cheese%", "No");
    }

    formattedRow= formattedRow.replace("%price%", Order.pizza[i].price);

    $('#orderTable').append(formattedRow);

  }
  $('#total').text(Total.getTotal() + ' SR'); //display total..

};
//--------
function displayThanks() {
  $('#customerName').text(customer.firstName + " " + customer.lastName);
}

//------calculate price for each pizza -----

function pizzaPrice(pizza) {
  var x=0;
    if (pizza["size"] === "Small") {
        x+=20;
    } else if (pizza["size"] === "Medium") {
        x+=25;
    } else if (pizza["size"] === "Large") {
        x+=30;
    }

    x+= (pizza["ingredients"].length * 4);
    //alert((pizza["cheese"]));

    if (pizza["cheese"] === true) {
      x+= 5;
    }

    return x;

}
//-----------------remove pizza button ------------

$('#orderTable').on('click', 'button', function() {
  var a = $(this).parents('tr');
  var rowIndex= a[0].rowIndex

  alert("you have removed: " + Order.pizza[rowIndex-1].type);
  Total.removePrice(Order.pizza[rowIndex-1].price);
  Order.pizza.splice(rowIndex-1, 1);

  displayOrder();
  //TotalPrice();

  $('#total').text(Total.getTotal() + ' SR');
});

//-------------------

function delLastPizza() {
  Order.pizza.pop();
};

//---------validation --------

function validate() {
  if ($('#fName').val() !== "" && $('#lName').val() !== "" && $('#phone').val() !== "" && $('#street').val() !== "" && $('#postalCode').val() !== "" && $('#city').val() !== "") {
    $('#place-btn').attr('disabled', false);
    $('#error-msg').hide();
  }
};

//---------------
function validateOrder() {
  if ($("input[name='type']:checked").val() && $("input[name='size']:checked").val()) {
    $('#btn-1').attr("disabled", false);
    $('#reqired').hide();
  } else {
    $('#btn-1').attr("disabled", true);
    $('#reqired').show();
  }
};
//-----reset form for new pizza ---------
function resetForm() {
  document.getElementById("form1").reset();
  $('#reqired').show();
  $('#btn-1').attr("disabled", true);
};
//------
var orderNumbers=0;
function orderNumber() {
  orderNumbers++;
  $('#orderNum').text('You have (1) order ');
  /*if (orderNumbers === 1) {
    $('#orderNum').text('You have (1) order ');
  } else {
    $('#orderNum').text('You have (' + orderNumbers  + ') orders ');
  }*/
  $('#main').attr("disabled", true);
}
//-----
$(document).ready(function() {
    $('#place-btn').attr("disabled", true);
    $('#btn-1').attr("disabled", true);

});
