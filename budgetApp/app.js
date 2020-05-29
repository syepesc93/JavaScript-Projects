' use strict '

// we are creating "modules" represented as IIFE for organization purposes and specially for hidden some data (private varaibles)

// this is the BUDGET CONTROLLER module
var budgetController = (function() { // using immediate function invoke IIFE

    // some code

})();


// this is the UI CONTROLLER
var UIController = (function() {

    // some code for later  

})();


// this is the GLOBAL APP CONTROLLER (to connect modules we use arguments in the IIFE)
var controller = (function(budgetCtrl, UICtrl) {

    // TO DO List when clicking the button
    document.querySelector('.add__btn').addEventListener('click', function() {

        // 1. get the filled input data

        // 2. add the item to the budget controller

        // 3. add the new item to the UI

        // 4. calculate the budget

        // 5. display the budget on the UI

    });

    // TO DO List when hitting enter key
    document.querySelector('.add__btn').addEventListener('keypress', function(event) {

    });


})(budgetController, UIController);