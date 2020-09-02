import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { DOMelements, renderLoaderSpinner, clearLoaderSpinner } from './views/base';

/* 
First of all we need to install NPM 
from the terimanl and in your project folder type: npm init
then install dependencies as follow: 
    npm install 'package name' --save --> for dependcies
    npm install 'package name' --save-dev --> for developer tools (packages could be unistall by using the uninstall keyword)
*/

/*
GLOBAL STATE OF THE APP
- search object
- current recipes object
- shopping list object
- liked recipes
*/

const state = {};


// SEARCH CONTROLLER
const controlSearch = async() => {
    // 1. get query from view
    const query = searchView.getInput();
    console.log(query);

    if (query) {
        // 2. new search object and add to state
        state.search = new Search(query);

        // 3. prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoaderSpinner(DOMelements.searchRes)

        try {
            // 4. search for recipes
            await state.search.getResults();

            // 5. render results on UI
            clearLoaderSpinner();
            searchView.renderResults(state.search.result);
        } catch (error) {
            console.log(error);
            alert('error searching recipe');
        }
    }
}

DOMelements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); // stop realoading the page
    controlSearch();
});

DOMelements.searchResPages.addEventListener('click', e => {
    // closest target all the button instead of only the thext or the icon
    const btn = e.target.closest('.btn-inline');
    console.log(e.target);

    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        console.log(goToPage);
    }
});

// RECIPE CONTROLLER
const controlRecipe = async() => {
    // geting the hash (recipe ID) from the url
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // prepare UI for changes
        recipeView.clearRecipe();
        renderLoaderSpinner(DOMelements.recipe);

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // calculate servings a prep time
            state.recipe.calcCookTime();
            state.recipe.calcServings();

            // render recipe
            clearLoaderSpinner();
            recipeView.renderRecipe(state.recipe);
            console.log(state.recipe);
        } catch (error) {
            console.log(error);
            alert('Error processing recipe');
        }
    }
}

// window.addEventListener('hashchange', controlRecipe)
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));