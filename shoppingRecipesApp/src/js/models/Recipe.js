import axios from 'axios';
import { key, proxy } from '../config';
import { error } from 'jquery';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const result = await axios(`https://forkify-api.herokuapp.com/api/get?&rId=${this.id}`);
            this.title = result.data.recipe.title;
            this.publisher = result.data.recipe.pubisher;
            this.img = result.data.recipe.image_url;
            this.url = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
        } catch (error) {
            console.log(error);
            alert('error getting recipe');
        }
    }

    calcCookTime() {
        // we asume that each ingredients adds 3 minutes to cook time
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounce', 'ounces', 'teaspoon', 'teaspoons', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(el => {
            // 1. uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            })

            // 2. remove parentheses
            ingerdient = ingerdient.replace(/ *\([^)]*\) */g, " ");

            // 3. parse ingredients into count
            const ingredientsArray = ingredient.split(' ');
            // look into an array and find the index of an element
            const unitIndex = ingredientsArray.findIndex(el2 => unitsShort.includes(el2));

            let objIngredients;
            if (unitIndex > -1) {
                // there is a unit

            } else if (parseInt(ingredientsArray[0], 10)) {
                // there is no unit, but first element is a number
                objIngredients = {
                    count: parseInt(ingredientsArray[0], 10),
                    unit: '',
                    ingredient: ingredientsArray.slice(1).join(' ')
                }

            } else if (unitIndex === -1) {
                // there is no unit
                objIngredients = {
                    count: 1,
                    unit: '',
                    ingredient: ingredient
                }
            }


            return ingredient;
        });
        this.ingredients = newIngredients;
    }
}