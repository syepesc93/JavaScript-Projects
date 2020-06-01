' use strict '

// we are creating "modules" represented as IIFE for organization purposes and specially for hidden some data (private varaibles)

// this is the BUDGET CONTROLLER module
var budgetController = (function() { // using immediate function invoke IIFE

    // some code

})();


// this is the UI CONTROLLER
var UIController = (function() {

    return {
        getInput: function() {
            return {
                type: document.querySelector('.add__type').value, // will be either 'inc' for income or 'exp' for expense
                description: document.querySelector('.add__description').value,
                value: document.querySelector('.add__value').value
            };
        }

    };

})();


// this is the GLOBAL APP CONTROLLER (to connect modules we use arguments in the IIFE)
var controller = (function(budgetCtrl, UICtrl) {

    var ctrlAddItem = function() {

        // 1. get the filled input data
        var input = UICtrl.getInput();
        console.log(input);

        // 2. add the item to the budget controller

        // 3. add the new item to the UI

        // 4. calculate the budget

        // 5. display the budget on the UI

    }

    // TO DO List when clicking the button
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    // TO DO List when hitting enter key (keycode: 13)
    document.addEventListener('keypress', function(event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });


})(budgetController, UIController);