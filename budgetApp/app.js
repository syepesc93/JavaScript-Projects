' use strict '

// we are creating "modules" represented as IIFE for organization purposes and specially for hidden some data (private varaibles)

// MODULE: this is the BUDGET CONTROLLER module
var budgetController = (function() { // using immediate function invoke IIFE
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.floor((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    }

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // creating an object to store all our data (the creating of obojects helps to organize and wrap all our code)
    var data = {
        allItems: {
            exp: [], // array for all the expenses
            inc: [] // array for all the incomes
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };
    // private functions - methods
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(current) {
            sum = sum + current.value;
        });
        data.totals[type] = sum;
    };

    // public functions - methods
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

        deleteItem: function(type, id) {
            var ids, index;
            // loop trough the ids of each object from all items arrays
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });
            index = ids.indexOf(id);
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function() {
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            // calculate the percentage if income expended
            if (data.totals.inc > 0) {
                data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentges: function() {
            data.allItems.exp.forEach(function(current) {
                current.calcPercentage(data.totals.inc);
            });
        },

        getPercentage: function() {
            var allPercentages = data.allItems.exp.map(function(current) {
                return current.getPercentage();
            });
            return allPercentages;
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function() {
            console.log(data)
        }
    };
})();


// MODULE: this is the UI CONTROLLER
var UIController = (function() {
    // creating variables - created in an object to easy change or reuse on the future
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };

    var formatNumber = function(num, type) {
        var numSplit, int, decimal, type;
        /* 
         + or - symbols exactly 2 decimal ponits comma separating the thousands
        2310.4567 --> + 2,310.46
         */
        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        decimal = numSplit[1];

        return (type === 'exp' ? sign = '-' : sign = '+') + ' ' + int + '.' + decimal;
    };

    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either 'inc' for income or 'exp' for expense
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function(object, type) {
            var html, newHtml, element;
            // 1. Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // 2. Replace placeholder text with actual data
            newHtml = html.replace('%id%', object.id);
            newHtml = newHtml.replace('%description%', object.description);
            newHtml = newHtml.replace('%value%', formatNumber(object.value, type));
            // 3. Insert HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function(selectorID) {
            var element = document.getElementById(selectorID);
            element.parentNode.removeChild(element);
        },

        clearFields: function() {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            // convert a list into an array
            fieldsArr = Array.prototype.slice.call(fields);
            // clear input fields
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
            fieldsArr[0].focus();
        },

        displayBudget: function(object) {
            var type;
            object.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(object.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(object.totalInc, type);
            document.querySelector(DOMstrings.expenseLabel).textContent = object.totalExp;

            if (object.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = object.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },

        displayPercentages: function(percentages) {
            var fields = document.querySelectorAll(DOMstrings.expensesPercentageLabel);

            nodeListForEach(fields, function(current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        },

        displayMonth: function() {
            var now, year, month;

            // display actual month
            var now = new Date();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },

        changeType: function() {
            var fields;

            fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue
            );

            nodeListForEach(fields, function(current) {
                current.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };
})();


// MODULE: this is the GLOBAL APP CONTROLLER (to connect modules we use arguments in the IIFE)
var controller = (function(budgetCtrl, UICtrl) {
    var updateBudget = function() {
        // 1. calculate the budget
        budgetController.calculateBudget();

        // 2. return the budget
        var budget = budgetController.getBudget();

        // 3. display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    var updatePercentages = function() {
        // 1. calculate percentages
        budgetController.calculatePercentges();

        // 2. read percentages from budget controller
        var percentages = budgetController.getPercentage();

        // 3. update UI
        UICtrl.displayPercentages(percentages)

    };

    var ctrlAddItem = function() {
        var input, newItem;
        // 1. get the filled input data
        input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. add the new item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. clear fields
            UICtrl.clearFields();

            // 5. calculate and update budget
            updateBudget();

            // 6. calculate and update percentages
            updatePercentages();
        }
    };

    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
        }
        // 1. delete item from data structure
        budgetController.deleteItem(type, ID);

        // 2. delete the item from the UI
        UICtrl.deleteListItem(itemID);

        // 3. update and show the new budget
        updateBudget();
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

        // select the DOM element <tag> that we are clicking on
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
    };

    return {
        // initialize web site and clean the UI
        init: function() {
            console.log('Application has started.');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: '---'
            });
            console.log('UI Initialize.');

            // setting up web site events
            setupEventListeners();
        }
    }
})(budgetController, UIController);

controller.init();