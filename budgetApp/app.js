' use strict '

// we are creating "modules" represented as IIFE for organization purposes and specially for hidden some data (private varaibles)

// OBJECT-MODULE: this is the BUDGET CONTROLLER module
var budgetController = (function() { // using immediate function invoke IIFE

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // creating an object to store all our data (the creating of obojects helps to organize and wrap all our code)
    var data = {
        allItems: {
            exp: [],
            inc: []
        },

        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function(type, des, val) {
            var newItem;

            // create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // create new item based on the type of the input
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            data.allItems[type].push(newItem);

            return newItem;
        },

        testing: function() {
            console.log(data)
        }
    };

})();


// OBJECT-MODULE: this is the UI CONTROLLER
var UIController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either 'inc' for income or 'exp' for expense
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();


// OBJECT-MODULE: this is the GLOBAL APP CONTROLLER (to connect modules we use arguments in the IIFE)
var controller = (function(budgetCtrl, UICtrl) {

    var ctrlAddItem = function() {
        var input, newItem;

        // 1. get the filled input data
        input = UICtrl.getInput();

        // 2. add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. add the new item to the UI

        // 4. calculate the budget

        // 5. display the budget on the UI

    };

    var setupEventListeners = function() {

        var DOM = UICtrl.getDOMstrings();

        // TO DO List when clicking the button
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        // TO DO List when hitting enter key (keycode: 13)
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    return {
        init: function() {
            console.log('Application has started.');
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();