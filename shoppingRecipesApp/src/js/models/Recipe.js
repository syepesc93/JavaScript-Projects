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
}